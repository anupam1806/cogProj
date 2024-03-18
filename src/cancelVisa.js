import React,{useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Delete from "./components/delete/button";

function CancelVisa() {

  axios.defaults.withCredentials = true

  const navigate = useNavigate();

  const [, setUserId] = useState("");
  const [passport, setPassport] = useState("");
  const [visa,setVisa] = useState("");
  const [doi, setDoi] = useState("");
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

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/cancel", {
        user: user,
        passport: passport,
        visa: visa,
        doi: doi,
      })
      .then((res) => {
        alert("The apllication for visa has been canceled.")
        navigate("/confirmation");
        console.log(res);
        setUserId("");
        setPassport("");
        setVisa("");
        setDoi("");
      });
  };



  return (
    <div>
      <div className="head">
      </div>
      <div className="mainform">
        <form action="*" onSubmit={submitHandler}>
          <div className="container">
            <label for="id">
              <b>User Id</b>
            </label>
            <input
              type="text"
              placeholder="Enter User Id"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />

            <label for="id">
              <b>Passport Number</b>
            </label>
            <input type="text" value={passport} onChange={(e) => setPassport(e.target.value)}  placeholder="Enter Passport Number" name="id" required />

            <label for="id">
              <b>Visa Number</b>
            </label>
            <input type="text" value={visa} onChange={(e) => setVisa(e.target.value)}  placeholder="Enter Visa number" name="id" required />

            <label for="date">
              <b>Date of Issue</b>
            </label>
            <input
              type="date"
              placeholder="Enter Date of Issue"
              name="date"
              value={doi} onChange={(e) => setDoi(e.target.value)} 
              min={new Date().toISOString().split('T')[0]}
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
