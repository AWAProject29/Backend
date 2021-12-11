const express = require('express');
const router = express.Router();
const product = require('../models/shoppingcart_model');

// //Show products
// router.get('/showProducts', 
// function(request, response) {
//   product.getAll(request.body, function(err, dbResult) {
//     if (err) {
//       response.json(err);
//     } else {
//       response.json(request.body);
//     }
//   });
// });

//Add product to cart
router.post('/addToCart', 
function(request, response) {
  shoppingcart.addToCart(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json("Product added to cart.");
    }
  });
});

//Remove product from cart
router.delete('/removeFromCart/:productId', 
function(request, response) {
    shoppingcart.removeFromCart(request.params.productId, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json("Product removed from cart.");
    }
  });
});


//Update product in cart
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