const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    teams: [Schema.Types.Mixed],
  },
  {
    timestamps: true,
  }
);

const schedules = mongoose.model('schedules', schedulesSchema);

module.exports = schedules;
