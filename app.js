var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var customerRouter = require('./routes/customer');
var managerRouter = require('./routes/manager');
var menuRouter = require('./routes/menu');
var orderRouter = require('./routes/order');
var restaurantRouter = require('./routes/restaurant');
var productRouter = require('./routes/product');

var app = express();

const port = (process.env.port || 4000);

/////------
const dbcon = require('./database');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy; 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ExtractJwt = require('passport-jwt').ExtractJwt;

dbcon.getConnection(function (err) {
    if (err) throw err;
});

passport.use(new BasicStrategy(
    function (email, password, done) {
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

            if (isPasswordCorrect == true) {
                console.log("Correct password");
            }
            else {
                // Password does not match
                console.log("HTTP Basic password not matching username");
                return done(null, false, { message: "HTTP Basic password not found" });
            }
            return done(null, useremail);
        });
    }));

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "MyVerySecretSigningKey"
}
/////------


app.use(cors({
    origin: "http://localhost:3000", 
    origin: "http://localhost:3001"    
}))

app.listen(port, () => {
    console.log(`Database listening at http://localhost:${port}`)
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/customer', customerRouter);
app.use('/manager', managerRouter);
app.use('/menu', menuRouter);
app.use('/order', orderRouter);
app.use('/restaurant', restaurantRouter);
app.use('/product', productRouter);

/////------
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

app.get('/my-protected-resource', passport.authenticate('basic', { session: false }), (req, res) => {
    console.log('We\'re in /my-protected-resource app.get method');
  
    res.send('Hello protected world');
  })
/////------

module.exports = app;
