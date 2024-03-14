import React,{useState} from "react";
import axios from "axios";
import Delete from "./components/delete/button";

function CancelVisa() {

  const [userId, setUserId] = useState("");
  const [passport, setPassport] = useState("");
  const [visa,setVisa] = useState("");
  const [doi, setDoi] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/cancel", {
        userId: userId,
        passport: passport,
        visa: visa,
        doi: doi,
      })
      .then((res) => {
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
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter User Id" name="id" required />

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
