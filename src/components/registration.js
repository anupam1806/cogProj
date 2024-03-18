import React, { useState } from "react";
import axios from "axios";
import "../components/navbar/navbar.css";
import "./registration.css";
// import Navbar from "./navbar/navbar";
import { useNavigate,Link } from "react-router-dom";

function Registration() {
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [dob,setDob] = useState("");
  const [address,setAddress] = useState("");
  const [contact,setContact] = useState("");
  const [email,setEmail] = useState("");
  const [qualification,setQualification] = useState("");
  const [gender,setGender] = useState("");
  const [applyType,setApplyType] = useState("");
  const [hint,setHint] = useState("");
  const [hintAnswer,setHintAns] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setApplyType(e.target.value);
    console.log('Selected value:', e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/submit", {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        address: address,
        contact: contact,
        email: email,
        qualification: qualification,
        gender: gender,
        applyType: applyType,
        hint: hint,
        hintAnswer: hintAnswer
      })
      .then((res) => {
        // const { userId, password } = data.;
        const userId = res.data.userId;
        const password = res.data.password;
        // console.log(userId);
        // console.log(password);
        // alert(password);
        alert(`Your user Id is ${userId} and password is ${password}.`)
        // console.log(res.data);
        
        navigate('/signin')
        // console.log(res);
        setFirst("");
        setLast("");
        setDob("");
        setAddress("");
        setContact("");
        setEmail("");
        setQualification("");
        setGender("");
        setApplyType("");
        setHint("");
        setHintAns("");
      });
  };

  return (
    <>
      <nav className="nav">
        <Link to="/signin">
          <button className="nav-button">Login</button>
        </Link>
      </nav>
      <div className="mainform">
        <form className="modal-content" onSubmit={submitHandler}>
          <div className="container">
            <h1>Sign Up</h1>
            <p>Please fill in this form to register.</p>
            <hr />
            <label htmlFor="first" className="col-sm-4">
              <b>First Name </b>
            </label>
            <input
              type="text"
              id="first"
              value={firstName}
              placeholder="Enter First Name"
              name="first"
              onChange={(e) => setFirst(e.target.value)}
              required
            />
            <label htmlFor="last" className="col-sm-4">
              <b>Sur Name </b>
            </label>
            <input
              type="text"
              id="sur"
              value={lastName}
              placeholder="Enter Sur Name"
              name="sur"
              onChange={(e) => setLast(e.target.value)}
              required
            />
            <label htmlFor="email" className="col-sm-4">
              <b>Date of Birth </b>
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              placeholder="Enter DOB"
              name="dob"
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDob(e.target.value)}
              required
            />
            <label htmlFor="email" className="col-sm-4">
              <b>Address </b>
            </label>
            <textarea
              type="text"
              id="address"
              value={address}
              placeholder="Enter Address"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <label htmlFor="email" className="col-sm-4">
              <b>Contact Number </b>
            </label>
            <input
              type="text"
              id="contact"
              value={contact}
              placeholder="Enter Contact"
              name="contact"
              maxlength="10"
              onChange={(e) => setContact(e.target.value)}
              required
            />
            <label htmlFor="email" className="col-sm-4">
              <b>Email </b>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter Email"
              name="email"
            
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email" className="col-sm-4">
              <b>Qualification </b>
            </label>
            <input
              type="text"
              id="qualification"
              value={qualification}
              placeholder="Enter Qualification"
              name="qualification"
              onChange={(e) => setQualification(e.target.value)}
              required
            />
            <label htmlFor="email" className="col-sm-4 ">
              <b>Gender </b>
            </label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Select--">Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <label htmlFor="email" className="col-sm-4">
              <b>Apply Type </b>
            </label>
            <select value={applyType} onChange={handleChange}>
            <option value="Select--">Select--</option>
              <option value="Passport">Passport</option>
              <option value="Visa">Visa</option>
            </select>
            <label htmlFor="email" className="col-sm-4"><b>Hint Question </b> </label>
            <select value={hint} onChange={(e) => setHint(e.target.value)}>
            <option value="Select--">Select--</option>
            
              <option value="What is your pet name?">What is your pet name?</option>
              <option value="When is your birthday?">When is your birthday?</option>
              <option value="Favourite place?">Favourite place?</option>
              <option value="Which city you live in?">Which city you live in?</option>
            </select>
            
            <label htmlFor="email" className="col-sm-4">
              <b>Hint Answer </b>
            </label>
            <input
              type="text"
              id="answer"
              value={hintAnswer}
              placeholder="Enter Question Hint Answer"
              name="answer"
              onChange={(e) => setHintAns(e.target.value)}
              required
            />

            <div className="clearfix">
              <button type="button" className="cancelbtn">
                Reset
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
