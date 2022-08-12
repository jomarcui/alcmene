const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaguesSchema = new Schema(
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
    sportId: {
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

leaguesSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

leaguesSchema.set('toJSON', {
  virtuals: true,
});

const sports = mongoose.model('leagues', leaguesSchema);

module.exports = sports;
