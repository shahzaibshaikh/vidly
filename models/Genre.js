import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema(
  {
    key: { type: String },
  },
  {
    timestamps: true,
  }
);

const Genre = mongoose.model("Genre", GenreSchema);

export default Genre;
