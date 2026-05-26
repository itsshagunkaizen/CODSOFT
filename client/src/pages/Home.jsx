import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "../components/ProductCard";

function Home() {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchProducts();

  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8 text-center">
        Latest Products
      </h1>

      <div className="flex flex-wrap gap-8 justify-center">

        {products.map((product) => (

          <ProductCard
            key={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
          />

        ))}

      </div>

    </div>
  );
}

export default Home;