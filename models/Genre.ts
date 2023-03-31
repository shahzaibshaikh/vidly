import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
  },
  {
    timestamps: true,
  }
);

const Genre = mongoose.model("Genre", GenreSchema);

export default Genre;
