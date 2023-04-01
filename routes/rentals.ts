import express from "express";
import mongoose from "mongoose";
import Customer from "../models/Customer";
import Movie from "../models/Movie";
import Rental, { validateRental } from "../models/Rental";

const router = express.Router();

// Get all rentals route
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.status(200).send(rentals);
});

// Get specific rental route
router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send("Rental not found.");
  return res.status(200).send(rental);
});

// Post rental route
router.post("/", async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
    return res.status(400).send("Invalid customer ID");

  if (!mongoose.Types.ObjectId.isValid(req.body.movieId))
    return res.status(400).send("Invalid movie ID");

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

export default router;
