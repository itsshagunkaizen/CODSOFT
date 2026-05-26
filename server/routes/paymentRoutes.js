const express = require("express");

const Razorpay = require("razorpay");

console.log(process.env.RAZORPAY_KEY_ID);

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/checkout", async (req, res) => {

  try {

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };

    const order = await razorpay.orders.create(
      options
    );

    res.status(200).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;