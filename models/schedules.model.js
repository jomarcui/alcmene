const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamsSchema = new Schema({
  home: {
    required: true,
    type: Schema.Types.ObjectId,
  },
  visitor: {
    required: true,
    type: Schema.Types.ObjectId,
  }
});

const schedulesSchema = new Schema(
  {
    date: {
      required: true,
      type: Date,
    },
    leagueId: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    sportId: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    teams: teamsSchema,
  },
  {
    timestamps: true,
  }
);

const schedules = mongoose.model('schedules', schedulesSchema);

module.exports = schedules;
