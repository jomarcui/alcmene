const mongoose = require('mongoose');
const Roles = require('../config/roles')

const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    firstName: {
      required: true,
      trim: true,
      type: String,
    },
    lastName: {
      required: true,
      trim: true,
      type: String,
    },
    lastLogin: {
      trim: true,
      type: Date,
    },
    mobileNumber: {
      required: true,
      trim: true,
      type: String,
    },
    password: {
      required: true,
      trim: true,
      type: String,
    },
    refreshToken: {
      type: String,
    },
    roles: {
      required: true,
      type: [Number]
    }
  },
  {
    timestamps: true,
  }
);

const users = mongoose.model('users', usersSchema);

module.exports = users;
