var express = require('express');
var passport = require('passport');
var router = express.Router();
var fantasquadra=require('../models/fantasquadra');

/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log(req.app.locals);
	res.render('index');
});

router.get('/login',function(req,res){
	res.render('login', {message:req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
		//successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}), function(req,res){
		if(req.user.IDsquadra)
			res.redirect('/squadre/id/'+req.user.IDsquadra);
		else
			res.redirect('/profile');
	});

router.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup',{
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash: true
	}));

router.get('/profile', function(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
	}, function(req, res) {
    	res.render('profile', {
        	title : 'Profilo'
    	});
	}
);

router.get('/logout', function(req, res) {
    req.logout();
    //req.app.locals.user='';
    res.redirect('/');
});

module.exports = router;
