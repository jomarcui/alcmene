const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const matchesSchema = new Schema(
  {
    date: Date,
    league: {
      id: Schema.Types.ObjectId,
      name: String,
    },
    sport: {
      id: Schema.Types.ObjectId,
      name: String,
    },
    status: String,
    teams: {
      home: {
        id: Schema.Types.ObjectId,
        name: String,
        odds: Number,
      },
      visitor: {
        id: Schema.Types.ObjectId,
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
