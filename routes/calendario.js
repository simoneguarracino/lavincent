var express = require('express');
var router = express.Router();
var calendario=require('../models/calendario');
var mongoose=require('mongoose');

/* GET classifica listing. */
router.get('/', function(req, res, next) {
        calendario.find({}, function (err, cal) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function(){
                        res.render('calendario', {
                              title: 'Calendario',
                              calendario: cal
                          });
                    },
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(cal);
                    }
                });
              }     
        });
});

module.exports = router;
