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
const mysql = require('mysql');
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log('Demo middleware executing...');

    next();
});


// const dbcon = mysql.createConnection({
//     host: "localhost",
//     user: "Daniel1",
//     password: "MyUzero1Acc",
//     database: "hermes_database"
// });

dbcon.connect(function (err) {
  if (err) throw err;
});


//Login System

passport.use(new BasicStrategy(
  function(email, password, done) {
    dbcon.query("SELECT * FROM customer", function (err, result, fields) {
        if (err) throw err;
          console.log(result); // Prints an array of the list of objects in "customer" table
    });
    dbcon.query("SELECT * FROM customer WHERE email = ?", [email], function (err, result, fields) {
        if (err) throw err;

        let userpwd = result[0].customerpassword; 
        // Searches for the password of the user. Other valid searches: result[0].email, 
        // result[0].firstname etc.
        let useremail = result[0].email;

        console.log(result[0]); // Prints all the data of the one specific user who's logging in

        console.log("User email is: " + useremail); // User email
        console.log("User password is: " + userpwd); // User password
        console.log("\n\n\n")

        let isPasswordCorrect = bcrypt.compareSync(password, userpwd);

        console.log(isPasswordCorrect); // Prints if password matches with crypted password

        if(useremail != null) {
          if(isPasswordCorrect === true) {
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


                              //This is the authentication implementation to function
app.get('/some-other-resource', passport.authenticate('basic', { session: false }), (req, res) => { 
  res.send('Other protected resource accessed');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

