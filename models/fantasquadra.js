var mongoose = require('mongoose');

var fantasquadraSchema = new mongoose.Schema({
	ID: Number,
	Nome: String,
	Presidente: String,
	Telef1 : String,
	Telef2 : String,
	Telef3 : String,
	Email : String,
	IDDivisione : Number,
	CreditiResidui : Number,
	bilancio: [{
		Descrizione: String,
		Valore: Number,
		Data: String
	}],
	rosa: [{
		Ruolo : Number,
		Nome : String,
		Squadra : String,
		Extracom : Boolean,
		Stato : Number,
		Contratto : Number,
		Acq : Number,
		Svinc : Boolean,
		GioInf : Boolean
	}]
});

module.exports = mongoose.model('Fantasquadra',fantasquadraSchema);