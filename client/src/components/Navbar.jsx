import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import React from "react";
import { AdminContext } from "../context/AdminContext";

const Navbar = () => {
  const { token, logout } = useContext(AdminContext);
  const location = useLocation();

  return (
    <nav className="bg-gray-900 p-4 w-full fixed top-0 left-0 shadow-lg z-50">
      <ul className="flex flex-wrap space-x-6 md:justify-center items-center px-6 text-white">
        {[
          { name: "Admin Panel", path: "/" },
          { name: "Instructors", path: "/instructors" },
          { name: "Add Course", path: "/courses/add" },
          { name: "Schedule Lecture", path: "/lectures/schedule" },
        ].map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`hover:text-gray-300 transition-all duration-200 px-3 py-1 rounded-md ${
                location.pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}

        {token ? (
          <li>
            <button
              onClick={logout}
              className="text-red-400 hover:text-red-600 transition-all duration-200 px-3 py-1 rounded-md"
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link
              to="/login"
              className="hover:text-gray-300 transition-all duration-200 px-3 py-1 rounded-md"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
