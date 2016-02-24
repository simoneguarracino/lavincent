var mongoose = require('mongoose');

var competizioneSchema = new mongoose.Schema({
	ID : Number,
	Nome: String,
	Predefinita: Boolean,
	gironi: [{
		ID: Number,
		IDGruppo: Number,
		Nome: String
	}]
});

module.exports = mongoose.model('Competizione', competizioneSchema);