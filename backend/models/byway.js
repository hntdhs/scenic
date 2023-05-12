"use strict";

const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Byway {

    static async findAll(searchFilters = {}) {
        let query = 'SELECT name, state, length, designation, fees, image, description, geographic_features AS "geographicFeatures" FROM byways';
    
        let whereExpressions = [];
        let queryValues = [];

        const { minLength, maxLength, name } = searchFilters;

        if (minLength > maxLength) {
            throw new BadRequestError("Minimum Length can't be greater than Maximum Length");
        }

        if (minLength != undefined) {
            queryValues.push(minLength);
            whereExpressions.push(`length >+ $${queryValues.length}`);
        }

        if (maxLength != undefined) {
            queryValues.push(maxLength);
            whereExpressions.push(`length >+ $${queryValues.length}`);
        }

        if (name) {
            queryValues.push(`%${name}%`);
            whereExpressions.push(`name ILIKE $${queryValues.length}`);
        }
        // in front end, add text fields with name of minLength and maxLength? or 'for', not 'name'?
// pass in what's coming from checkboxes via get query params / filters = 

      
        if (whereExpressions.length > 0) {
        query += " WHERE " + whereExpressions.join(" AND ");
        }

        query += " ORDER BY name";
        const bywaysRes = await db.query(query, queryValues);
        return bywaysRes.rows;

    }

    static async getAllStates(name) {
        let query = 'SELECT name, nickname, image FROM states';
        const response =  await db.query(query)
        return response.rows
    }

    static async findBywaysByState(state)  {
        let query = 'SELECT name, state, length, designation, fees, image, description, geographic_features AS "geographicFeatures" FROM byways WHERE state like $1';

        const response = await db.query(query, [`%${state}%`])
        return response.rows

        // if (!rows) throw new NotFoundError(`No results`);
    }

    // for individual byway pages
    // static async getByway(name) {
    //     const bywayRes = await db.query(
    //         'SELECT name, state, length, designation, fees, image, description, geographic_features AS "geographicFeatures" FROM byways WHERE name = $1', [name]
    //     );

    //     const byway = bywayRes.rows[0];
    //     return byway.rows;

    //     if (!byway) throw new NotFoundError(`No byway: ${name}`);

    // }

    static async getByway(name) {
        let query = 'SELECT id, name, state, length, designation, fees, image, description, geographic_features AS "geographicFeatures" FROM byways WHERE name = $1';
        
        const response = await db.query(query, [name])        
        if (!response) {
            throw new NotFoundError("There is no byway by that name")
        }
        return response.rows[0]

    }

    static async getAllByways() {
        let query = 'SELECT id, name, state, length, designation, fees, image, description, geographic_features AS "geographicFeatures" FROM byways';

        const response = await db.query(query)
        return response.rows

    }

    static async getCommentsByByway(byway) {
        // get all comments by byway
        // let query = 'SELECT comment, username, byway_id, create_at FROM comments WHERE byway_id = $1';
        let query = 'SELECT comment, username, byway, create_at FROM comments WHERE byway = $1';

        const response = await db.query(query, [byway])
        return response.rows
    }

    static async makeComment(byway, comment, username) {
        console.log(username)
        const result = await db.query(
            `INSERT INTO comments(comment, username, byway, create_at)
            VALUES ($1, $2, $3, now())
            RETURNING comment, username, byway, create_at`,
            [
                comment,
                username,
                byway,
            ],
        );

        return result.rows[0];
    }

    static async getRandomByway() {
        const query = 'SELECT name, state, length, designation, fees, image, description, geographic_features AS "geographicFeatures" FROM byways ORDER BY random() LIMIT 1';

        const response = await db.query(query);        

        // return response.rows[0];
        return response.rows[0];
    }



}

module.exports = Byway;