import express from "express";
import Joi from "joi";
import Genre from "../models/Genre";

const router = express.Router();

// interfaces

// Get all genres route
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.status(200).send(genres);
});

// Get specific genre route
router.get("/:id", (req, res) => {
  const genre = Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre not found.");
  return res.status(200).send(genre);
});

// Post genre route
router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
  });

  genre = await genre.save();
  res.status(200).send(genre);
});

// Updating existing genre
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) res.status(404).send("Genre does not exist.");

  res.status(200).send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Genre not found.");

  res.status(200).send("Genre deleted.");
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

export default router;
