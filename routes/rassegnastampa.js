var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var articles=require('../models/article');

router.get('/new', function(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/rassegnastampa');
  }, function(req,res){
    res.render('newarticle');
  });

router.post('/new', function(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/rassegnastampa');
  }, function(req,res){
    var article=new articles({
      headline: req.body.headline,
      runninghead: req.body.runninghead,
      author: req.user._id,
      text: req.body.text
    })
    
    article.save(function(err){
      if(err)
        return console.log(err);
      res.redirect('/rassegnastampa');
    })
  });

router.get('/', function(req, res, next) {
  articles.find({},null,{
    //skip:0, // Starting Row
    //limit:10, // Ending Row
    sort:{ lastmodified: -1 }//Sort by Date Added DESC
  }, function (err, result) {
    if (err) {
        return console.error(err);
    } else {
        //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
        res.format({
            //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
          html: function(){
              res.render('rassegnastampa', {
                    title: 'Rassegna Stampa',
                    articles: result
                });
          },
          //JSON response will show all blobs in JSON format
          json: function(){
              res.json(result);
          }
      });
    }     
  });
});

module.exports = router;
