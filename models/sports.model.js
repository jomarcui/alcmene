const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sportsSchema = new Schema(
  {
    initialism: {
      required: true,
      trim: true,
      type: String,
    },
    name: {
      required: true,
      trim: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const sports = mongoose.model('sports', sportsSchema);

module.exports = sports;
