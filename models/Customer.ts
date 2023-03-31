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
      minLength: 5,
      maxLength: 50,
    },
    phone: {
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

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
