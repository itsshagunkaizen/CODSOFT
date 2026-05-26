const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    name: "iPhone 15",
    price: 79999,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    description: "Latest Apple iPhone",
  },

  {
    name: "Laptop",
    price: 55999,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    description: "Powerful laptop",
  },

  {
    name: "Headphones",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "Wireless headphones",
  },
];

const seedProducts = async () => {

  try {

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products Added");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);
  }
};

seedProducts();