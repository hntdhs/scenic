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
    const data = await bywayModel.getAllByways(req.params)
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
      // return next(err);
      // back does not crash but no results or message; in terminal it shows GET /byways/search?minLength=8&maxLength=7
      //throw new BadSearchError(err);
      res.status(400)
      return res.json({'error': err})
      // wrote this new error BadSearchError in expressError.js, but the error showing in Terminal is "BadSearchError: Error: Minimum Length can't be greater than Maximum Length at /Users/mike/Desktop/scenic/backend/routes/byways.js:33:13". That's weird because that message is from the BadRequestError in byway model, and there's no 'BadSearchError' in the model. So it's the error from expressError but the message from the model. Also not sure why I didn't see the error from model when I tried doing a bad search with other versions of try/catch.

      // throw 500;
      // just doing throw 500 still crashes the back and in terminal it says http status 400 at the end of the error (the server cannot or will not process the request due to something that is perceived to be a client error (for example, malformed request syntax)
    }    
  });
  // try/catch, return 500. if there's an error with a route it'll crash.

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