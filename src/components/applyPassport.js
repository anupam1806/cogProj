import React, { useState } from "react";
import axios from "axios";
import "./applyPassport.css";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

function ApplyPassport() {
  const [userId, setUserId] = useState("");
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [countryName, setCountryName] = useState("");
  const [pincode, setPincode] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/applyPassport", {
        pincode: pincode,
        stateid: stateid,
        // dob: dob,
        // address: address,
        // contact: contact,
        // email: email,
        // qualification: qualification,
        // gender: gender,
        // applyType: applyType,
        // hint: hint,
        // hintAnswer: hintAnswer
      })
      .then((res) => {
        // const { userId, password } = res.data;
        // alert(`Your user Id is ${userId} and password is ${password}.`)
        // navigate('/signin')
        console.log(res);
        // setFirst("");
        // setLast("");
        // setDob("");
        // setAddress("");
        // setContact("");
        // setEmail("");
        // setQualification("");
        // setGender("");
        // setApplyType("");
        // setHint("");
        // setHintAns("");
      });
  };

  return (
    <div>
      <div className="header">
        <h1>Passport Registration</h1>
      </div>
      <div className="mainform">
        <form action="*" onSubmit={submitHandler}>
          <div className="container">
            <label for="id">
              <b>User Id</b>
            </label>
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter User Id" name="id" disabled />

            <div>
              <label for="country">
                <b>Country</b>
              </label>
              <CountrySelect
              value={countryName}
                onChange={(e) => {
                  setCountryid(e.id);
                }}
                placeHolder="Select Country"
              />
              <label for="state">
                <b>State</b>
              </label>
              <StateSelect
                countryid={countryid}
                onChange={(e) => {
                  setstateid(e.id);
                }}
                placeHolder="Select State"
              />
              <label for="city">
                <b>City</b>
              </label>

              <CitySelect
                countryid={countryid}
                stateid={stateid}
                onChange={(e) => {
                  console.log(e);
                }}
                placeHolder="Select City"
              />
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
            <select name="dog-names" id="dog-names">
              <option value="normal">Normal</option>
              <option value="tatkal">Tatkal</option>
            </select>

            <label for="booklet">
              <b>Booklet Type</b>
            </label>
            <select name="dog-names" id="dog-names">
              <option value="p1">60 Pages</option>
              <option value="p2">30 Pages</option>
            </select>

            <label for="date">
              <b>Issue Date</b>
            </label>
            <input
              type="date"
              placeholder="Enter Issue Date"
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

export default ApplyPassport;
