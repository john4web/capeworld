import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
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

PersonSchema.statics.findTrendiest = function (callback) {
  this.findOne() // 'this' now refers to the Comic class
    .sort("-accesscount")
    .exec(callback);
};

PersonSchema.statics.getRandomPerson = async function () {
  let personFound = false;
  const count = await PersonModel.estimatedDocumentCount();

  while (!personFound) {
    const random = Math.floor(Math.random() * count);
    const person = await PersonModel.findOne().skip(random).exec();

    if (person.image !== null) {
      personFound = true;
      return person;
    }
  }
};

export const PersonModel = mongoose.model("Person", PersonSchema);
