import React, { useState } from "react";
import axios from "axios";
import "./registration.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = (e) => {
    e.preventDefault();
      axios.post("http://localhost:8000/authenticate", {
        name: name,
        number: number,
        password: password,
      }).then(res =>{
        if(res.data.Login){
          navigate('/passport')
        } else{
          alert("Not a valid User");
        }
        console.log(res);
    })
    .catch(err=> console.log(err));
  };

  return (
    <div>
      <form className="modal-content" onSubmit={auth}>
        <div className="container">
          <h1>Sign In</h1>
          <p>Please fill in this form to login.</p>
          <hr />
          <label htmlFor="id">
            <b>Customer ID</b>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="contact">
            <b>Contact Number</b>
          </label>
          <input
            type="number"
            placeholder="Enter Contact number"
            name="number"
            value={number}
            maxlength="10"
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            
            pattern="/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{9}$/g"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="clearfix">
            <button type="button" className="cancelbtn">
              Cancel
            </button>
            <button type="submit" className="signup">
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
