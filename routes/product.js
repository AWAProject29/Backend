const express = require('express');
const router = express.Router();
const product = require('../models/product_model');

//Get product by id
router.get('/:id?',
 function(request, response) {
  if (request.params.id) {
    product.getById(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult[0]);
      }
    });
//Get all products
    } else {
    product.getAll(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  }
});

//Add product
router.post('/addProduct', 
function(request, response) {
  product.addProduct(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json("Added a product.");
    }
  });
});

//Show products
router.get('/showProducts', 
function(request, response) {
  product.getAll(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(request.body);
    }
  });
});

//Delete product
router.delete('delete/:id', 
function(request, response) {
  product.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

//Update product
router.put('update/:id', 
function(request, response) {
  product.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      console.log(dbResult);
      if(dbResult.affectedRows==1){
        response.json("product updated.");
      }
      else{
        response.json("product does not exist.");
      }

    }
  });
});






module.exports = router;