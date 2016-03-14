var mongoose=require('mongoose');

var calendarioASchema=new mongoose.Schema({
	GiornataDiA:Number,
	incontri:[{
		Casa: String,
		Fuori: String,
		GolCasa: Number,
		GolFuori: Number
	}]
});

module.exports = mongoose.model('CalendarioA', calendarioASchema);