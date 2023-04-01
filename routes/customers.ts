import express from "express";
import Customer, { validateCustomer } from "../models/Customer";

const router = express.Router();

// Get all customers route
router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.status(200).send(customer);
});

// Get specific customer route
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Customer not found.");
  return res.status(200).send(customer);
});

// Post customer route
router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  customer = await customer.save();
  res.status(200).send(customer);
});

// Updating existing customer
router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );

  if (!customer) res.status(404).send("Customer does not exist.");

  res.status(200).send(customer);
});

// Deleting a customer
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send("Customer not found.");

  res.status(200).send("Customer deleted.");
});

export default router;
