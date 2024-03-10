const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "my_db",
});

app.post("/submit", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "INSERT INTO USERS (email,password) VALUES(?,?)",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ username: username });
      }
    }
  );
});

app.post('/authenticate',(req, res) => {

  const sql = "SELECT * FROM users WHERE EMAIL=? AND PASSWORD=?";

  const name = req.body.name;
  // const number = req.body.number;
  const password = req.body.password;

  db.query(
    sql,
    [name, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } 
      if(result.length > 0){
        return res.json({Login:true})
      }
      else{
        return res.json({Login:false})
      }
    }
  );
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
