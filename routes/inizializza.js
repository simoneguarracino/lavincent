var express = require('express');
var router = express.Router();
var async =require('async');
var fs=require('fs');
var mongoose=require('mongoose')
var myutil=require('../util/myutil');
var iconv=require('iconv-lite');
var classifica = require('../models/classifica');
var calendario = require('../models/calendario');
var competizioni = require('../models/competizioni');

/* GET inizializza */
router.get('/', function(req, res, next) {
	classifica.collection.remove();
	calendario.collection.remove();
	competizioni.collection.remove();

	async.series({
	    calendarioData: function(callback){
	    	fs.readFile('fcm/fcmCalendarioDati.js',function(err, data){
	    		if(err)
	    			throw err;
	    		callback(null,iconv.decode(data,'latin1'));
	    	});
	    },
	    competizioniData: function(callback){
	        fs.readFile('fcm/fcmCompetizioniDati.js',function(err, data){
	    		if(err)
	    			throw err;
	    		callback(null,iconv.decode(data,'latin1'));
	    	});
	    },
	    classificaData: function(callback){
	        fs.readFile('fcm/fcmClassificaDati.js',function(err, data){
	    		if(err)
	    			throw err;
	    		callback(null,iconv.decode(data,'latin1'));
	    	});
	    }
	},
	function(err, results) {
		if(err)
			throw err

		eval(results.calendarioData);
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

		eval(results.classificaData);
		arrClassifica=arrClassifica.reduce(function(arr,curr){
			var iComp=myutil.index_insert(arr,'IDCompetizione',curr.IDCompetizione,{gironi:[]});
			var iGir=myutil.index_insert(arr[iComp].gironi,'IDGirone',curr.IDGirone,{posizioni:[]});
			arr[iComp].gironi[iGir].posizioni.push({
					ID: curr.ID,
					Pos: curr.Pos,
					Nome : curr.Nome,
					Presidente : curr.Presidente,
					Punti : curr.Punti,
					PartiteVinte : curr.PartiteVinte,
					PartiteNulle : curr.PartiteNulle,
					PartitePerse : curr.PartitePerse,
					RetiFatte : curr.RetiFatte,
					RetiSubite : curr.RetiSubite,
					MI : curr.MI,
					PMed : curr.PMed,
					PMin : curr.PMin,
					PMax : curr.PMax,
					PDevSt : curr.PDevSt,
					PAvv : curr.PAvv,
					PTot : curr.PTot,
					TMed : curr.TMed ,
					TMin : curr.TMin,
					TMax : curr.TMax,
					TDevSt : curr.TDevSt,
					TAvv : curr.TAvv,
					TTot : curr.TTot,
					bm : curr.bm
				});
			return arr;
		},[]);

		eval(results.competizioniData);
		arrCompetizioni=arrCompetizioni.reduce(function(arr,curr){
			arr.push({
				ID: curr.ID,
				Nome: curr.Nome,
				Predefinita: curr.Predefinita,
				gironi:[]
			})
			return arr;
		},[]);

		arrCompetizioni=arrGironi.reduce(function(arr,curr){
			arr[myutil.index_insert(arr,'ID',curr.IDComp,{})].gironi.push({
				ID: curr.ID,
				IDGruppo: curr.IDGruppo,
				Nome: curr.Nome
			})
			return arr;
		},arrCompetizioni);

		async.parallel([
				function(callback){
					mongoose.model('Calendario').create(arrIncontri, function(err, cl){
						if(err)
							throw err;
						callback(null)
					})
				},
				function(callback){
					mongoose.model('Classifica').create(arrClassifica, function(err, cl){
						if(err)
							throw err;
						callback(null)
					})
				},
				function(callback){
					mongoose.model('Competizione').create(arrCompetizioni, function(err, cl){
						if(err)
							throw err;
						callback(null)
					})
				}
			], function(err){
				if(err)
					throw err
				console.log('tutto ok');
				res.redirect('../');
			});
	});
});

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

function Competizione(ID,Nome,GironeUnico,IDGironeSeUnico,Predefinita) {
	return {
		ID : ID,
		Nome : Nome,
		GironeUnico : GironeUnico,
		IDGironeSeUnico : IDGironeSeUnico,
		Predefinita : Predefinita==ID
	}
}

function Divisione(ID,Nome) {
	return {
		ID : ID,
		Nome : Nome
	}
}

function DivComp(IDComp, IDDiv) {
	return {
		IDComp : IDComp,
		IDDiv : IDDiv
	}
}

function Girone(ID, IDComp, IDGruppo, Nome) {
	return {
		ID : ID,
		IDComp : IDComp,
		IDGruppo : IDGruppo,
		Nome : Nome
	}
}

function Gruppo(ID, Nome) {
	return {
		ID : ID,
		Nome : Nome
	}
}

function C(ID,IDGirone,IDCompetizione,Pos,Nome,Presidente,Punti,PCV,PCN,PCP,PFV,PFN,PFP,RCF,RCS,RFF,RFS,MI,PMed,PMin,PMax,PDevSt,PAvv,PTot,TMed,TMin,TMax,TDevSt,TAvv,TTot,bm) {
    return {
    	ID: ID,
		IDGirone : IDGirone,
		IDCompetizione : IDCompetizione,
		Pos : Pos,
		Nome : Nome,
		Presidente : Presidente,
		Punti : Punti,
		PartiteVinte : PCV+PFV,
		PartiteNulle : PCN+PFN,
		PartitePerse : PCP+PFP,
		RetiFatte : RCF+RFF,
		RetiSubite : RCS+RFS,
		MI : MI,
		PMed : PMed,
		PMin : PMin,
		PMax : PMax,
		PDevSt : PDevSt,
		PAvv : PAvv,
		PTot : PTot,
		TMed : TMed ,
		TMin : TMin,
		TMax : TMax,
		TDevSt : TDevSt,
		TAvv : TAvv,
		TTot : TTot,
		bm : bm
	};
}

function CC(IDGirone,Colonne) {return;}

module.exports = router;