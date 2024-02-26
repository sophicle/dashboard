import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between bg-blue-500 p-4">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-white text-4xl">
          Sophie Wang
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/blog" className="text-white">
          Blog
        </Link>
        <Link to="/resume" className="text-white">
          Resume
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
