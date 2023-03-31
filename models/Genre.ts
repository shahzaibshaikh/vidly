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

export default Genre;
