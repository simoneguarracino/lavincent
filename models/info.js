var mongoose = require('mongoose');

var infoSchema = new mongoose.Schema({
	NomeLega: String,
	Stagione: Number,
	Anno: String,
	Aggiornamento: String,
	Competizione: Number
});

module.exports = mongoose.model('Info', infoSchema);