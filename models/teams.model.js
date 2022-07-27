const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamsSchema = new Schema(
  {
    leagueId: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    name: {
      required: true,
      trim: true,
      type: String,
    },
    sportId: {
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const teams = mongoose.model('teams', teamsSchema);

module.exports = teams;
