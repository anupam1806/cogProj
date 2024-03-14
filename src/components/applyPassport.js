import React, { useState, useEffect } from "react";
import axios from "axios";
import "./applyPassport.css";
import { Link } from "react-router-dom";
// import {
//   CitySelect,
//   CountrySelect,
//   StateSelect,
// } from "react-country-state-city";
// import { useAuth } from './authContext';
import "react-country-state-city/dist/react-country-state-city.css";

function ApplyPassport() {

  // const { isAuthenticated, login, logout } = useAuth();

  const [userId, setUserId] = useState("");
  const [countryid, setCountryid] = useState("");
  const [stateid, setStateid] = useState("");
  const [cityid, setCityid] = useState("");
  // const[selectedValue,setSelectedValue] = useState("");
  // const [dropdownValues,setDropdown] = useState([]);
  const [pincode, setPincode] = useState("");
  const [booklet, setBooklet] = useState("");
  const [typeService, setTypeService] = useState("");
  const [issue, setIssue] = useState("");

  const [coi, setCoi] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/renew")
      .then((response) => response.json())
      .then((data) => setCoi(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/applyPassport", {
        userId: userId,
        countryid: countryid,
        stateid: stateid,
        cityid: cityid,
        pincode: pincode,
        booklet: booklet,
        typeService: typeService,
        issue: issue,
      })
      .then((res) => {
        const passportNumber = res.data.passportNumber;
        const applicationCost = res.data.applicationCost;
        // const expiry = res.data.expiry;
        alert(`Your Passport number is ${passportNumber} and Application Cost is ${applicationCost}.`)
        // navigate('/signin')
        console.log(res);
        setCountryid("");
        setStateid("");
        setCityid("");
        setPincode("");
        setBooklet("");
        setTypeService("");
        setIssue("");
      });
  };

  return (
    <div>
      {/* {isAuthenticated ? (
        <> */}
      <nav className="nav">
        <Link to="/renewpassport">
          <button className="nav-button">Passport Renewal</button>
        </Link>
      </nav>
      <div className="header">
        <h1>Passport Registration</h1>
      </div>
      <div className="mainform">
        <form action="*" onSubmit={submitHandler}>
          <div className="container">
            <label htmlFor="id">
              <b>User Id</b>
            </label>
            <label
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              disabled
            >
              {users.map((user) => (
                <label value={user.User_id} key={user.id}>
                  {user.User_id}
                </label>
              ))}
            </label>
            <div>
              <label htmlFor="country">
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
              // value={(e) => setCountryName(e.name)}
                onChange={(e) => setCountryid(e.id)}
                placeHolder="Select Country"
              /> */}
              <label htmlFor="state">
                <b>State</b>
              </label>

              <select
                value={stateid}
                onChange={(e) => setStateid(e.target.value)}
              >
                <option value="NA">NA</option>
                {coi.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.state}
                  </option>
                ))}
              </select>

              {/* <StateSelect
                countryid={countryid}
                onChange={(e) => {
                  setstateid(e.id);
                  console.log(e.name);
                }}
                placeHolder="Select State"
              /> */}
              <label for="city">
                <b>City</b>
              </label>

              <select
                value={cityid}
                onChange={(e) => setCityid(e.target.value)}
              >
                <option value="NA">NA</option>
                {coi.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.city}
                  </option>
                ))}
              </select>

              {/* <CitySelect
                countryid={countryid}
                stateid={stateid}
                onChange={(e) => {
                  setcityid(e.id);
                }}
                placeHolder="Select City"
                value={cityid}
              /> */}
            </div>

            <label for="pin">
              <b>Pincode</b>
            </label>
            <input
              type="number"
              placeholder="Enter Pincode"
              maxLength="6"
              minLength="6"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              name="pincode"
              required
            />

            <label for="type">
              <b>Type of Service</b>
            </label>
            <select
              name="dog-names"
              id="dog-names"
              value={typeService}
              onChange={(e) => setTypeService(e.target.value)}
            >
              <option value="NA">NA</option>
              <option value="normal">Normal</option>
              <option value="tatkal">Tatkal</option>
            </select>

            <label for="booklet">
              <b>Booklet Type</b>
            </label>
            <select
              name="dog-names"
              id="dog-names"
              value={booklet}
              onChange={(e) => setBooklet(e.target.value)}
            >
              <option value="NA">NA</option>
              <option value="60">60 Pages</option>
              <option value="30">30 Pages</option>
            </select>

            <label for="date">
              <b>Issue Date</b>
            </label>
            <input
              type="date"
              placeholder="Enter Issue Date"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
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
      {/* </>
      ) : (
        <div>
          <p>Login</p>
        </div>
      )} */}
    </div>
  );
}

export default ApplyPassport;
