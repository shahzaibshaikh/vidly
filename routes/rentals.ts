import express from "express";
import Customer from "../models/Customer";
import Genre from "../models/Genre";
import Movie from "../models/Movie";
import Rental, { validateRental } from "../models/Rental";

const router = express.Router();

// Get all movies route
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.status(200).send(rentals);
});

// Get specific movie route
router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send("Rental not found.");
  return res.status(200).send(rental);
});

// Post movie route
router.post("/", async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send("Customer not found.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send("Movie not found.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  rental = await rental.save();

  movie.numberInStock--;
  movie.save();

  res.status(200).send(rental);
});

// Updating existing movie
router.put("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send("Genre not found.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.status(200).send(movie);
});

// Deleting a movie
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(404).send("Movie not found.");

  res.status(200).send("Movie deleted.");
});

export default router;
