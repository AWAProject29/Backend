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


const mysql = require('mysql');
const dbconnection = mysql.createConnection({
  host: 'localhost',
  user: 'Daniel1',                       //Apply your own SQL username and password here
  password: 'MyUzero1Acc',                   //Apply your own SQL username and password here
  database: 'hermes_database'
});


const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log('Demo middleware executing..');

    next();
});

//Login System

//modify for database ?
const users = [
    {
        id: uuidv4(),
        email: 'Teppo@gmail.com',
        password: 'testisalasana'
    },
    {
        id: uuidv4(),
        email: 'Testi@gmail.com',
        password: '123'
    },
]; 

passport.use(new BasicStrategy(
  function(email, password, done) {
    console.log('email: ' + email)
    console.log('password: ' + password)

    const user = users.find(u => u.email === email)

    
    dbconnection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
    const dbuser = dbconnection.query('SELECT * FROM Customer WHERE email=? AND password=?', [email, password])
    // const dbuser = connection.query('SELECT * FROM Customer WHERE email=\'Teppo@gmail.com\' AND password=\'$2a$06$f9yL5DdESnLGRvo9.LmebOytfXRlwdbpIpilpe9fkNooTYOqipu0e\'');


    console.log(dbuser);

    if(dbuser != null) {
      // if(user.password === password) {
      //   done(null, user);
      // } else {
      //   done(null, false);
      // }
      done(null, dbuser);
    } else {
      done(null, false);
    }

    return done(null, email);
  }
));

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
      email: req.customer.email,
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
  console.log('protected resource accessed');

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

   