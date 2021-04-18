import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const HeroSchema = new Schema({
  name: {
    type: String,
  },
  powerstats: {
    type: String,
  },
  biography: {
    type: String,
  },
  appearance: {
    type: String,
  },
  work: {
    type: String,
  },
  connections: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  comics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comic" }],
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
});
