var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
var bodyParser = require('body-parser')

var customerRouter = require('./routes/customer');
var managerRouter = require('./routes/manager');
var menuRouter = require('./routes/menu');
var orderRouter = require('./routes/order');
var restaurantRouter = require('./routes/restaurant');
var productRouter = require('./routes/product');
var shoppingcartRouter = require('./routes/shoppingcart');
var path = require('path');

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

app.use(cors({
    origin: "*"
    // origin: "https://hermes-project-group-29.herokuapp.com/*",
    // origin: "https://hermes-delivery.herokuapp.com",
    // origin: "http://localhost:3000", 
    // origin: "http://localhost:3001",
    // origin: "https://hermes-delivery.herokuapp.com/"    
}))


const PORT = process.env.PORT || 4000;



app.listen(PORT, (err) => {
    if (err) return console.log(err);
    console.log(`Server running on port: `, PORT)
})

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

//Passport Customer
passport.use("user", new BasicStrategy(
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

// Passport Manager
passport.use("manager", new BasicStrategy(
    function (email, password, done) {
        dbcon.query("SELECT * FROM manager", function (err, result, fields) {
            if (err) throw err;
            console.log(result); // Prints an array of the list of objects in "customer" table
        });
        dbcon.query("SELECT * FROM manager WHERE email = ?", [email], function (err, result, fields) {
            if (err) throw err;

            let userpwd = result[0].managerpassword;
            // Searches for the password of the user. Other valid searches: result[0].email, 
            // result[0].firstname etc.
            let useremail = result[0].email;

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




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '250kb'}));

app.use('/customer', customerRouter);
app.use('/manager', managerRouter);
app.use('/menu', menuRouter);
app.use('/order', orderRouter);
app.use('/restaurant', restaurantRouter);
app.use('/product', productRouter);
app.use('/shoppingcart', shoppingcartRouter);

/////------Login Customer
app.post('/LoginforJWTcustomer', passport.authenticate('user', { session: false }), (req, res) => {
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

/////------Login Manager
app.post('/LoginforJWTmanager', passport.authenticate('manager', { session: false }), (req, res) => {
    //generate JWT
    //Change for information from SQL table
    const payload = {
        user: {
            email: req.user.email,
            password: req.user.password,
            managerauthentication: req.user.managerauthentication
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
