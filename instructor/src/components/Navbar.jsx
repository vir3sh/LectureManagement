import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  return (
    <nav className="bg-gray-900 text-white p-8 flex justify-between items-center relative ">
      {/* Left: Home Link */}
      {/* <Link
        to="/"
        className="text-lg font-semibold hover:text-gray-300"
      >
        Home
      </Link> */}

      {/* Right: Logout Button */}
      <button
        onClick={onLogout}
        className="bg-red-500 absolute right-8 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
