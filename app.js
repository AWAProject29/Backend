var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var customerRouter = require('./routes/customer');
var managerRouter = require('./routes/manager');
var menuRouter = require('./routes/menu');
var orderRouter = require('./routes/order');
var restaurantRouter = require('./routes/restaurant');

var app = express();

const port = 4000


//BasicAuth or some other authentication 

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

module.exports = app;
