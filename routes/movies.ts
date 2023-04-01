import express from "express";
import Genre from "../models/Genre";
import Movie, { validateMovie } from "../models/Movie";

const router = express.Router();

// Get all movies route
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.status(200).send(movies);
});

// Get specific movie route
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Movie not found.");
  return res.status(200).send(movie);
});

// Post movie route
router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send("Genre not found.");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: req.body.genreId,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  movie = await genre.save();
  res.status(200).send(movie);
});

// Updating existing movie
router.put("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Movie.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) res.status(404).send("Genre does not exist.");

  res.status(200).send(genre);
});

// Deleting a movie
router.delete("/:id", async (req, res) => {
  const genre = await Movie.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Genre not found.");

  res.status(200).send("Genre deleted.");
});

export default router;
