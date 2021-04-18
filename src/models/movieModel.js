import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const MovieSchema = new Schema({
  name: {
    type: String,
  },
  release_date: {
    type: Date,
  },
  genre: {
    type: String,
  },
  original_language: {
    type: String,
  },
  summary: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
  heroes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hero" }],
});
