var express = require('express');
var router = express.Router();
var users=require('../models/user');
var mongoose=require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  users.find({}, function (err, users) {
    if (err) {
        return console.error(err);
    } else {
        //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
        res.format({
            //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
          html: function(){
              res.render('users', {
                    title: 'Users',
                    users: users
                });
          },
          //JSON response will show all blobs in JSON format
          json: function(){
              res.json(users);
          }
      });
    }     
  });
});

module.exports = router;
