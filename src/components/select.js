import React from "react";
import "./select.css";

function Select() {
  return (
    <div>
      <div className="contai">

          <div className="one">
              <div className="content">
                  <a href="/passport" className="bn">Passport</a>
              </div>
          </div>

          <div className="two">
              <div className="content">
                  <a href="/visa" className="bn">Visa</a>
              </div>
          </div>

          <div className="three">
              <div className="content">
                  <a href="/renewpassport" className="bn">Passport Renewal</a>
              </div>
          </div>

          <div className="four">
              <div className="content">
                  <a href="/cancelvisa" className="bn">Cancel Visa</a>
              </div>
          </div>
          
      </div>
    </div>
  );
}

export default Select;
