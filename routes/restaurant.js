const express = require('express');
const router = express.Router();
const restaurant = require('../models/restaurant_model');
const app = require('../app');

const multer = require('multer');
const upload = multer({storage:multer.memoryStorage()});

// const exphbs = require('express-handlebars');


// app.engine('hbs', exphbs({ extname: '.hbs' }));
// app.set('view engine', 'hbs');

//Get restaurant by id
router.get('/:id?',
 function(request, response) {
  if (request.params.id) {
    restaurant.getById(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult[0]);
      }
    });
//Get all restaurants
    } else {
    restaurant.getAll(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  }
});

//Add restaurant
router.post('/addrestaurant', upload.single('uploadedImage'), 
function(request, response) {
  console.log('Were in addrestaurant function');
  restaurant.add(request.body, function(err, dbResult) {
    console.log('Were in restaurant.add function');
    if (err) {
      console.log('Were in restaurant.add ERROR function');
      response.json(err);
    } else {
      // console.log(request.body.restaurantimage);
      // let sampleFile;
      // let uploadPath;

      // let restaurantImage = request.body.restaurantimage
      // console.log(restaurantImage); 

      response.json("Added a restaurant.");

      if(!request.body || Object.keys(request.body).length === 0) {
        console.log('Were in response.status(400) if statement');
        return response.status(400).send('No files were uploaded.');
      }

      
    }

      
  });
});

//Show restaurants
router.get('/showRestaurants', 
function(request, response) {
  restaurant.getAll(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(request.body);
    }
  });
});


//Delete restaurant
router.delete('delete/:id', 
function(request, response) {
  restaurant.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

//Update restaurant
router.put('update/:id', 
function(request, response) {
  restaurant.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      console.log(dbResult);
      if(dbResult.affectedRows==1){
        response.json("restaurant updated.");
      }
      else{
        response.json("restaurant does not exist.");
      }

    }
  });
});






module.exports = router;