var mongoose = require('mongoose');
var fs=require('fs');
var iconv=require('iconv-lite');
var myutil=require('../util/myutil');

var classifica={}

classifica.Schema = new mongoose.Schema({
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

classifica.coll=mongoose.model('Classifica', classifica.Schema);

classifica.inizializza=function(req, res, f){
	classifica.coll.collection.remove();
	fs.readFile('fcm/fcmClassificaDati.js',function(err, data){
		if(err)
			throw err
		eval(iconv.decode(data,'latin1'));
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
		mongoose.model('Classifica').create(arrClassifica, function(err, cl){
			if(err)
				throw err;
			f();
		})
	});
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



module.exports = classifica