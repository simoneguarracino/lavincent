var mongoose=require('mongoose');

var tabellinoSchema=new mongoose.Schema({
	GiornataDiA: Number,
	IDincontro: Number,
	supplementari: Boolean,
	rigori: Boolean,
	squadre:[{
		IDSquadra: Number,
		TotaleSquadra : Number, // Se "non esiste" allora vale "x"
		TotaleSquadraSupplementari: Number,
		Gol : Number, // Se "non esiste" allora vale "x"
		ParzialeSquadra : Number, // Se "non esiste" allora vale "x"
	    FattoreCampo : Number, // Se "non esiste" allora vale "x"
	    FattoreCampoSupplementari: Number,
	    GolSupplementari: Number,
	    GolRigori: Number,
	    ModPortiere : Number, // Se "non esiste" allora vale "x"
	    ModDifesa : Number, // Se "non esiste" allora vale "x"
	    ModCentrocampo : Number, // Se "non esiste" allora vale "x"
	    ModAttacco : Number, // Se "non esiste" allora vale "x"
	    ModModulo : Number, // Se "non esiste" allora vale "x"
	    ModM1Pers : Number, // Se "non esiste" allora vale "x"
	    ModM2Pers : Number, // Se "non esiste" allora vale "x"
	    ModM3Pers : Number, // Se "non esiste" allora vale "x"
		tabellino: [{
		    IDGiocatore : Number
		    , IDSquadra: Number 
		    , Ruolo : Number
		    , Voto : Number
		    , Modif : Number
		    , Tot : Number
		}],
		supplementari: [{
			IDGiocatore : Number
		    , Voto : Number
		}],
		rigori: [{
			IDGiocatore : Number
		    , Voto : Number
		}]
	}]
	
});

module.exports = mongoose.model('Tabellino', tabellinoSchema);