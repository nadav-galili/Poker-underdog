const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  nickName: {
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
  image: {
    type: String,
    required: true,
    // minlength: 3,
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
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255).required(),
    nickName: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    teams: Joi.array(),
    image: Joi.string().max(1024),
  });

  return schema.validate(user);
}

function validateUserWithId(user) {
  const schema = Joi.object({
    _id: Joi.string().min(24).max(24).required(),
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255).required(),
    nickName: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    teams: Joi.array(),
    image: Joi.string().min(11).max(1025),
  });

  return schema.validate(user);
}

const validateForUpdate = (user) => {
  const schema = Joi.object({
    _id: Joi.string().min(24).max(24).required(),
    nickName: Joi.string().min(2).max(255).required(),
    image: Joi.string().min(11).max(1025),
  });
  return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;
exports.validateUserWithId = validateUserWithId;
exports.validateForUpdate = validateForUpdate;
