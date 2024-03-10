import React, { useState } from "react";
import "./applyPassport.css";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

function RenewPassport() {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  return (
    <div>
      <div className="header">
        <h1>Passport Registration</h1>
      </div>
      <div className="mainform">
        <form action="*">
          <div className="container">
          <label htmlFor="id">
              <b>Reason of Renewal</b>
            </label>
            <input type="text" placeholder="Enter Reason of Renewal" name="id" required />
            <label htmlFor="id">
              <b>User Id</b>
            </label>
            <input type="text" placeholder="Enter User Id" name="id" required />

            <div>
              <label htmlFor="country">
                <b>Country</b>
              </label>
              <CountrySelect
                onChange={(e) => {
                  setCountryid(e.id);
                }}
                placeHolder="Select Country"
              />
              <label htmlFor="state">
                <b>State</b>
              </label>
              <StateSelect
                countryid={countryid}
                onChange={(e) => {
                  setstateid(e.id);
                }}
                placeHolder="Select State"
              />
              <label htmlFor="city">
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

            <label htmlFor="pin">
              <b>Pincode</b>
            </label>
            <input
              type="number"
              placeholder="Enter Pincode"
              minLength="6"
              maxLength="6"
              name="pincode"
              required
            />

            <label htmlFor="type">
              <b>Type of Service</b>
            </label>
            <select name="dog-names" id="dog-names">
              <option value="normal">Normal</option>
              <option value="tatkal">Tatkal</option>
            </select>


            <label htmlFor="booklet">
              <b>Booklet Type</b>
            </label>
            <select name="dog-names" id="dog-names">
              <option value="p1">60 Pages</option>
              <option value="p2">30 Pages</option>
            </select>

            <label htmlFor="date">
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

export default RenewPassport;
