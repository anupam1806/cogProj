import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Registration from "./components/registration";
import Home from "./components/home";
import ApplyPassport from "./components/applyPassport";
import ApplyVisa from "./components/applyVisa";
import RenewPassport from "./components/renewPassporty";
import CancelVisa from "./cancelVisa";
import Select from "./components/select";
// import Button from "./components/delete/button";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/select" element={<Select />}></Route>
          <Route exact path="/signup" element={<Registration />}></Route>
          <Route exact path="/signin" element={<Login />}></Route>
          <Route exact path="/passport" element={<ApplyPassport />}></Route>
          <Route exact path="/visa" element={<ApplyVisa />}></Route>
          <Route exact path="/renewpassport" element={<RenewPassport />}></Route>
          <Route exact path="/cancelvisa" element={<CancelVisa />}></Route>
        </Routes>
      </Router>

      {/* <Button /> */}
    </div>
  );
}

export default App;
