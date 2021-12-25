const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const config = require("config");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  res.json({ token: user.generateAuthToken() });
});

router.post("/google/", async (req, res) => {
  const { error } = validateGoogle(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email");

  const { token }  = req.body
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.get.CLIENT_ID
  });

  const { email_verified } = ticket.getPayload();    

  console.log(email_verified);
  if (!email_verified) return res.status(400).send("Invalid email or password.");
  res.json({ token: user.generateAuthToken() });
});

function validateGoogle(req){
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    token: Joi.string().min(6).max(2048).required(),
  });

  return schema.validate(req);
}

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(req);
}

module.exports = router;
