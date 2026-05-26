import { useContext } from "react";
import axios from "axios";

import { CartContext } from "../context/CartContext";

function Cart() {

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {

    console.log("Checkout clicked");

    try {

      const { data } = await axios.post(
        "http://localhost:5000/api/payment/checkout",
        {
          amount: totalPrice,
        }
      );

      console.log(data);

      const options = {

        key: "rzp_test_Su0RPFJnDh3Jq2",

        amount: data.amount,

        currency: data.currency,

        name: "ShopEasy",

        description: "Test Transaction",

        order_id: data.id,

        handler: function (response) {

          alert("Payment Successful");

          console.log(response);
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (

        <p>Your cart is empty.</p>

      ) : (

        <div className="space-y-6">

          {cartItems.map((item, index) => (

            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
            >

              <div className="flex items-center gap-6">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-gray-600">
                    ₹ {item.price}
                  </p>

                  <div className="flex gap-4 mt-3 items-center">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.name)
                      }
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span className="text-xl">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.name)
                      }
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      +
                    </button>

                  </div>

                </div>

              </div>

              <button
                onClick={() =>
                  removeFromCart(item.name)
                }
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>

            </div>

          ))}

          <h2 className="text-3xl font-bold mt-8">
            Total: ₹ {totalPrice}
          </h2>

          <button
            onClick={handlePayment}
            className="bg-green-500 text-white px-6 py-3 rounded-lg mt-6 hover:bg-green-600"
          >
            Proceed To Checkout
          </button>

        </div>

      )}

    </div>
  );
}

export default Cart;