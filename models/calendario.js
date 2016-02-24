var mongoose = require('mongoose');

var calendarioSchema = new mongoose.Schema({
	IDCompetizione : Number,
	Competizione: String,
	gironi: [{
		girone: String,
		IDGirone: Number,
		giornate:[{
			GiornataDiA: Number,
			Fantagiornata: String,
			IDFantagiornata: Number,
			incontri:[{
				ID: Number,
				IDTipo: Number,
				IDSquadre: {IDCasa:Number, IDFuori:Number},
				Giocato: Number,
				M1 : {M1Casa:Number, M1Fuori:Number},
				M2 : {M2Casa:Number, M2Fuori:Number},
				M3 : {M3Casa:Number, M3Fuori:Number},
				IncAcc : Number,
				IDLegaSquadre : {IDLegaCasa:Number,IDLegaFuori:Number},
				Nomi : {NomeCasa:String,NomeFuori:String},
				Gol : {GolCasa:Number,GolFuori:Number},
				Parziali : {ParzialeCasa:Number,ParzialeFuori:Number},
				Totali : {TotaleCasa:Number,TotaleFuori:Number}
			}]

		}]
	}]
});

module.exports = mongoose.model('Calendario', calendarioSchema);