import React, { useState, useEffect } from "react";
import axios from "axios";
import "./registration.css";
import { useNavigate,Link } from "react-router-dom";

function Login() {
  const [userId, setUserId] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get("http://localhost:8000/username")
    .then( res => {
      if(res.data.valid){
        navigate("/select");
      }
      else{
        navigate("/signin");
      }
      console.log(res);
    })
    .catch(err => console.log(err))
  }, [navigate]);

  const auth = (e) => {
    e.preventDefault();
    // axios(path,parameters).then(actions)
      axios.post("http://localhost:8000/authenticate", {
        userId: userId,
        contact: contact,
        password: password
      }).then(res =>{
        if(res.data.Login){
          navigate('/select')
        } else{
          alert("Not a valid User");
        }
        console.log(res);
    })
    .catch(err=> console.log(err));
  };

  return (
    <div className="full">
      <nav className="nav">
        <Link to="/signup">
          <button className="nav-button">Register</button>
        </Link>
        <a className="headlink" href="/"><h4 className="heading">Passport & Visa Management</h4> </a>
      </nav>
      <div className="mainform">
      <form className="modal-content" onSubmit={auth}>
        <div className="container">
          <h1>Sign In</h1>
          <p>Please fill in this form to login.</p>
          <hr />
          <label htmlFor="id" className="col-sm-4">
            <b>Customer ID </b>
          </label>
          <input
            type="text"
            placeholder="Enter UserId"
            name="name"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <label htmlFor="contact" className="col-sm-4">
            <b>Contact Number </b>
          </label>
          <input
              type="number"
              id="contact"
              value={contact}
              placeholder="Enter Contact"
              pattern="[0-9]{10,10}"
              name="contact"
              maxlength="10"
              onChange={(e) => {
                if (e.target.value.length <= 10) {
                  setContact(e.target.value);
                }
              }}
              required
            />
          <label htmlFor="psw" className="col-sm-4">
            <b>Password </b>
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
          <button
                type="reset"
                className="cancelbtn"
                onClick={() => {
                  setUserId("");
                  setContact("");
                  setPassword("");
                }}
              >
                Reset
              </button>
            <button type="submit" className="signup">
              Sign In
            </button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Login;
