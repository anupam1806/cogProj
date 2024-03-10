import React, { useState } from "react";
import {
  CountrySelect
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

function ApplyVisa() {
  const [, setCountryid] = useState(0);

  return (
    <div>
      <div className="head">
      </div>
      <div className="mainform">
        <form action="*">
          <div className="container">
            <label for="id">
              <b>User Id</b>
            </label>
            <input type="text" placeholder="Enter User Id" name="id" required />

              <label for="country">
                <b>Country</b>
              </label>
              <CountrySelect
                onChange={(e) => {
                  setCountryid(e.id);
                }}
                placeHolder="Select Country"
              />

            <label for="occupation">
              <b>Occupation</b>
            </label>
            <input
              type="text"
              placeholder="Enter Occupation"
              name="occupation"
              required
            />

            <label for="date">
              <b>Date of Application</b>
            </label>
            <input
              type="date"
              placeholder="Enter Date of Application"
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
