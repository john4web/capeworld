import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
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
    required: false,
  },
  accesscount: {
    type: Number,
    required: true,
    default: 0,
  },
});

CharacterSchema.statics.findTrendiest = function (callback) {
  this.findOne() // 'this' now refers to the Character class
    .sort("-accesscount")
    .exec(callback);
};

export const CharacterModel = mongoose.model("Character", CharacterSchema);
