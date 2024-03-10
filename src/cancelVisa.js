import React from "react";
import Delete from "./components/delete/button";

function CancelVisa() {
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

            <label for="id">
              <b>Passport Number</b>
            </label>
            <input type="text" placeholder="Enter Passport Number" name="id" required />

            <label for="id">
              <b>Visa Number</b>
            </label>
            <input type="text" placeholder="Enter Visa number" name="id" required />

            <label for="date">
              <b>Date of Issue</b>
            </label>
            <input
              type="date"
              placeholder="Enter Date of Issue"
              name="date"
              required
            />

            <div className="clearfix">
              <button type="reset" className="cancelbtn">
                Reset
              </button>
              {/* <button type="submit"> */}
                <Delete />
              {/* </button> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CancelVisa;
