const express = require('express');
const router = express.Router();
const manager = require('../models/manager_model');


//Get manager by id
router.get('/:id?',
 function(request, response) {
  if (request.params.id) {
    manager.getById(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult[0]);
      }
    });
//Get all managers
    } else {
    manager.getAll(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  }
});

//Add manager
router.post('/addmanager', 
function(request, response) {
  manager.add(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(request.body);
    }
  });
});

//Delete manager
router.delete('delete/:id', 
function(request, response) {
  manager.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

//Update manager
router.put('update/:id', 
function(request, response) {
  manager.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      console.log(dbResult);
      if(dbResult.affectedRows==1){
        response.json("manager updated.");
      }
      else{
        response.json("manager does not exist.");
      }

    }
  });
});

module.exports = router;


