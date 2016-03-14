var express = require('express');
var router = express.Router();
var fantasquadra=require('../models/fantasquadra');
var mongoose=require('mongoose');

router.get('/', function(req, res, next) {
        fantasquadra.find({}, function (err, sqd) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function(){
                        res.render('squadre', {
                              title: 'Fantasquadre',
                              squadre: sqd
                          });
                    },
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(sqd);
                    }
                });
              }     
        });
});

module.exports = router;