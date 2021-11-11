const express = require('express');
const router = express.Router();
const restaurant = require('../models/restaurant_model');

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
router.post('/addrestaurant', 
function(request, response) {
  restaurant.add(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json("Added a restaurant.");
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