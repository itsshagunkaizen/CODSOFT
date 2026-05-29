import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const location = useLocation();

  useEffect(() => {
    setToken(localStorage.getItem("token"));

    const handleStorage = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, [location.pathname]);

  const handleLogout = () => {

    localStorage.removeItem("token");
    setToken(null);

    alert("Logged out successfully");
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-blue-500">
        E-commerce sample
      </h1>

      <ul className="flex gap-6 items-center">

        <Link to="/">
          <li className="hover:text-blue-400 cursor-pointer">
            Home
          </li>
        </Link>

        <Link to="/cart">
          <li className="hover:text-blue-400 cursor-pointer">
            Cart
          </li>
        </Link>

        {!token ? (
          <>

            <Link to="/login">
              <li className="hover:text-blue-400 cursor-pointer">
                Login
              </li>
            </Link>

            <Link to="/register">
              <li className="hover:text-blue-400 cursor-pointer">
                Register
              </li>
            </Link>

          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        )}

      </ul>

    </nav>
  );
}

export default Navbar;