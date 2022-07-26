const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamsSchema = new Schema(
  {
    league_id: {
      required: true,
      type: Number,
    },
    name: {
      required: true,
      trim: true,
      type: String,
    },
    sport_id: {
      required: true,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const teams = mongoose.model('teams', teamsSchema);

module.exports = teams;
