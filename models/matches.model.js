const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const matchesSchema = new Schema(
  {
    date: Date,
    league: {
      id: String,
      name: String,
    },
    sport: {
      id: String,
      name: String,
    },
    status: String,
    teams: {
      home: {
        id: String,
        name: String,
        odds: Number,
      },
      visitor: {
        id: String,
        name: String,
        odds: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

const matches = mongoose.model('matches', matchesSchema);

module.exports = matches;
