const express = require('express')
const app = express()
const port = 4000
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy; 
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
// const db = require('./database.js');


// const mysql = require('mysql');
// const dbcon = mysql.createPool({
//   host: 'localhost',
//   user: 'Daniel1',                       //Apply your own SQL username and password here
//   password: 'MyUzero1Acc',                   //Apply your own SQL username and password here
//   database: 'hermes_database',
// });

// dbcon.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

const mysql = require('mysql');

const dbcon = mysql.createConnection({
    host: "localhost",
    user: "Daniel1",
    password: "MyUzero1Acc",
    database: "hermes_database"
});

// dbcon.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// })



const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log('Demo middleware executing...');

    next();
});



dbcon.connect(function (err) {
  if (err) throw err;
  let email = 'TeppoTesti@gmail.com';
  dbcon.query("SELECT * FROM customer", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
  });
  dbcon.query("SELECT * FROM customer WHERE email = ?", [email], function (err, result, fields) {
      if (err) throw err;
      let pwd = result[0].password; //hakee pelkän salasanan. Muita kenttiä olisi result[0].email, result[0].name ja result[0].somedata
                                                                  // Indeksi 0 koska ei pitäisi palautua kuin yksi osuma jos email on yksilöllinen
                                                                   // result itsessään on objekti
      // console.log("Password is: " + pwd);




  });
});




//Login System

passport.use(new BasicStrategy(
  function(email, password, done) {
    // console.log('email: ' + email)
    // console.log('password: ' + password)

    dbcon.query("SELECT * FROM customer", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
    });
    dbcon.query("SELECT * FROM customer WHERE email = ?", [email], function (err, result, fields) {
        if (err) throw err;
        let userpwd = result[0].password; //hakee pelkän salasanan. Muita kenttiä olisi result[0].email, result[0].firstname jne.
                                                                    // Indeksi 0 koska ei pitäisi palautua kuin yksi osuma jos email on yksilöllinen
                                                                     // result itsessään on objekti
        let useremail = result[0].email;

        console.log(result[0]);

        console.log("User email is: " + useremail);
        console.log("Password is: " + userpwd);
        console.log("\n\n\n")

        if(useremail != null) {
          if(userpwd === password) {
            done(null, useremail);
          } else {
            done(null, false);
          }
          done(null, useremail);
        } else {
          done(null, false);
        }
        return done(null, useremail);

      });

      
    }));


    

// passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done){
//   console.log('JWT is valid');
//   console.log('payload is as follows');
//   console.log(jwt_payload);

//   done(null, jwt_payload);
// }));




const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "MyVerySecretSigningKey"
}

app.post('/jwtLogin', passport.authenticate('basic', { session: false }), (req, res) => {
  //generate JWT

  //Change for information from SQL table
  const payload = { 
    user: {
      email: req.user.email,
      password: req.user.password
    }
  };

  const secretKey = "MyVerySecretSigningKey";

  const options = {
    expiresIn: '1d'
  }

  const generatedJWT = jwt.sign(payload, secretKey, options)


  res.json({ jwt: generatedJWT });
})



app.get('/jwt-protected-resource',  passport.authenticate('jwt', { session: false }), (req, res) => {
  //change for correct sql term
  console.log(req.user);

  res.send("OK, for user " + req.user.username);
})

app.get('/my-protected-resource', passport.authenticate('basic', { session: false }), (req, res) => {
  console.log('We\'re in /my-protected-resource app.get method');

  res.send('Hello protected world');
})
                              //This is the authentication implementation to function
app.get('/some-other-resource', passport.authenticate('basic', { session: false }), (req, res) => { 
  res.send('Other protected resource accessed');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// app.post('/registeruser', (req, res) => {
//     console.log(req.body);

//     // create hash of the password
//     const salt = bcrypt.genSaltSync(6);

//     const passwordHash = bcrypt.hashSync(req.body.password, salt);

//     const newUser = {
//         id: uuidv4(),
//         username: req.body.username,
//         password: passwordHash,
//         email: req.body.email
//     }

//     users.push(newUser);

//     console.log(users)
//     res.send("OK");
// })


