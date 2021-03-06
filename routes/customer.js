const express = require('express');
const router = express.Router();
const customer = require('../models/customer_model');
const app = require('../app');


//Get customer by id
router.get('/:id?',
 function(request, response) {
  if (request.params.id) {
    customer.getById(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult[0]);
      }
    });
//Get all customers
    } else {
    customer.getAll(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  }
});

//Add customer
router.post('/addCustomer', 
function(request, response) {
  console.log(request.body);
  customer.addCustomer(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json("Added a customer.");
    }
  });
});

//Delete customer
router.delete('delete/:id', 
function(request, response) {
  customer.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

//Update customer
router.put('update/:id', 
function(request, response) {
  customer.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      console.log(dbResult);
      if(dbResult.affectedRows==1){
        response.json("customer updated.");
      }
      else{
        response.json("customer does not exist.");
      }

    }
  });
});

module.exports = router;