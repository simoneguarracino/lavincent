var mongoose = require('mongoose');
var configuration = require('./setup');

mongoose.connect(configuration.dburl)