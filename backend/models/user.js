"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
    /** authenticate user with username, password.
     *
     * Returns { username, first_name, last_name, email, is_admin }
     *
     * Throws UnauthorizedError is user not found or wrong password.
     **/
  
    static async authenticate(username, password) {
      // try to find the user first
      const result = await db.query(
            `SELECT username,
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    is_admin AS "isAdmin"
             FROM users
             WHERE username = $1`,
          [username],
      );
  
      const user = result.rows[0];
  
      if (user) {
        // compare hashed password to a new hash from password
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid === true) {
          delete user.password;
          return user;
        }
      }
  
      throw new UnauthorizedError("Invalid username/password");
    }
  
    /** Register user with data.
     *
     * Returns { username, firstName, lastName, email, isAdmin }
     *
     * Throws BadRequestError on duplicates.
     **/
  
    static async register(
        { username, password, firstName, lastName, email, isAdmin }) {
      const duplicateCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
          [username],
      );
  
      if (duplicateCheck.rows[0]) {
        throw new BadRequestError(`Duplicate username: ${username}`);
      }
  
      const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
  
      const result = await db.query(
            `INSERT INTO users
             (username,
              password,
              first_name,
              last_name,
              email,
              is_admin)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`,
          [
            username,
            hashedPassword,
            firstName,
            lastName,
            email,
            isAdmin,
          ],
      );
  
      const user = result.rows[0];
  
      return user;
    }
  
    /** Find all users.
     *
     * Returns [{ username, first_name, last_name, email, is_admin }, ...]
     **/
  
    static async findAll() {
      const result = await db.query(
            `SELECT username,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    is_admin AS "isAdmin"
             FROM users
             ORDER BY username`,
      );
  
      return result.rows;
    }
  
    /** Given a username, return data about user.
     *
     * Returns { username, first_name, last_name, is_admin, jobs }
     *   where jobs is { id, title, company_handle, company_name, state }
     *
     * Throws NotFoundError if user not found.
     **/
  
    static async get(username) {
      const userRes = await db.query(
            `SELECT username,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    bio,
                    user_location AS "userLocation",
                    favorite_state AS "favoriteState",
                    profile_photo AS "profilePhoto",
                    is_admin AS "isAdmin"
             FROM users
             WHERE username = $1`,
          [username],
      );
  
      const user = userRes.rows[0];
  
      if (!user) throw new NotFoundError(`No user: ${username}`);
      return user;
    }
  
    /** Update user data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain
     * all the fields; this only changes provided ones.
     *
     * Data can include:
     *   { firstName, lastName, password, email, isAdmin }
     *
     * Returns { username, firstName, lastName, email, isAdmin }
     *
     * Throws NotFoundError if not found.
     *
     * WARNING: this function can set a new password or make a user an admin.
     * Callers of this function must be certain they have validated inputs to this
     * or a serious security risks are opened.
     */
  
    static async update(username, data) {
      // if (data.password) {
      //   data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
      // }
  
      const { setCols, values } = sqlForPartialUpdate(
          data,
          {
            bio: "bio",
            userLocation: "user_location",
            favoriteState: "favorite_state",
            profilePhoto: "profile_photo",
            isAdmin: "is_admin",
          });
      const usernameVarIdx = "$" + (values.length + 1);
  
      const querySql = `UPDATE users 
                        SET ${setCols} 
                        WHERE username = ${usernameVarIdx} 
                        RETURNING username,
                                  bio AS "bio",
                                  user_location AS "userLocation",
                                  favorite_state AS "favoriteState",
                                  profile_photo AS "profilePhoto",
                                  is_admin AS "isAdmin"`;
      const result = await db.query(querySql, [...values, username]);
      const user = result.rows[0];
  
      if (!user) throw new NotFoundError(`No user: ${username}`);
  
      // delete user.password;
      return user;
    }
  
    /** Delete given user from database; returns undefined. */
  
    static async remove(username) {
      let result = await db.query(
            `DELETE
             FROM users
             WHERE username = $1
             RETURNING username`,
          [username],
      );
      const user = result.rows[0];
  
      if (!user) throw new NotFoundError(`No user: ${username}`);
    }

    static async favoriteAByway(username, byway_id) {
      console.log(username)
      const result = await db.query(
          `INSERT INTO favorites(username, byway_id)
          VALUES ($1, $2)
          RETURNING username, byway_id`,
          [
              username,
              byway_id,
          ],
      );

      return result.rows[0];
    }

    // static async getUserFavorites(username, byway_id)
    static async getUserFavorites(username) {
      let query = 
        `SELECT favorites.username, favorites.byway_id, byways.name, byways.image, byways.designation FROM favorites JOIN byways ON favorites.byway_id = byways.id WHERE byway_id = $1`;
        // the problem could be that this function is expecting byway_id but it's not in any of the functions leading up to this in routes, api or profile page. nor could it be, I'm asking for byway_id's associated with this username in the favorites table and hopefully get byway information using those byway id's. profile page only knows about the user, so it can't send a byway id. I know you can SELECT things that aren't sent in as an argument, I do it all the time. but if that were the only problem, I think I'd be getting an error from models complaining about there being no byway id. 

      // const response = await db.query(query, username, [byway_id])
      const response = await db.query(query, username)
      return response.rows;
        // want to display byway cards which link to byway pages, which probably requires mapping on the profile page as in state detail
      
    }
  }

  
  
  module.exports = User;