const express = require("express");
const router = express.Router();
const { Customers, validateCustomer } = require("../models/customer");
const mongoose = require("mongoose");

//Getting all Customers
router.get("/", (req, res) => {
  Customers.find()
    .sort("name")
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

// Creating a new customer
router.post("/", (req, res) => {
  console.log("in post");
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = new Customers({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer
    .save()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

// Fetching a customer by ID
router.get("/:id", async (req, res) => {
  const customer = await Customers.findOne({ _id: req.params.id });
  if (!customer) res.status(404).send("customer not found");
  return res.send(customer);
});

// updating a customer
router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Customers.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  )
    .then((result) => {
      return res.send(result);
    })
    .catch((error) => {
      return res.send("Customer with given ID not found");
    });
});

// deleting a customer
router.delete("/:id", (req, res) => {
  Customers.findByIdAndRemove(req.params.id)
    .then((result) => {
      return res.send(result);
    })
    .catch((error) => {
      return res.send("Customer with given ID not found");
    });
});

module.exports = router;
