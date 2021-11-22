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

passport.use(new BasicStrategy(
    function checkCredentials (email, password, done) {
        
        return db.query(
          'CALL checkAccount(?,?)',
          [customer.email, customer.password, id], callback
        )));
       
        // if match is found, compare the passwords.
        if(user != null){
            // if passwords match, then proceed to route handler ( the protected resource )
            
            // compares given password to if its matching to database users
            if(bcrypt.compareSync(password, user.password)){
                done(null, user)
            } else{
                done(null, false);
            }

        }else {
            // reject the request
            done(null, false);
        }
    }
    ));





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

