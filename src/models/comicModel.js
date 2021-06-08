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
    required: false,
  },
  accesscount: {
    type: Number,
    required: true,
    default: 0,
  },
});

ComicSchema.statics.findTrendiest = function (callback) {
  this.findOne() // 'this' now refers to the Comic class
    .sort("-accesscount")
    .exec(callback);
};

ComicSchema.statics.getRandomComic = async function () {
  let comicFound = false;
  const count = await ComicModel.estimatedDocumentCount();

  while (!comicFound) {
    const random = Math.floor(Math.random() * count);
    const comic = await ComicModel.findOne().skip(random).exec();

    if (comic.image !== null) {
      comicFound = true;
      return comic;
    }
  }

  /*
  this.estimatedDocumentCount(
    function (err, count) {
      if (err) {
        return callback(err);
      }

      const rand = Math.floor(Math.random() * count);
      console.log(this.findOne().skip(rand).exec(callback));
    }.bind(this)
  );*/
};

export const ComicModel = mongoose.model("Comic", ComicSchema);
