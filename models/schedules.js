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
    status: {
      required: true,
      type: String,
    },
    teams: {
      required: true,
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

schedulesSchema.index(
  { date: 1, leagueId: 1, sportId: 1, teams: 1 },
  { unique: true }
);

schedulesSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

schedulesSchema.set('toJSON', {
  virtuals: true,
});

const schedules = mongoose.model('schedules', schedulesSchema);

module.exports = schedules;
