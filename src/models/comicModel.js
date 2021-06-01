import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ComicSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  accesscount: {
    type: Number,
    required: true,
    default: 0,
  },
});

ComicSchema.statics.findTrendiest = function (callback) {
  this.findOne() // 'this' now refers to the Comic class
    .sort("-accesscount")
    .exec(callback);
};

export const ComicModel = mongoose.model("Comic", ComicSchema);
