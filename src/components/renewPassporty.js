import React, { useState, useEffect } from "react";
import axios from "axios";
import "./applyPassport.css";
// import {
//   CitySelect,
//   CountrySelect,
//   StateSelect,
// } from "react-country-state-city";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "./Logout";
import "react-country-state-city/dist/react-country-state-city.css";

function RenewPassport() {

  axios.defaults.withCredentials = true

  const navigate = useNavigate();

  const [reason, setReason] = useState("");
  const [countryid, setCountryid] = useState("");
  const [stateid, setStateid] = useState("");
 const [cityid,setCityid] = useState("");
 const [pincode, setPincode] = useState("");
  const [booklet, setBooklet] = useState("");
  const [typeService, setTypeService] = useState("");
  const [issue, setIssue] = useState("");
  const [coi, setCoi] = useState([]);
  const [user, setUser] = useState("");
  const [data, setData] = useState("");

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
    fetch('http://localhost:8000/renew')
      .then(response => response.json())
      .then(data => setCoi(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    console.log("User has a id"+user);
    fetch('http://localhost:8000/populate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    })
    .then(response => response.json())
    .then(data => {
      setCountryid(data.countryid);
      setStateid(data.stateid);
      setCityid(data.cityid);
      setPincode(data.pincode);
      setBooklet(data.booklet);
      setTypeService(data.typeService);
      setIssue(data.issue);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [user]); // add user as a dependency to the useEffect hook
  
  

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/renewPassport", {
        reason: reason,
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
        alert(`Your new Passport number is ${passportNumber} and Application Cost is ${applicationCost}.`)
        navigate("/confirmation");
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

  return (
    <div>
      {/* <div className="header">
        
      </div> */}
      <nav className="nav">
        <Link to="/signin">
        <LogoutButton />
        </Link>
        <a className="headlink" href="/"><h4 className="heading">Passport & Visa Management</h4> </a>
        
      </nav>
      <div className="fully">
      <h1 className="headpass">Passport Renewal</h1>
      
      <div className="mainform">
        <form action="*" onSubmit={submitHandler}>
          <div className="container">
          <label htmlFor="id"  className="col-sm-4">
              <b>User Id </b>
            </label>
            <input
              type="text"
              placeholder="Enter User Id"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          <label htmlFor="id"  className="col-sm-4">
              <b>Reason of Renewal </b>
            </label>
            <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Enter Reason of Renewal" name="id" required />

            <div>
              <label htmlFor="country"  className="col-sm-4">
                <b>Country </b>
              </label>

              <select value={countryid} onChange={handleCountryChange}>
                <option value="">Select Country</option>
                {Object.keys(data).map((countryid) => (
                    <option key={countryid} value={countryid}>{countryid}</option>
                ))}
            </select>

              {/* <select value={countryid} onChange={(e) => setCountryid(e.target.value)}>
              <option value="Select--">Select--</option>
              {coi.map(user => (
        <option value={user.id} key={user.id}>
          {user.country}
        </option>
      ))}
              </select> */}

              {/* <CountrySelect
                onChange={(e) => {
                  setCountryid(e.id);
                }}
                placeHolder="Select Country"
              /> */}
              <label htmlFor="state"  className="col-sm-4">
                <b>State </b>
              </label>
              <select value={stateid} onChange={handleStateChange}>
                <option value="">Select State</option>
                {countryid && data[countryid].states.map((stateid) => (
                    <option key={stateid} value={stateid}>{stateid}</option>
                ))}
            </select>


              {/* <select value={stateid} onChange={(e) => setStateid(e.target.value)}>
              <option value="Select--">Select--</option>
              {coi.map(user => (
        <option value={user.id} key={user.id}>
          {user.state}
        </option>
      ))}
              </select> */}

              {/* <StateSelect
                countryid={countryid}
                onChange={(e) => {
                  setstateid(e.id);
                }}
                placeHolder="Select State"
              /> */}
              <label htmlFor="city"  className="col-sm-4">
                <b>City </b>
              </label>

              <select value={cityid} onChange={handleCityChange}>
                <option value="">Select City</option>
                {stateid && data[countryid].cities[stateid].map((cityid) => (
                    <option key={cityid} value={cityid}>{cityid}</option>
                ))}
            </select>
              

              
              {/* <select value={cityid} onChange={(e) => setCityid(e.target.value)}>
              <option value="Select--">Select--</option>
              {coi.map(user => (
        <option value={user.id} key={user.id}>
          {user.city}
        </option>
      ))}
              </select> */}

              {/* <CitySelect
                countryid={countryid}
                stateid={stateid}
                onChange={(e) => {
                  console.log(e);
                }}
                placeHolder="Select City"
              /> */}
            </div>

            <label htmlFor="pin" className="col-sm-4">
              <b>Pincode </b>
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

            <label htmlFor="type" className="col-sm-4">
              <b>Type of Service </b>
            </label>
            <select name="dog-names" id="dog-names" value={typeService} onChange={(e) => setTypeService(e.target.value)}>
            <option value="Select--">Select--</option>
              <option value="normal">Normal</option>
              <option value="tatkal">Tatkal</option>
            </select>

            <label htmlFor="booklet" className="col-sm-4">
              <b>Booklet Type </b>
            </label>
            <select name="dog-names" id="dog-names" value={booklet} onChange={(e) => setBooklet(e.target.value)}>
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
              min={new Date().toISOString().split('T')[0]}
              value={issue} onChange={(e) => setIssue(e.target.value)}
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
    </div>
  );
}

export default RenewPassport;
