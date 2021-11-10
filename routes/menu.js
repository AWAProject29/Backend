const express = require('express');
const router = express.Router();
const menu = require('../models/menu_model');

//Get menu by id
router.get('/:id?',
 function(request, response) {
  if (request.params.id) {
    menu.getById(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult[0]);
      }
    });
//Get all menus
    } else {
    menu.getAll(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  }
});

//Add menu
router.post('/addmenu', 
function(request, response) {
  menu.add(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json("Added a menu.");
    }
  });
});

//Delete menu
router.delete('delete/:id', 
function(request, response) {
  menu.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

//Update menu
router.put('update/:id', 
function(request, response) {
  menu.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      console.log(dbResult);
      if(dbResult.affectedRows==1){
        response.json("menu updated.");
      }
      else{
        response.json("menu does not exist.");
      }

    }
  });
});




module.exports = router;