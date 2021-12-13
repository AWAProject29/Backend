const express = require('express');
const router = express.Router();
const shoppingcart = require('../models/shoppingcart_model');

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

router.get('/:id?',
 function(request, response) {
  if (request.params.id) {
    shoppingcart.getShoppingCartById(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult[0]);
      }
    });
//Get all products
    } else {
    shoppingcart.getAllShoppingCarts(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  }
});

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

router.put('/addAmount',
function(request, response) {
    shoppingcart.addAmount(request.body, function(err, dbResult) {
      if (err) {
        response.json(err);
        
      } else {
        response.json("Amount of product added increased by one.");
      }
    });
  });

//Remove product from cart
router.put('/removeFromCart', 
function(request, response) {
    shoppingcart.removeFromCart(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json("Amount of product decreased by one.");
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