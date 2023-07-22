
const db = require("../db.js");
const Byway = require("../models/byway");
const User = require("../models/user");

async function commonBeforeAll() {

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