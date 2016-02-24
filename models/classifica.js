var mongoose = require('mongoose');

var classificaSchema = new mongoose.Schema({
	IDCompetizione : Number,
	gironi: [{
		IDGirone: Number,
		posizioni: [{
			ID: Number,
			Pos : Number,
			Nome : String,
			Presidente : String,
			Punti : Number,
			PartiteVinte : Number,
			PartiteNulle : Number,
			PartitePerse : Number,
			RetiFatte : Number,
			RetiSubite : Number,
			MI : Number,
			PMed : Number,
			PMin : Number,
			PMax : Number,
			PDevSt : Number,
			PAvv : Number,
			PTot : Number,
			TMed : Number,
			TMin : Number,
			TMax : Number,
			TDevSt : Number,
			TAvv : Number,
			TTot : Number,
			bm : Number
		}]
	}]
});

module.exports = mongoose.model('Classifica', classificaSchema);