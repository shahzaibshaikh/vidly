import Joi from "joi";
import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    isGold: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    phone: {
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

const Customer = mongoose.model("Customer", CustomerSchema);

export function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(3).max(50).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
}

export default Customer;
