var mongoose=require('mongoose');

var quotidianoSchema= new mongoose.Schema({
	ID: Number,
	Nome: String
});

module.exports=mongoose.model('Quotidiano',quotidianoSchema);