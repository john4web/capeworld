import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const QuoteSchema = new Schema({
  quote: {
    type: String,
  },
  author: {
    type: String,
  },
  banner: {
    type: String,
  },
});
