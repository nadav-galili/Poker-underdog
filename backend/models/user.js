const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  userImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  teams: {
    type: Array,
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    teams: Joi.array(),
    userImage: Joi.string().min(11).max(1025),
  });

  return schema.validate(user);
}

function validateUserWithId(user) {
  const schema = Joi.object({
    _id: Joi.string().min(24).max(24).required(),
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    teams: Joi.array(),
    userImage: Joi.string().min(11).max(1025),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
exports.validateUserWithId = validateUserWithId;
