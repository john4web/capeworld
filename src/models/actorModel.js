import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ActorSchema = new Schema({
  name: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  imageURL: {
    type: String,
  },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  heroes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hero" }],
});
