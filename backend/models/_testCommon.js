const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {

    await db.query(`
        INSERT INTO byways(name, state, length, designation, fees, image, description, geographic_features)
        VALUES (byway1, state1, 1, desig1, fees1, 'http://byway1.img', desc1, features1), (byway2, state2, 2, desig2, fees2, 'http://byway2.img', desc2, features2), (byway3, state3, 3, desig1, fees3, 'http://byway3.img', desc3, features3) 
    `);

    await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      ]);
    //   the get username model also looks for bio and all the other profile info
}

async function commonBeforeEach() {
    await db.query("BEGIN");
  }
  
  async function commonAfterEach() {
    await db.query("ROLLBACK");
  }
  
  async function commonAfterAll() {
    await db.end();
  }

  module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
  };