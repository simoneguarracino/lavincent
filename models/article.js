var mongoose = require('mongoose');

// define the schema for our user model
var articleSchema = mongoose.Schema({
    headline: String,
    runninghead: String,
    author: String,
    importance: { type: Number, default: 3},
    text: String,
    //upvotes: {type: Number, default: 0},
    lastmodified: { type: Date, default: Date.now },
    //comments: [{
    //    title: String,
    //    author: String,
    //    created: { type: Date, default: Date.now },
    //    updated: { type: Date, default: Date.now },
    //}]
    attacched: [{
        url: String,
        position: String
    }]
});

//articleSchema.methods.upvote = function(cb) {
//    this.upvotes += 1;
//    this.save(cb);
//};

// methods ======================
// generating a hash
//userSchema.methods.generateHash = function(password) {
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//};

// create the model for users and expose it to our app
module.exports = mongoose.model('Article', articleSchema);