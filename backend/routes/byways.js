const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");
const router = new express.Router();
const bywayModel = require('../models/byway.js')


router.get("/", ensureLoggedIn, async function (req, res, next) {
    const data = await bywayModel.getAllByways(req.params)
    return res.json(data);
        
  });

router.get("/random", ensureLoggedIn, async function (req, res, next) {
  const data = await bywayModel.getRandomByway(req.params);
  return res.json(data);
})

router.get("/:name", ensureLoggedIn, async function (req, res, next) {
    const data = await bywayModel.getByway(req.params.name)
    if (!data) res.sendStatus(404);
    return res.json(data);
  });

router.post("/:name", ensureLoggedIn, async function (req, res, next) {
  console.log('user', res.locals.user)
  const data = await bywayModel.makeComment(req.params.name, req.body.comment, res.locals.user.username);
  return res.json(data);
})

router.get("/:name/comments", ensureLoggedIn, async function (req, res, next) {
  const data = await bywayModel.getCommentsByByway(req.params.name);
  return res.json(data);
})


  
  module.exports = router;