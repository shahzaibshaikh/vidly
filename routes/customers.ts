import express from "express";
import Joi from "joi";
import Customer from "../models/Customer";

const router = express.Router();

// interfaces

// Get all genres route
router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.status(200).send(customer);
});

// Get specific genre route
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Customer not found.");
  return res.status(200).send(customer);
});

// Post genre route
router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  customer = await customer.save();
  res.status(200).send(customer);
});

// Updating existing genre
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );

  if (!customer) res.status(404).send("Customer does not exist.");

  res.status(200).send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send("Customer not found.");

  res.status(200).send("Customer deleted.");
});

function validateGenre(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(3).max(50).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
}

export default router;
