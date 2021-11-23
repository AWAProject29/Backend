const express = require('express')
const app = express()
const port = 4000
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy; 
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const db = require('../database');

app.use(express.json());


app.use((req, res, next) => {
    console.log('Demo middleware executing..');

    next();
});

//Login System

//modify for database
const users = [
    {
        id: uuidv4(),
        username: 'demouser',
        password: '123456'
    },
    {
        id: uuidv4(),
        username: 'testuser',
        password: '98765'
    },
]; 

<<<<<<< HEAD
passport.use(new BasicStrategy(
    function(email, password, done) {

      const userExists = db.query(
        'CALL checkAccount(?,?)',
        [customer.email, customer.password, id], callback
      );
      if(userExists == 'FALSE') {
        // Username not found
        console.log("HTTP Basic username not found");
        return done(null, false, { message: "HTTP Basic user not found" });
      }

      /* Verify password match */
      if(bcrypt.compareSync(password, customer.password) == false && bcrypt.compareSync(email, customer.email) == false) {
        // Password does not match
        console.log("HTTP Basic password not matching username");
        return done(null, false, { message: "HTTP Basic password not found" });
      }
      return done(null, customer);
    }
  ));
     
=======

    passport.use(new BasicStrategy(
        function(email, password, done) {
      
          const userExists = db.query(
            'CALL checkAccount(?,?)',
            [customer.email, customer.password, id], callback
          );
          if(userExists == 'FALSE') {
            // Username not found
            console.log("HTTP Basic username not found");
            return done(null, false, { message: "HTTP Basic user not found" });
          }
      
          /* Verify password match */
          if(bcrypt.compareSync(password, customer.password) == false) {
            // Password does not match
            console.log("HTTP Basic password not matching username");
            return done(null, false, { message: "HTTP Basic password not found" });
          }
          return done(null, userExists);
        }
      ));





>>>>>>> 559c6ce8eea400cfeb2f2f4c9c8bdf4fb6976d0c
function httpBasicTest(req, res, next) {
    console.log('http basic test executing...');
    next();
}

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/registeruser', (req, res) => {
    console.log(req.body);

    // create hash of the password
    const salt = bcrypt.genSaltSync(6);

    const passwordHash = bcrypt.hashSync(req.body.password, salt);

    const newUser = {
        id: uuidv4(),
        username: req.body.username,
        password: passwordHash,
        email: req.body.email
    }

    users.push(newUser);

    console.log(users)
    res.send("OK");
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

   