import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
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

MovieSchema.statics.getRandomMovie = async function () {
  let movieFound = false;
  const count = await MovieModel.estimatedDocumentCount();

  while (!movieFound) {
    const random = Math.floor(Math.random() * count);
    const movie = await MovieModel.findOne().skip(random).exec();

    if (movie.image !== null) {
      movieFound = true;
      return movie;
    }
  }

  // this.estimatedDocumentCount(
  //   function (err, count) {
  //     if (err) {
  //       return callback(err);
  //     }
  //     const rand = Math.floor(Math.random() * count);
  //     this.findOne().skip(rand).exec(callback);
  //   }.bind(this)
  // );
};

export const MovieModel = mongoose.model("Movie", MovieSchema);
