import React, { useState, useEffect } from "react";
import axios from "axios";
import "./applyPassport.css";
import { Link, useNavigate } from "react-router-dom";
// import {
//   CitySelect,
//   CountrySelect,
//   StateSelect,
// } from "react-country-state-city";
// import { useAuth } from './authContext';
import "react-country-state-city/dist/react-country-state-city.css";
import LogoutButton from "./Logout";

function ApplyPassport() {

  axios.defaults.withCredentials = true

  const navigate = useNavigate();
  // const { isAuthenticated, login, logout } = useAuth();
  const [countryid, setCountryid] = useState("");
  const [stateid, setStateid] = useState("");
  const [cityid, setCityid] = useState("");

  const [data, setData] = useState(null);

  // const[selectedValue,setSelectedValue] = useState("");
  // const [dropdownValues,setDropdown] = useState([]);
  const [pincode, setPincode] = useState("");
  const [booklet, setBooklet] = useState("");
  const [typeService, setTypeService] = useState("");
  const [issue, setIssue] = useState("");
  const [, setCoi] = useState([]);
  const [, setUsers] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/username")
    .then( res => {
      if(res.data.valid){
        setUser(res.data.user)
      }
      else{
        navigate("/signin");
      }
      console.log(res);
    })
    .catch(err => console.log(err))
  }, [navigate]);

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
        user: user,
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
        navigate('/confirmation');
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



  useEffect(() => {
    axios.get('http://localhost:8000/api/data')
        .then(response => {
            setData(response.data);
        });
}, []);

const handleCountryChange = (event) => {
    setCountryid(event.target.value);
    setStateid('');
    setCityid('');
};

const handleStateChange = (event) => {
    setStateid(event.target.value);
    setCityid('');
};

const handleCityChange = (event) => {
    setCityid(event.target.value);
};

if (!data) {
    return <div>Loading...</div>;
}



  return (
    <div>
      {/* {isAuthenticated ? (
        <> */}
      <nav className="nav">
        <Link to="/signin">
        <LogoutButton />
        </Link>
        
      </nav>
      {/* <div className="header">
        
      </div> */}
      <div className="fully">
      <h1 className="headpass">Passport Registration</h1>
      <div className="mainform1">
        <form action="*" onSubmit={submitHandler}>
          <div className="container">
            <label htmlFor="id">
              <b>User Id</b>
            </label>


            <input
              type="text"
              placeholder="Enter User Id"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
            {/* <label
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              disabled
            >
              {users.map((user) => (
                <label value={user.User_id} key={user.id}>
                  {user.User_id}
                </label>
              ))}
            </label> */}
            <div>
              <label htmlFor="country" className="col-sm-4">
                <b>Country </b>
              </label>


              <select value={countryid} onChange={handleCountryChange}>
                <option value="">Select Country</option>
                {Object.keys(data).map((countryid) => (
                    <option key={countryid} value={countryid}>{countryid}</option>
                ))}
            </select>



              {/* <select
                value={countryid}
                onChange={(e) => setCountryid(e.target.value)}
              >
                <option value="Select--">Select--</option>
                {coi.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.country}
                  </option>
                ))}
              </select> */}

              {/* <CountrySelect
              // value={(e) => setCountryName(e.name)}
                onChange={(e) => setCountryid(e.id)}
                placeHolder="Select Country"
              /> */}
              <label htmlFor="state" className="col-sm-4">
                <b>State </b>
              </label>


              <select value={stateid} onChange={handleStateChange}>
                <option value="">Select State</option>
                {countryid && data[countryid].states.map((stateid) => (
                    <option key={stateid} value={stateid}>{stateid}</option>
                ))}
            </select>





              {/* <select
                value={stateid}
                onChange={(e) => setStateid(e.target.value)}
              >
                <option value="Select--">Select--</option>
                {coi.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.state}
                  </option>
                ))}
              </select> */}

              {/* <StateSelect
                countryid={countryid}
                onChange={(e) => {
                  setstateid(e.id);
                  console.log(e.name);
                }}
                placeHolder="Select State"
              /> */}
              <label for="city" className="col-sm-4">
                <b>City </b>
              </label>



              <select value={cityid} onChange={handleCityChange}>
                <option value="">Select City</option>
                {stateid && data[countryid].cities[stateid].map((cityid) => (
                    <option key={cityid} value={cityid}>{cityid}</option>
                ))}
            </select>



              {/* <select
                value={cityid}
                onChange={(e) => setCityid(e.target.value)}
              >
                <option value="Select--">Select--</option>
                {coi.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.city}
                  </option>
                ))}
              </select> */}

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

            <label for="pin" className="col-sm-4">
              <b>Pincode </b>
            </label>
            <input type="number" id="pincode" name="pincode" pattern="^[0-9]{6}$" title="Please enter exactly 6 digits"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />

            <label for="type" className="col-sm-4">
              <b>Type of Service </b>
            </label>
            <select
              name="dog-names"
              id="dog-names"
              value={typeService}
              onChange={(e) => setTypeService(e.target.value)}
            >
              <option value="Select--">Select--</option>
              <option value="normal">Normal</option>
              <option value="tatkal">Tatkal</option>
            </select>

            <label for="booklet" className="col-sm-4">
              <b>Booklet Type </b>
            </label>
            <select
              name="dog-names"
              id="dog-names"
              value={booklet}
              onChange={(e) => setBooklet(e.target.value)}
            >
              <option value="Select--">Select--</option>
              <option value="60">60 Pages</option>
              <option value="30">30 Pages</option>
            </select>

            <label for="date" className="col-sm-4">
              <b>Issue Date </b>
            </label>
            <input
              type="date"
              placeholder="Enter Issue Date"
              value={issue}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setIssue(e.target.value)}
              name="date"
              required
            />

            <div className="clearfix">
              <button type="reset" value="reset" className="cancelbtn">
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
    </div>
  );
}

export default ApplyPassport;
