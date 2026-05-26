import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert(response.data.message);

    } catch (error) {

      alert(error.response.data.message);

    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;