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


async function getLastUserID(applyType) {
  return new Promise((resolve, reject) => {
      const query = `SELECT user_id FROM user_reg WHERE ApplyType = ? ORDER BY user_id DESC LIMIT 1`;
      db.query(query, [applyType], (err, result) => {
          if (err) {
              reject(err);
          } else {
              // If no records are available, resolve with a default value
              if (result.length === 0) {
                  resolve(applyType === 'Passport' ? 'PASS-0000' : 'VISA-0000.0000');
              } else {
                  resolve(result[0].user_id);
              }
          }
      });
  });
}

async function generateNextUserID(applyType) {
  let prefix = "";
  console.log("Apply Type - "+applyType)
  if (applyType === 'Passport') {
      prefix = "PASS-";
  } else if (applyType === 'Visa') {
      prefix = "VISA-";
  } else {
      throw new Error("Invalid apply type");
  }

  const lastId = await getLastUserID(applyType);
  let newId;
  if (applyType === 'Visa') {
      // Split the lastId into two parts, increment each part separately
      const parts = lastId.split('-')[1].split('.');
      const incrementedFirstPart = parseInt(parts[0]) + 1;
      const incrementedSecondPart = parseInt(parts[1]) + 1;
      newId = incrementedFirstPart.toString().padStart(4, '0') + '.' + incrementedSecondPart.toString().padStart(4, '0');
  } else {
      newId = parseInt(lastId.split('-')[1]) + 1;
      newId = newId.toString().padStart(4, '0');
  }

  return prefix + newId;
}


// function getLastUserID() {
//   return new Promise((resolve, reject) => {
//     db.query("SELECT MAX(User_id) AS lastUserID FROM user_reg", (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         const lastUserID = result[0].lastUserID;
//         resolve(lastUserID);
//       }
//     });
//   });
// }

// function generateNextUserID(lastUserID) {
//   if (lastUserID) {
//     // Assuming user IDs are in the format "PASS-1234" or "VISA-5678.9012"
//     const prefix = lastUserID.split("-")[0];
//     const numericPart = parseFloat(lastUserID.split("-")[1]);
//     const nextNumericPart = numericPart + 1;

//     const nextUserID = `${prefix}-${nextNumericPart.toFixed(4)}`;
//     return nextUserID;
//   } else {
//     console.error("Error: lastUserID is undefined.");
//     return null;
//   }
// }



// function getLastUserID(applyType) {

//   if (applyType === 'Passport') {
//     return 'PASS-1234'; 
//   } else if (applyType === 'Visa') {
//     return 'VISA-5678.9012';
//   }
// }

// function generateNextUserID(applyType) {
//   const lastUserID = getLastUserID(applyType);

//   if (typeof lastUserID === 'string') {
//     // const numericPart = parseFloat(lastUserID.split('-')[1]);
//     const randomThreeDigitNumber = Math.floor(Math.random() * 9000) + 1000;
//     // const nextNumericPart = numericPart + 1;

//     let nextUserID;
//     if (applyType === 'Passport') {
//       nextUserID = `PASS-${randomThreeDigitNumber.toFixed(0)}`;
//     } else if (applyType === 'Visa') {
//       nextUserID = `VISA-${randomThreeDigitNumber.toFixed(4)}`;
//     }

//     return nextUserID;
//   } else {
//     console.error('Error: lastUserID is undefined or not a string.');
//     return null; 
//   }
// }

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
  var password;

if(applyType === "NA"){
    console.log("NA");
} else if(applyType === "Passport"){
    generateNextUserID('Passport').then(userId => {
        password = generatePassword();
        console.log(`Generated password: ${password}`);
        console.log(`id: ${userId}`);
        insertIntoDatabase(userId, password);
    }).catch(err => {
        console.error(err);
    });
} else if(applyType === "Visa"){
    generateNextUserID('Visa').then(userId => {
        password = generatePassword();
        console.log(`Generated password: ${password}`);
        console.log(`id: ${userId}`);
        insertIntoDatabase(userId, password);
    }).catch(err => {
        console.error(err);
    });
}

  function insertIntoDatabase(userId, password) {
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
}





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
    "INSERT INTO apply_visa (User_id,Country,Occupation,Application_Date,visaNo,VisaStatus) VALUES(?,?,?,?,?,?)",
    [user,countryid,occupation,date,visaApp,'Applied'],
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

  const query = `UPDATE apply_visa SET VisaStatus = 'Cancelled' WHERE User_id = ?;`;

  db.query(
    query,
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
    "INSERT INTO apply_passport (User_id,Country,State,City,Pincode,ServiceType,BookletType,Issued_date,passportNo) VALUES(?,?,?,?,?,?,?,?,?)",
    [user,countryid,stateid, cityid,pincode,typeService,booklet,issue,passportNumber],
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
  const query = 'SELECT * FROM User_Reg';
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
  const query = 'SELECT * FROM region';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});


app.post('/populate', (req,res) => {
  const user = req.body.user;
  console.log("userid "+user);
  const query = `SELECT * FROM apply_passport WHERE User_id = ?;`;
  db.query(query,[user],(err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        const row = results[0];
        const responseObj = {
          countryid: row.Country,
          stateid: row.State,
          cityid: row.City,
          pincode: row.Pincode,
          booklet: row.BookletType,
          typeService: row.ServiceType,
          issue: row.Issued_date
        };
        res.json(responseObj);
      } else {
        res.status(404).json({ error: 'No user found with the provided ID' });
      }
    }
  });
});

app.post('/visapop', (req,res) => {
  const user = req.body.user;
  console.log("userid "+user);
  const query = `select passportNo, visaNo from apply_passport JOIN apply_visa on apply_passport.User_id = apply_visa.User_id where apply_visa.User_id = ?;`;
  db.query(query,[user],(err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        const row = results[0];
        const responseObj = {
          passportNo: row.passportNo,
          visaNo: row.visaNo
        };
        res.json(responseObj);
      } else {
        res.status(404).json({ error: 'No user found with the provided ID' });
      }
    }
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/');
});

const data = {
  India: {
      states: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
       "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
        "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
         "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
          "Uttarakhand", "West Bengal"],
          cities: {
            "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
            "Arunachal Pradesh": ["Itanagar", "Naharlagun"],
            "Assam": ["Guwahati", "Silchar", "Dibrugarh"],
            "Bihar": ["Patna", "Gaya", "Bhagalpur"],
            "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
            "Goa": ["Panaji", "Margao", "Vasco Da Gama"],
            "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
            "Haryana": ["Faridabad", "Gurgaon", "Panipat"],
            "Himachal Pradesh": ["Shimla", "Mandi", "Dharamshala"],
            "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
            "Karnataka": ["Bangalore", "Mysore", "Hubli"],
            "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
            "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur"],
            "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
            "Manipur": ["Imphal"],
            "Meghalaya": ["Shillong"],
            "Mizoram": ["Aizawl"],
            "Nagaland": ["Kohima"],
            "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
            "Punjab": ["Ludhiana", "Amritsar", "Jalandhar"],
            "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
            "Sikkim": ["Gangtok"],
            "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
            "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
            "Tripura": ["Agartala"],
            "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra"],
            "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh"],
            "West Bengal": ["Kolkata", "Howrah", "Durgapur"]
        }
  },
  usa: {
    states: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
     "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
      "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
       "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
        "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
         "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
          "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
    cities: {
        "Alabama": ["Birmingham", "Montgomery", "Huntsville"],
        "Alaska": ["Anchorage", "Fairbanks", "Juneau"],
        "Arizona": ["Phoenix", "Tucson", "Mesa"],
        "Arkansas": ["Little Rock", "Fort Smith", "Fayetteville"],
        "California": ["Los Angeles", "San Diego", "San Jose"]
    }
  },
  France: {
    states: ["Île-de-France", "Provence-Alpes-Côte d’Azur", "Auvergne-Rhône-Alpes", 
    "Occitanie", "Nouvelle-Aquitaine", "Hauts-de-France", "Pays de la Loire", "Grand Est", 
    "Bretagne", "Normandie", "Bourgogne-Franche-Comté", "Centre-Val de Loire"],
    cities: {
        "Île-de-France": ["Paris"],
        "Provence-Alpes-Côte d’Azur": ["Marseille", "Nice", "Toulon", "Aix-en-Provence"],
        "Auvergne-Rhône-Alpes": ["Lyon", "Saint-Étienne", "Grenoble"],
        "Occitanie": ["Toulouse", "Montpellier", "Nîmes"],
        "Nouvelle-Aquitaine": ["Bordeaux"],
        "Hauts-de-France": ["Lille"],
        "Pays de la Loire": ["Nantes", "Angers", "Le Mans"],
        "Grand Est": ["Strasbourg", "Reims"],
        "Bretagne": ["Rennes", "Brest"],
        "Normandie": ["Le Havre"],
        "Bourgogne-Franche-Comté": ["Dijon"],
        "Centre-Val de Loire": ["Tours"]
    }
},
Australia: {
  states: ["New South Wales", "Queensland", "South Australia", "Tasmania", "Victoria",
   "Western Australia", "Australian Capital Territory", "Northern Territory"],
  cities: {
      "New South Wales": ["Sydney", "Newcastle", "Wollongong"],
      "Queensland": ["Brisbane", "Gold Coast", "Sunshine Coast"],
      "South Australia": ["Adelaide"],
      "Tasmania": ["Hobart"],
      "Victoria": ["Melbourne", "Geelong", "Ballarat"],
      "Western Australia": ["Perth", "Mandurah"],
      "Australian Capital Territory": ["Canberra"],
      "Northern Territory": ["Darwin"]
  }
},
Canada: {
  states: ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Northwest Territories", "Nunavut", "Yukon"],
  cities: {
      "Alberta": ["Edmonton", "Calgary", "Red Deer"],
      "British Columbia": ["Vancouver", "Victoria", "Surrey"],
      "Manitoba": ["Winnipeg", "Brandon", "Steinbach"],
      "New Brunswick": ["Fredericton", "Moncton", "Saint John"],
      "Newfoundland and Labrador": ["St. John's", "Corner Brook", "Mount Pearl"],
      "Nova Scotia": ["Halifax", "Sydney", "Truro"],
      "Ontario": ["Toronto", "Ottawa", "Mississauga"],
      "Prince Edward Island": ["Charlottetown", "Summerside"],
      "Quebec": ["Montreal", "Quebec City", "Laval"],
      "Saskatchewan": ["Saskatoon", "Regina", "Prince Albert"],
      "Northwest Territories": ["Yellowknife"],
      "Nunavut": ["Iqaluit"],
      "Yukon": ["Whitehorse"]
  }
}
};

app.get('/api/data', (req, res) => {
  res.json(data);
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
