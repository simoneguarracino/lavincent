var express = require('express');
var router = express.Router();
var classifica = require('../models/classifica');
var calendario = require('../models/calendario');
var competizioni = require('../models/competizioni');

/* GET inizializza */
router.get('/', function(req, res, next) {
	classifica.inizializza(req, res, function(){
		calendario.inizializza(req, res, function(){
			competizioni.inizializza(req,res,function(){
				res.redirect('../');
			})
		})
	});
});

module.exports = router;
