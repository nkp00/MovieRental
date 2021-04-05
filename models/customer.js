const Joi = require("joi");
const mongoose = require("mongoose");
const Customers = mongoose.model(
  "Customer",
  mongoose.Schema({
    name: { type: String, required: true },
    isGold: { type: Boolean, default: false },
    phone: { type: String, required: true },
  })
);

const customerSchema = {
  name: Joi.string().required().min(3),
  isGold: Joi.boolean(),
  phone: Joi.string().required().min(4),
};
function validateCustomer(customer) {
  return Joi.validate(customer, customerSchema);
}

exports.Customers=Customers;
exports.validateCustomer=validateCustomer