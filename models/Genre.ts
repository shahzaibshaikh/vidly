import Joi from "joi";
import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
  }
);

const Genre = mongoose.model("Genre", GenreSchema);

export function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

export default Genre;
