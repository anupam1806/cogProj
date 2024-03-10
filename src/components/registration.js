import React, { useState } from "react";
import axios from "axios";
import "./registration.css";
import Navbar from "./navbar/navbar";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/submit", {
        username: username,
        password: password,
      })
      .then((data) => {
        console.log(data);
        setUsername("");
        setPassword("");
      });
  };

  return (
    <>
      <Navbar />
      <div className="mainform">
        <form className="modal-content" onSubmit={submitHandler}>
          <div className="container">
            <h1>Sign Up</h1>
            <p>Please fill in this form to register.</p>
            <hr />
            <label htmlFor="first">
              <b>First Name</b>
            </label>
            <input
              type="text"
              id="first"
              value={username}
              placeholder="Enter First Name"
              name="first"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="last">
              <b>Sur Name</b>
            </label>
            <input
              type="text"
              id="sur"
              // value={username}
              placeholder="Enter Sur Name"
              name="sur"
              // onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">
              <b>Date of Birth</b>
            </label>
            <input
              type="date"
              id="dob"
              // value={username}
              placeholder="Enter DOB"
              name="dob"
              // onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">
              <b>Address</b>
            </label>
            <textarea
              type="text"
              id="address"
              // value={username}
              placeholder="Enter Address"
              name="address"
              // onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">
              <b>Contact Number</b>
            </label>
            <input
              type="text"
              id="contact"
              // value={username}
              placeholder="Enter Contact"
              name="contact"
              maxlength="10"
              // onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              id="email"
              // value={username}
              placeholder="Enter Email"
              name="email"
            
              // onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">
              <b>Qualification</b>
            </label>
            <input
              type="text"
              id="qualification"
              // value={username}
              placeholder="Enter Qualification"
              name="qualification"
              // onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">
              <b>Gender</b>
            </label>
            <select name="dog-names" id="dog-names">
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
            <label htmlFor="email">
              <b>Apply Type</b>
            </label>
            <input
              type="text"
              id="apply"
              // value={username}
              placeholder="Enter Apply Type"
              name="apply"
              // onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email"><b>Hint Question</b> </label>
            <select name="dog-names" id="dog-names">
              <option value="q1">What is your pet name?</option>
              <option value="q2">When is your birthday?</option>
              <option value="q3">Favourite place?</option>
              <option value="q4">Which city you live in?</option>
            </select>
            
            <label htmlFor="email">
              
              <b>Hint Answer</b>
            </label>
            <input
              type="text"
              id="answer"
              // value={username}
              placeholder="Enter Question Hint Answer"
              name="answer"
              // onChange={(e) => setUsername(e.target.value)}
              required
            />

          {/*} <label htmlFor="psw">
              <b>Password (Minimum 8 characters)</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              name="psw"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              disabled
            />
  */}

            <div className="clearfix">
              <button type="button" className="cancelbtn">
                Cancel
              </button>
              <button type="submit" className="signup">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Registration;
