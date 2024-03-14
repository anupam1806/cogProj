import React, { useState, useEffect } from "react";
import axios from "axios";
// import {
//   CountrySelect
// } from "react-country-state-city";
import { Link } from "react-router-dom";
import "react-country-state-city/dist/react-country-state-city.css";

function ApplyVisa() {
  const [occupation, setOccupation] = useState("");
  const [countryid, setCountryid] = useState("");
  const [date, setDate] = useState("");
  const [coi, setCoi] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/renew")
      .then((response) => response.json())
      .then((data) => setCoi(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/applyvisa", {
        userId: userId,
        countryid: countryid,
        occupation: occupation,
        date: date,
      })
      .then((res) => {
        const visa = res.data.visaApp;
        const cost = res.data.applicationPermit;
        // const { userId, password } = res.data;
        alert(`Your visa number is ${visa} and Permit is ${cost} years.`);
        // navigate('/signin')
        // console.log(res);
        setUserId("");
        setCountryid("");
        setOccupation("");
        setDate("");
      });
  };

  useEffect(() => {
    fetch("http://localhost:8000/api")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <nav className="nav">
        <Link to="/cancelvisa">
          <button className="nav-button">Visa Cancellation</button>
        </Link>
      </nav>
      <div className="head"></div>
      <div className="mainform">
        <form action="*" onSubmit={submitHandler}>
          <div className="container">
            <label for="id">
              <b>User Id</b>
            </label>
            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              disabled
            >
              {users.map((user) => (
                <option value={user.User_id} key={user.id}>
                  {user.User_id}
                </option>
              ))}
            </select>

            <label for="country">
              <b>Country</b>
            </label>
            <select
              value={countryid}
              onChange={(e) => setCountryid(e.target.value)}
            >
              <option value="NA">NA</option>
              {coi.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.country}
                </option>
              ))}
            </select>

            {/* <CountrySelect
                onChange={(e) => {
                  setCountryid(e.id);
                }}
                placeHolder="Select Country"
              /> */}

            <label for="occupation">
              <b>Occupation</b>
            </label>
            <select
              name="dog-names"
              id="dog-names"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option value="NA">NA</option>
              <option value="Student">Student</option>
              <option value="Private Employee">Private Employee</option>
              <option value="Government Employee">Government Employee</option>
              <option value="Self Employed">Self Employed</option>
              <option value="Retire Employee">Retire Employee</option>
            </select>

            <label for="date">
              <b>Date of Application</b>
            </label>
            <input
              type="date"
              placeholder="Enter Date of Application"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              name="date"
              required
            />

            <div className="clearfix">
              <button type="reset" className="cancelbtn">
                Reset
              </button>
              <button type="submit" className="signup">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyVisa;
