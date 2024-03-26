import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="nav">
        <Link to="/signup">
          <button className="nav-button">Register</button>
        </Link>
        <Link to="/signin">
          <button className="nav-button">Login</button>
        </Link>
        <a className="headlink" href="/"><h4 className="heading">Passport & Visa Management</h4> </a>
      </nav>
    </>
  );
}

export default Navbar;
