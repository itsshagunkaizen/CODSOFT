const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const app = express();

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup aborted due to MongoDB connection failure.");
    process.exit(1);
  }
};

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.get("/test", (req, res) => {
  res.json({
    message: "Backend working successfully"
  });
});

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

startServer();