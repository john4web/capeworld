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
});

export const CharacterModel = mongoose.model("Character", CharacterSchema);
