const express = require('express');
const router = express.Router();
const order = require('../models/order_model');

//Get order by id
router.get('/:id?',
 function(request, response) {
  if (request.params.id) {
    order.getById(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult[0]);
      }
    });
//Get all orders
    } else {
    order.getAll(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  }
});

//Add order
router.post('/addorder', 
function(request, response) {
  order.add(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json("Added a order.");
    }
  });
});

//Delete order
router.delete('delete/:id', 
function(request, response) {
  order.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

//Update order
router.put('update/:id', 
function(request, response) {
  order.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      console.log(dbResult);
      if(dbResult.affectedRows==1){
        response.json("order updated.");
      }
      else{
        response.json("order does not exist.");
      }

    }
  });
});




module.exports = router;