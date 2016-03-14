var mongoose=require('mongoose');

var giocatoreASchema=new mongoose.Schema({
	Nome: String,
	Squadra: String,
	Ruolo: Number,
	Codice: Number,
	Crediti: Number,
	Extra: Number
});

module.exports = mongoose.model('GiocatoreA',giocatoreASchema);