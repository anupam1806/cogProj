import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="/signup">
        <button className="cancelbtn">Signup</button>
      </Link>
      <Link to="signin">
        <button className="signup">SignIn</button>
      </Link>
    </div>
  );
}

export default Home;
