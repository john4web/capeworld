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
});

export const ComicModel = mongoose.model("Comic", ComicSchema);
