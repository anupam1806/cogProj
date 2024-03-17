import React from "react";
import "./home.css";
// import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* <Link to="/signup">
        <button className="cancelbtn">Signup</button>
      </Link>
      <Link to="signin">
        <button className="signup">SignIn</button>
      </Link> */}

  <div class="landing">
    <div class="bg"></div>
    <div class="container column bg-column__center">
      <h1 class="title">
        Don't miss out our application!
      </h1>
      <p class="subheading">
        Apply for passport and visa on our application.
      </p>
      <div className="bodybut">
      <button class="book-button">
        <a href="/signup" class="book-link">Sign Up</a>
      </button>
      <button class="book-button">
        <a href="/signin" class="book-link">Sign In</a>
      </button>
      </div>
    </div>
  </div>
  <div class="info-content">
    <div class="container info-flex">
      <main class="main-content">
        <h2 class="main-title">About Us</h2>
        <div class="section-info">
          <p class="section-info__para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p class="section-info__para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <p class="section-info__para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </div>
      </main>
      <aside class="aside-content">
        <div class="aside-card">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
        <div class="aside-card aside-card-imp">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </aside>
    </div>
  </div>
    </div>
  );
}

export default Home;
