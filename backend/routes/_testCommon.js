
const db = require("../db.js");
const Byway = require("../models/byway");
const User = require("../models/user");

async function commonBeforeAll() {
  await db.query("DELETE FROM byways");
  // await db.query("DELETE FROM states");
  await db.query("DELETE FROM users");


  await Byway.create(
    {
      name: "b1",
      state: "s1",
      length: "1",
      designation: "desig1",
      fees: "1",
      image: "http://b1.img",
      description: "desc1",
      geographic_features: "geo1",
    });
  await Byway.create(
    {
      name: "b2",
      state: "s2",
      length: "2",
      designation: "desig2",
      fees: "2",
      image: "http://b2.img",
      description: "desc2",
      geographic_features: "geo2",
    });
  await Byway.create(
    {
      name: "b3",
      state: "s3",
      length: "3",
      designation: "desig3",
      fees: "3",
      image: "http://b3.img",
      description: "desc3",
      geographic_features: "geo3",
    });
  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    isAdmin: false,
  });
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