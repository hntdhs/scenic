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
    const data = await bywayModel.getAllStates(req.params)
    return res.json(data);
        
  });
router.get("/:name", ensureLoggedIn, async function (req, res, next) {
    const data = await bywayModel.findBywaysByState(req.params.name)
    return res.json(data);
  });
  
  module.exports = router;