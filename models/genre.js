const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
  name: { type: String, required: true },
});
const Genres = mongoose.model("Genre", genreSchema);

const schema = {
    name: Joi.string().required().min(3),
  };

function validate(genre) {
    const result = Joi.validate(genre, schema);
    return result;
  }

  exports.Genres=Genres;
  exports.genreSchema=genreSchema;
  exports.validate=validate