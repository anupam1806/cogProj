const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "my_db",
});

function getLastUserID(applyType) {

  if (applyType === 'Passport') {
    return 'PASS-1234'; 
  } else if (applyType === 'Visa') {
    return 'VISA-5678.9012';
  }
}

function generateNextUserID(applyType) {
  const lastUserID = getLastUserID(applyType);

  if (typeof lastUserID === 'string') {
    const numericPart = parseFloat(lastUserID.split('-')[1]);

    const nextNumericPart = numericPart + 1;

    let nextUserID;
    if (applyType === 'Passport') {
      nextUserID = `PASS-${nextNumericPart.toFixed(0)}`;
    } else if (applyType === 'Visa') {
      nextUserID = `VISA-${nextNumericPart.toFixed(4)}`;
    }

    return nextUserID;
  } else {
    console.error('Error: lastUserID is undefined or not a string.');
    return null; 
  }
}

function generatePassword() {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0'); 
  const month = currentDate.toLocaleString('default', { month: 'short' }).toLowerCase();

  const randomThreeDigitNumber = Math.floor(Math.random() * 900) + 100;

  const specialCharacters = ['#', '@', '$'];
  const randomSpecialChar = specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

  const password = `${day}${month}${randomSpecialChar}${randomThreeDigitNumber}`;

  return password;
}

app.post("/submit", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dob = req.body.dob;
  const address = req.body.address;
  const contact = req.body.contact;
  const email = req.body.email;
  const qualification = req.body.qualification;
  const gender = req.body.gender;
  const applyType = req.body.applyType;
  const hint = req.body.hint;
  const hintAnswer = req.body.hintAnswer;
  var userId,password;

  
  if(applyType === "NA"){
    console.log("NA");}
    else if(applyType === "Passport"){
      userId = generateNextUserID('Passport');
      password = generatePassword();
      console.log(`Generated password: ${password}`);
      console.log(`id: ${userId}`);
    } else if(applyType === "Visa"){
      userId = generateNextUserID('Visa');
      password = generatePassword();
      console.log(`Generated password: ${password}`);
      console.log(`id: ${userId}`);
    }

  db.query(
    "INSERT INTO user_reg (User_id,Pass,f_name,l_name,dob,Address,Contact,Email,Qualification,gender,ApplyType,HintQuestion,HintAnswer) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [userId,password,firstName, lastName,dob,address,contact,email,qualification,gender,applyType,hint,hintAnswer],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post('/authenticate',(req, res) => {

  const sql = "SELECT * FROM user_reg WHERE User_Id=? AND Contact=? AND Pass=?";

  const userId = req.body.userId;
  const contact = req.body.contact;
  const password = req.body.password;

  db.query(
    sql,
    [userId, contact, password],
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

app.post("/applyPassport", (req, res) => {
  const stateid = req.body.stateid;
  const countryName = req.body.countryName;
  console.log(stateid);
  // const lastName = req.body.lastName;
  // const dob = req.body.dob;
  // const address = req.body.address;
  // const contact = req.body.contact;
  // const email = req.body.email;
  // const qualification = req.body.qualification;
  // const gender = req.body.gender;
  // const applyType = req.body.applyType;
  // const hint = req.body.hint;
  // const hintAnswer = req.body.hintAnswer;
  // var userId,password;

  
  // if(applyType === "NA"){
  //   console.log("NA");}
  //   else if(applyType === "Passport"){
  //     userId = generateNextUserID('Passport');
  //     password = generatePassword();
  //     console.log(`Generated password: ${password}`);
  //     console.log(`id: ${userId}`);
  //   } else if(applyType === "Visa"){
  //     userId = generateNextUserID('Visa');
  //     password = generatePassword();
  //     console.log(`Generated password: ${password}`);
  //     console.log(`id: ${userId}`);
  //   }

  db.query(
    "SELECT User_Id FROM user_reg",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
