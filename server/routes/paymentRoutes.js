const express = require("express");

const Razorpay = require("razorpay");

const router = express.Router();

const razorpayKeyId = process.env.RAZORPAY_KEY_ID?.trim();
const razorpaySecret = process.env.RAZORPAY_SECRET?.trim();

if (!razorpayKeyId || !razorpaySecret) {
  throw new Error(
    "Razorpay API keys are not configured in .env"
  );
}

const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpaySecret,
});

router.post("/checkout", async (req, res) => {

  try {

    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid payment amount",
      });
    }

    const options = {
      amount: Math.round(amount * 100),
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