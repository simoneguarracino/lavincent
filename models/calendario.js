var mongoose = require('mongoose');
var fs=require('fs');
var iconv=require('iconv-lite');
var myutil=require('../util/myutil');

var calendario={}

calendario.Schema = new mongoose.Schema({
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

calendario.coll=mongoose.model('Calendario', calendario.Schema);

calendario.inizializza=function(req, res, f){
	calendario.coll.collection.remove();
	fs.readFile('fcm/fcmCalendarioDati.js',function(err, data){
		if(err)
			throw err
		eval(iconv.decode(data,'latin1'));
		arrIncontri=arrIncontri.reduce(function(arr,curr){
			var iComp=myutil.index_insert(arr,'IDCompetizione',curr.IDCompetizione,{Competizione:curr.Competizione, gironi:[]});
			var iGir=myutil.index_insert(arr[iComp].gironi,'IDGirone',curr.IDGirone,{Girone:curr.Girone, giornate:[]});
			var iGio=myutil.index_insert(arr[iComp].gironi[iGir].giornate,'GiornataDiA',curr.GiornataDiA,{Fantagiornata:curr.Fantagiornata, IDFantagiornata:curr.IDFantagiornata, incontri:[]});
			arr[iComp].gironi[iGir].giornate[iGio].incontri.push({
					ID: curr.ID,
					IDTipo: curr.IDTipo,
					IDSquadre: {IDCasa:curr.IDCasa, IDFuori:curr.IDFuori},
					Giocato: curr.Giocato,
					M1 : {M1Casa:curr.M1Casa, M1Fuori:curr.M1Fuori},
					M2 : {M2Casa:curr.M2Casa, M2Fuori:curr.M2Fuori},
					M3 : {M3Casa:curr.M3Casa, M3Fuori:curr.M3Fuori},
					IncAcc : curr.IncAcc,
					IDLegaSquadre : {IDLegaCasa:curr.IDLegaCasa,IDLegaFuori:curr.IDLegaFuori},
					Nomi : {NomeCasa:curr.NomeCasa,NomeFuori:curr.NomeFuori},
					Gol : {GolCasa:curr.GolCasa,GolFuori:curr.GolFuori},
					Parziali : {ParzialeCasa:curr.ParzialeCasa,ParzialeFuori:curr.ParzialeFuori},
					Totali : {TotaleCasa:curr.TotaleCasa,TotaleFuori:curr.TotaleFuori}
				});
			return arr;
		},[]);
		mongoose.model('Calendario').create(arrIncontri, function(err, cl){
			if(err){
				console.log(err.errors)
				throw err;
			}
			f();
		})
	});
}

function I(ID,IncAcc,IDTipo,Giocato,IDFantagiornata,Fantagiornata,IDCompetizione,Competizione,IDGirone,Girone,GiornataDiA,IDCasa,IDFuori,IDLegaCasa,IDLegaFuori,NomeCasa,NomeFuori,GolCasa,GolFuori,ParzialeCasa,ParzialeFuori,TotaleCasa,TotaleFuori,M1Casa,M1Fuori,M2Casa,M2Fuori,M3Casa,M3Fuori) {
	return {
		ID: ID,
		IncAcc : IncAcc,
		IDTipo : IDTipo,
		IDFantagiornata : IDFantagiornata,
		Fantagiornata : Fantagiornata,
		IDCompetizione : IDCompetizione,
		IDGirone : IDGirone,
		Competizione : Competizione,
		Girone : Girone,
		IDCasa:IDCasa,
		IDFuori:IDFuori,
		IDLegaCasa:IDLegaCasa,
		IDLegaFuori:IDLegaFuori,
		NomeCasa:NomeCasa,
		NomeFuori:NomeFuori,
		GolCasa:GolCasa,
		GolFuori:GolFuori,
		ParzialeCasa:ParzialeCasa,
		ParzialeFuori:ParzialeFuori,
		TotaleCasa:TotaleCasa,
		TotaleFuori:TotaleFuori,
		M1Casa:M1Casa,
		M1Fuori:M1Fuori,
		M2Casa:M2Casa,
		M2Fuori:M2Fuori,
		M3Casa:M3Casa,
		M3Fuori:M3Fuori,
		Giocato : Giocato,
		GiornataDiA : GiornataDiA
	}
}

module.exports = calendario