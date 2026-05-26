import { useContext } from "react";

import { CartContext } from "../context/CartContext";

function ProductCard({ name, price, image }) {

  const { addToCart } = useContext(CartContext);

  const product = {
    name,
    price,
    image,
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-72">

      <img
        src={image}
        alt={name}
        className="h-48 w-full object-cover rounded-lg"
      />

      <h2 className="text-xl font-bold mt-3">
        {name}
      </h2>

      <p className="text-gray-600">
        ₹ {price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
      >
        Add To Cart
      </button>

    </div>
  );
}

export default ProductCard;