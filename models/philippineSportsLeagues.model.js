const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const philippineSportsLleaguesSchema = new Schema(
  {
    name: {
      required: true,
      trim: true,
      type: String,
    },
    sport_id: {
      required: true,
      type: [Schema.Types.ObjectId],
    },
  },
  {
    timestamps: true,
  }
);

const philippineSportsLleagues = mongoose.model(
  'philippineSportsLleagues',
  philippineSportsLleaguesSchema
);

module.exports = philippineSportsLleagues;
