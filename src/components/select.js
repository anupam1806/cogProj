import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

function Select() {
  return (
    <div>
      <Link to="/passport">
        <button className="cancelbtn">Passport application</button>
      </Link>
      <Link to="/visa">
        <button className="signup">Visa application</button>
      </Link>
    </div>
  );
}

export default Select;
