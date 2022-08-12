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

matchesSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

matchesSchema.set('toJSON', {
  virtuals: true,
});

const matches = mongoose.model('matches', matchesSchema);

module.exports = matches;
