const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}))

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
    // const numericPart = parseFloat(lastUserID.split('-')[1]);
    const randomThreeDigitNumber = Math.floor(Math.random() * 9000) + 1000;
    // const nextNumericPart = numericPart + 1;

    let nextUserID;
    if (applyType === 'Passport') {
      nextUserID = `PASS-${randomThreeDigitNumber.toFixed(0)}`;
    } else if (applyType === 'Visa') {
      nextUserID = `VISA-${randomThreeDigitNumber.toFixed(4)}`;
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
        const responseObj = {
          userId: userId,
          password: password,
        };
        res.json(responseObj);
      }
    }
  );
});

app.post("/applyvisa", (req, res) => {
  const user = req.body.user;
  const countryid = req.body.countryid;
  const occupation = req.body.occupation;
  const date = req.body.date;

    // const maxPassportNumber = 1000;
    const randomThreeDigitNumber = Math.floor(Math.random() * 9000) + 1000;
    let applicationPermit = 0;
    let visaApp;
    // const nextPassportNumber = randomThreeDigitNumber + 1;
    if(occupation === 'Student'){
      applicationPermit="2";
      visaApp = `STU-${randomThreeDigitNumber}`;
      console.log(`Visa Number: STU-${randomThreeDigitNumber}`);
    }
    else if(occupation === 'Private Employee'){
      applicationPermit="3";
      visaApp = `PE-${randomThreeDigitNumber}`;
      console.log(`Visa Number: PE-${randomThreeDigitNumber}`);
    }
    else if(occupation === 'Government Employee'){
      applicationPermit="4";
      visaApp = `GE-${randomThreeDigitNumber}`
      console.log(`Visa Number: GE-${randomThreeDigitNumber}`);
    }
    else if(occupation === 'Self Employed'){
      applicationPermit="1";
      visaApp = `SE-${randomThreeDigitNumber}`;
      console.log(`Visa Number: SE-${randomThreeDigitNumber}`);
    }
    else if(occupation === 'Retire Employee'){
      applicationPermit="1.5";
      visaApp = `RE-${randomThreeDigitNumber}`;
      console.log(`Visa Number: RE-${randomThreeDigitNumber}`);
    }
  console.log(`Application Permit: ${applicationPermit}`);

  db.query(
    "INSERT INTO apply_visa (User_id,Country,Occupation,Application_Date) VALUES(?,?,?,?)",
    [user,countryid,occupation,date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const responseObj = {
          visaApp: visaApp,
          applicationPermit: applicationPermit,
        };
        res.json(responseObj);
      }
    }
  );
});

app.post("/cancel", (req, res) => {
  const user = req.body.user;
  // const passport = req.body.passport;
  // const visa = req.body.visa;
  // const doi = req.body.doi;

  db.query(
    "DELETE FROM apply_visa where User_id=?",
    [user],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get('/username' , (req,res) => {
  if(req.session.user){
    return res.json({valid: true, user: req.session.user})
  }
  else{
    return res.json({valid: false});
  }
})

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
        req.session.user = result[0].User_id;
        return res.json({Login:true})
      }
      else{
        return res.json({Login:false})
      }
    }
  );
});

app.post("/applyPassport", (req, res) => {
  const user = req.body.user;
  const countryid = req.body.countryid;
  const stateid = req.body.stateid;
  const cityid = req.body.cityid;
  const pincode = req.body.pincode;
  const booklet = req.body.booklet;
  const typeService = req.body.typeService;
  let issue = req.body.issue;

    // const maxPassportNumber = 1000;
    const randomThreeDigitNumber = Math.floor(Math.random() * 9000) + 1000;
    // const nextPassportNumber = randomThreeDigitNumber + 1;
    let passportNumber;
    if(booklet === '30'){
      passportNumber = `FPS-30${randomThreeDigitNumber}`;
      console.log(`Next Passport Number: FPS-30${randomThreeDigitNumber}`);
    }
    else if(booklet === '60'){
      passportNumber = `FPS-60${randomThreeDigitNumber}`;
      console.log(`Next Passport Number: FPS-60${randomThreeDigitNumber}`);
    }
    issue = new Date(issue);
    const expiryDate = new Date(issue);
    let expiry =  expiryDate.setFullYear(expiryDate.getFullYear() + 10);
  
  let applicationCost = 0;
  if (typeService === 'normal') {
    applicationCost = 2500;
  } else if (typeService === 'tatkal') {
    applicationCost = 5000;
  }
  console.log(`Passport Expiry Date: ${expiryDate}`);
  console.log(`Application cost: ${applicationCost}`);
  console.log(`Expiry Date: ${expiry}`);

  db.query(
    "INSERT INTO apply_passport (User_id,Country,State,City,Pincode,ServiceType,BookletType,Issued_date) VALUES(?,?,?,?,?,?,?,?)",
    [user,countryid,stateid, cityid,pincode,typeService,booklet,issue],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const responseObj = {
          passportNumber: passportNumber,
          applicationCost: applicationCost,
          expiry: expiry
        };
        res.json(responseObj);
      }
    }
  );
});

app.post("/renewPassport", (req, res) => {
  const reason = req.body.reason
  const user = req.body.user;
  const countryid = req.body.countryid;
  const stateid = req.body.stateid;
  const cityid = req.body.cityid;
  const pincode = req.body.pincode;
  const booklet = req.body.booklet;
  const typeService = req.body.typeService;
  let issue = req.body.issue;

  const randomThreeDigitNumber = Math.floor(Math.random() * 9000) + 1000;
    // const nextPassportNumber = randomThreeDigitNumber + 1;
    let passportNumber;
    if(booklet === '30'){
      passportNumber = `FPS-30${randomThreeDigitNumber}`;
      console.log(`Next Passport Number: FPS-30${randomThreeDigitNumber}`);
    }
    else if(booklet === '60'){
      passportNumber = `FPS-60${randomThreeDigitNumber}`;
      console.log(`Next Passport Number: FPS-60${randomThreeDigitNumber}`);
    }
    issue = new Date(issue);
    const expiryDate = new Date(issue);
    let expiry =  expiryDate.setFullYear(expiryDate.getFullYear() + 10);
  
  let applicationCost = 0;
  if (typeService === 'normal') {
    applicationCost = 2500;
  } else if (typeService === 'tatkal') {
    applicationCost = 5000;
  }
  console.log(`Passport Expiry Date: ${expiryDate}`);
  console.log(`Application cost: ${applicationCost}`);
  console.log(`Expiry Date: ${expiry}`);

  const query = `
    UPDATE apply_passport
    SET Country = ?,
        State = ?,
        City = ?,
        Pincode = ?,
        ServiceType = ?,
        BookletType = ?,
        Issued_date = ?,
        reason_for_renewal = ?
    WHERE User_id = ?;
  `;

  db.query(
    query,
    [countryid,stateid, cityid,pincode,typeService,booklet,issue,reason,user],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const responseObj = {
          passportNumber: passportNumber,
          applicationCost: applicationCost,
          expiry: expiry
        };
        res.json(responseObj);
      }
    }
  );
});

app.get('/api', (req, res) => {
  const query = 'SELECT * FROM User_Reg'; // Replace with your table name
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/renew', (req, res) => {
  const query = 'SELECT * FROM region'; // Replace with your table name

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
