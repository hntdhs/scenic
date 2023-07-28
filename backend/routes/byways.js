const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError, BadSearchError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");
const router = new express.Router();
const bywayModel = require('../models/byway.js')


router.get("/", ensureLoggedIn, async function (req, res, next) {
  let data = await bywayModel.getAllByways(req.params)
  if (req.query.minLength) {
    data = data.filter(({ length }) => length >= req.query.minLength)
  }
  return res.json(data);
});

  router.get("/search", ensureLoggedIn, async function (req, res, next) {
    console.log(req.query, req.params, req.body)
    // can do the console.log like that if i'm confused about which it is
    // ?id=123 -> req.query.id
    // /search/?q=Tom -> req.query.q
    // /search/:q -> req.params.q
    // POST /search {q: 'my search term} -> req.body.q
    try {
      const data = await bywayModel.findAll(req.query)
      return res.json(data);
    } catch (err) {
      res.status(400)
      return res.json({'error': err})
    }    
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

router.post("/:id/comments", ensureLoggedIn, async function (req, res, next) {
  console.log('user', res.locals.user)
  const data = await bywayModel.makeComment(req.params.id, req.body.comment, res.locals.user.username);
  return res.json(data);
})

router.get("/:id/comments", ensureLoggedIn, async function (req, res, next) {
  const data = await bywayModel.getCommentsByByway(req.params.id);
  return res.json(data);
})

// search route tht calls findAll
  
  module.exports = router;