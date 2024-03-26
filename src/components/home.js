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
        Passport and Visa App!
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
          <p class="section-info__para justi">
          A passport and visa management system is a digital platform designed to streamline the
           process of issuing passports and visas. It typically includes features such as online 
           application submission, document verification, appointment scheduling, fee payment, and 
           status tracking. These systems aim to enhance efficiency, reduce processing times, improve 
           security measures, and provide better user experience for travelers and government 
           authorities alike. Additionally, they may integrate with immigration databases and
            biometric systems for enhanced security and identity verification.
          </p>
        </div>
      </main>
      <aside class="aside-content">
        <div class="aside-card">
        A passport is an essential travel document that verifies a person's identity and citizenship, 
        allowing them to cross international borders legally.
        </div>
        <div class="aside-card aside-card-imp">
        A visa is an endorsement on a passport that grants permission for entry into a
         specific country for a designated purpose and duration.
        </div>
      </aside>
    </div>
  </div>
    </div>
  );
}

export default Home;
