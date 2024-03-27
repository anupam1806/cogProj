import React, { useState, useEffect } from "react";
import axios from "axios";
// import {
//   CountrySelect
// } from "react-country-state-city";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "./Logout";
import "react-country-state-city/dist/react-country-state-city.css";

function ApplyVisa() {

  axios.defaults.withCredentials = true

  const navigate = useNavigate();

  const [occupation, setOccupation] = useState("");
  const [countryid, setCountryid] = useState("");
  const [date, setDate] = useState("");
  const [coi, setCoi] = useState([]);
  const [, setUsers] = useState([]);
  const [, setUserId] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/username")
    .then( res => {
      if(res.data.valid){
        setUser(res.data.user)
      }
      else{
        navigate("/signin");
      }
      console.log(res);
    })
    .catch(err => console.log(err))
  }, [navigate]);

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
        user: user,
        countryid: countryid,
        occupation: occupation,
        date: date,
      })
      .then((res) => {
        const visa = res.data.visaApp;
        const cost = res.data.applicationPermit;
        alert(`Your visa number is ${visa} and Permit is ${cost} years.`);
        navigate('/confirmation')
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
        <Link to="/signin">
        <LogoutButton />
        </Link>
        <a className="headlink" href="/"><h4 className="heading">Passport & Visa Management</h4> </a>
      </nav>
      {/* <div className="head"></div> */}
      <div className="visafull">
      <h1 className="headvisa">Visa Registration</h1>
      <div className="mainform">
        <form action="*" onSubmit={submitHandler}>
          <div className="container">
            <label htmlFor="id"  className="col-sm-4">
              <b>User Id </b>
            </label>
            <input
              type="text"
              placeholder="Enter User Id"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />

            <label htmlFor="country"  className="col-sm-4">
              <b>Country </b>
            </label>
            <select
              value={countryid}
              onChange={(e) => setCountryid(e.target.value)}
            >
              <option value="Select--">Select--</option>
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

            <label htmlFor="occupation"  className="col-sm-4">
              <b>Occupation </b>
            </label>
            <select
              name="dog-names"
              id="dog-names"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option value="Select--">Select--</option>
              <option value="Student">Student</option>
              <option value="Private Employee">Private Employee</option>
              <option value="Government Employee">Government Employee</option>
              <option value="Self Employed">Self Employed</option>
              <option value="Retire Employee">Retire Employee</option>
            </select>

            <label htmlFor="date" className="col-sm-4">
              <b>Date of Application </b>
            </label>
            <input
              type="date"
              placeholder="Enter Date of Application"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              name="date"
              required
            />

            <div className="clearfix">
            <button
                type="reset"
                className="cancelbtn"
                onClick={() => {
                  setCountryid("");
                  setOccupation("");
                  setDate("");
                }}
              >
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
    </div>
  );
}

export default ApplyVisa;
