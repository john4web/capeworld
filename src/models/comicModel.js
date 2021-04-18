import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ComicSchema = new Schema({
  name: {
    type: String,
  },
  published: {
    type: Date,
  },
  autor: {
    type: String,
  },
  summary: {
    type: String,
  },
  issues: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  heroes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hero" }],
});
