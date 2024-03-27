import React from "react";
import "./select.css";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";

function Select() {
  return (
    <div>
        <nav className="nav">
        <Link to="/signin">
        <LogoutButton />
        </Link>
        <a className="headlink" href="/"><h4 className="heading">Passport & Visa Management</h4> </a>
        
      </nav>
      <div className="contai">

          <div className="one">
              <div className="content">
                  <a href="/passport" className="bn">Passport Registration</a>
              </div>
          </div>

          <div className="two">
              <div className="content">
                  <a href="/visa" className="bn">Visa Registration</a>
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
