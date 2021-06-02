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
  issue_appearance_count: {
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

CharacterSchema.statics.findMostFamousByName = async function (name) {
  return await this.findOne({ name: name }) // 'this' now refers to the Character class
    .sort("-issue_appearance_count")
    .exec();
};

CharacterSchema.statics.isMostFamousHero = async function (id, name) {
  const mostFamousHero = await this.findOne({ name: name }, "id")
    .sort("-issue_appearance_count")
    .exec();

  if (mostFamousHero.id === Number(id)) {
    return true;
  } else {
    return false;
  }
};

export const CharacterModel = mongoose.model("Character", CharacterSchema);
