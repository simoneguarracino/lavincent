var mongoose=require('mongoose');

var formazioneSchema=new mongoose.Schema({
	GiornataDiA:Number,
	formazioni:[{
		IDIncontro: Number,
		formazione:[{
			IDSquadra: Number,
			SquadraDiA: String,
			Nome: String,
			Ruolo: Number,
			Pos: Number,
			IDLega: Number,
			Rig: Number
		}]
	}]
});

module.exports = mongoose.model('Formazione',formazioneSchema);