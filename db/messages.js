const Joi = require("joi");
const db = require("./connection");

const schema = Joi.object().keys({
  username: Joi.string().alphanum().required(),
  subject: Joi.string().required(),
  message: Joi.string().max(500).required(),
  imageURL: Joi.string().uri({
    scheme: [/https?/],
  }),
});

const messages = db.get("testCollection");

function getAll() {
  return messages.find();
}

module.exports = {
  getAll,
};
