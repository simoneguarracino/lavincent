var express = require('express');
var router = express.Router();
var async =require('async');
var fs=require('fs');
var mongoose=require('mongoose');
var myutil=require('../util/myutil');
var iconv=require('iconv-lite');

var classifica = require('../models/classifica');
var calendario = require('../models/calendario');
var calendarioA = require('../models/calendarioA');
var competizioni = require('../models/competizioni');
var quotidiano = require('../models/quotidiano');
var giocatoreA = require('../models/giocatoreA');
var fantasquadra = require('../models/fantasquadra');
var formazione = require('../models/formazione');
var tabellini = require('../models/tabellini');

/* GET inizializza */
router.get('/', function(req, res, next) {
	classifica.collection.remove();
	calendario.collection.remove();
	calendarioA.collection.remove();
	quotidiano.collection.remove();
	competizioni.collection.remove();
	giocatoreA.collection.remove();
	fantasquadra.collection.remove();
	formazione.collection.remove();
	tabellini.collection.remove();

	async.parallel({
		serieAData: function(callback){
	    	fs.readFile('fcm/fcmSerieADati.js',function(err, data){
	    		if(err)
	    			throw err;
	    		callback(null,iconv.decode(data,'latin1'));
	    	});
	    },
	    serieADettData: function(callback){
	    	fs.readFile('fcm/fcmSerieADatiDettaglio.js',function(err, data){
	    		if(err)
	    			throw err;
	    		callback(null,iconv.decode(data,'latin1'));
	    	});
	    },
	    fantasquadreData: function(callback){
	    	fs.readFile('fcm/fcmFantasquadreDati.js',function(err, data){
	    		if(err)
	    			throw err;
	    		callback(null,iconv.decode(data,'latin1'));
	    	});
	    },
	    formazioniData: function(callback){
	    	fs.readdir('fcm',function(err,files){
	    		var result=[];
	    		if(err)
	    			throw err;
	    		async.map(files.filter(function(elem){
	    			return elem.startsWith('fcmFormazioniDati');
	    		}), function(f,c){
	    			fs.readFile('fcm/'+f,function(err, d){
	    				if(err)
	    					throw err
	    				result.push({GiornataDiA:parseInt(f.substring(17,f.length-3)),formazioni:iconv.decode(d,'latin1')})
	    				c(null)
	    			})
	    		}, function(err){
	    			if(err)
	    				throw err
	    			callback(null,result);
	    		});
	    	});
	    },
	    risultatiData: function(callback){
	    	fs.readdir('fcm',function(err,files){
	    		var result=[];
	    		if(err)
	    			throw err;
	    		async.map(files.filter(function(elem){
	    			return elem.startsWith('fcmRisultatiDati');
	    		}), function(f,c){
	    			fs.readFile('fcm/'+f,function(err, d){
	    				if(err)
	    					throw err
	    				result.push({GiornataDiA:parseInt(f.substring(16,f.length-3)),risultati:iconv.decode(d,'latin1')})
	    				c(null)
	    			})
	    		}, function(err){
	    			if(err)
	    				throw err
	    			callback(null,result);
	    		});
	    	});
	    },
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
		eval(results.serieAData);
		eval(results.serieADettData);
		arrIncontriA=arrIncontriA.reduce(function(arr,curr){
			var iGio=myutil.index_insert(arr,'GiornataDiA',curr.GiornataDiA,{incontri:[]});
			arr[iGio].incontri.push({
				Casa:curr.Casa,
				Fuori:curr.Fuori,
				GolCasa:curr.GolCasa,
				GolFuori:curr.GolFuori
			});
			return arr;
		},[]);
		arrGiocatoriA=arrGiocatoriA.map(function(item){
			item.Nome=eval('xg'+item.Nome);
			item.Squadra=eval('xa'+item.Squadra);
			return item;
		});

		eval(results.fantasquadreData);
		arrFantasquadre=arrFantasquadre.map(function(fsq){
			fsq.rosa = arrRose.filter(function(elem){
				return elem.IDSquadra==fsq.ID;
			});
			fsq.bilancio = arrBilanci.filter(function(elem){
				return elem.IDSquadra==fsq.ID;
			});
			return fsq;
		});

		arrFormazioniData = results.formazioniData.map(function(fd){
			eval(fd.formazioni);
			return {
				GiornataDiA:fd.GiornataDiA,
				formazioni:arrFormazioni.reduce(function(arr,curr){
					var iInc=myutil.index_insert(arr,'IDIncontro',curr.IDIncontro,{formazione:[]});
					arr[iInc].formazione.push({
						IDSquadra: curr.IDSquadra,
						SquadraDiA: curr.SquadraDiA,
						Nome: curr.Nome,
						Ruolo: curr.Ruolo,
						Pos: curr.Pos,
						IDLega: curr.IDLega,
						Rig: curr.Rig
					});
					return arr;
				},[])
			};
		})
		arrRisultatiData = results.risultatiData.map(function(fd){
			eval(fd.risultati);
			return arrTabellini.reduce(function(arr,curr){
				var iInc=myutil.index_insert(arr,'IDIncontro',curr.IDIncontro,{GiornataDiA:fd.GiornataDiA, supplementari:curr.Supplementari, rigori:curr.Rigori, squadre:[]});
				var iSqd=myutil.index_insert(arr[iInc].squadre,'IDSquadra',curr.IDSquadra,{ 
					TotaleSquadra : curr.TotaleSquadra,
					Gol : curr.Gol,
					TotaleSquadraSupplementari: curr.TotaleSquadraSupplementari,
				    FattoreCampoSupplementari: curr.FattoreCampoSupplementari,
				    GolSupplementari: curr.GolSupplementari,
				    GolRigori: curr.GolRigori,
					ParzialeSquadra : curr.ParzialeSquadra,
				    FattoreCampo : curr.FattoreCampo,
				    ModPortiere : curr.ModPortiere,
				    ModDifesa : curr.ModDifesa,
				    ModCentrocampo : curr.ModCentrocampo,
				    ModAttacco : curr.ModAttacco,
				    ModModulo : curr.Modulo,
				    ModM1Pers : curr.ModM1Pers,
				    ModM2Pers : curr.ModM2Pers,
				    ModM3Pers : curr.ModM3Pers,
					tabellino:[],
					supplementari:[],
					rigori:[]
				});
				var listagiocatori=curr.Lista.split('%');
				var listasqa=curr.ListaSqA.split('%');
				var listaruolo=curr.Ruolo.split('%');
				var listavoto=curr.Voto.split('%');
				var listamodif=curr.Modif.split('%');
				var listatot=curr.Tot.split('%');
				for(var i=0; i<listagiocatori.length; i++){
					arr[iInc].squadre[iSqd].tabellino.push({
					    IDGiocatore : listagiocatori[i]
					    , IDSquadra : listasqa[i]
					    , Ruolo : listaruolo[i]
					    , Voto : (listavoto[i]!='sv/ng')?listavoto[i]:null
					    , Modif : listamodif[i]
					    , Tot : (listatot[i]!='sv/ng')?listatot[i]:null
					});
				}
				if(curr.Supplementari){
					listagiocatori=curr.ListaSupplementari.split('%');
					listavoto=curr.VotoSupplementari.split('%');
					for(var i=0; i<listagiocatori.length; i++){
						arr[iInc].squadre[iSqd].supplementari.push({
						    IDGiocatore : listagiocatori[i]
						    , Voto : (listavoto[i]!='sv/ng')?listavoto[i]:null
						});
					}
					if(curr.Rigori){
						listagiocatori=curr.ListaRigori.split('%');
						listavoto=curr.VotoRigori.split('%');
						for(var i=0; i<listagiocatori.length; i++){
							arr[iInc].squadre[iSqd].rigori.push({
							    IDGiocatore : listagiocatori[i]
							    , Voto : (listavoto[i]!='sv/ng')?listavoto[i]:null
							});
						}
					}
				}
				return arr;
			},[]);
		})

		arrRisultatiData = arrRisultatiData.reduce(function(a, b) {
			return a.concat(b);
		});

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
					mongoose.model('Quotidiano').create(arrQuotidiani, function(err, cl){
						if(err)
							throw err;
						callback(null)
					})
				},
				function(callback){
					mongoose.model('CalendarioA').create(arrIncontriA, function(err, cl){
						if(err)
							throw err;
						callback(null)
					})
				},
				function(callback){
					mongoose.model('GiocatoreA').create(arrGiocatoriA, function(err, cl){
						if(err)
							throw err;
						callback(null)
					})
				},
				function(callback){
					mongoose.model('Fantasquadra').create(arrFantasquadre, function(err, cl){
						if(err)
							throw err;
						callback(null)
					})
				},
				function(callback){
					mongoose.model('Formazione').create(arrFormazioniData, function(err, cl){
						if(err)
							throw err;
						callback(null)
					})
				},
				function(callback){
					mongoose.model('Tabellino').create(arrRisultatiData, function(err, cl){
						if(err)
							throw err.errors;
						callback(null)
					})
				},
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
				res.redirect('../');
			});
	});
});

function T(IDIncontro,IDSquadra,IDLega,Lista,ListaSqA,Ruolo,Voto,Modif,Tot,Supplementari,ListaSupplementari,VotoSupplementari,TotaleSquadraSupplementari,FattoreCampoSupplementari,GolSupplementari,Rigori,ListaRigori,VotoRigori,GolRigori,ParzialeSquadra,FattoreCampo,ModPortiere,ModDifesa,ModCentrocampo,ModAttacco,ModModulo,ModM1Pers,ModM2Pers,ModM3Pers,TotaleSquadra,Gol) {
    return {
    	IDIncontro : IDIncontro
	    , IDSquadra : IDSquadra
	    , IDLega : IDLega
	    , Lista : Lista
		//lista dei giocatori indicati in ordine
		// come appaiono nel tabellino. I primi 11,
		// quindi, sono i titolari. I valori sono separati
		// dal carattere %
		// i valori possono essere:
		// IDGiocatore: se c'e' un giocatore, c'e' il suo ID
		// -1: se e' una RU
		// 0: se e' assente
		// dal 12esimo in poi proseguono con panchina e tribuna:
		//  in questi ultimi non ci sono 0 o -1 quindi sono solo
		//  IDGiocatore: se positivo allora e' panchina oppure giocatore
		//  sostituito, se negativo e' tribuna
	    , ListaSqA : ListaSqA
		, Ruolo : Ruolo
		// come Lista, valori separati da % per i ruoli dei giocatori
		// 1,2,3,4: PORT, DIFE, CENT, ATTA "normali", oppure RU
		// 5,6,7,8: Riserve (p,d,c,a) {se nei primi 11, entrata, altrimenti riserva non entrata}
		// 0: assente
		// -1,-2,-3,-4: (solo "sostituiti"): giocatori che sono stati "sostituiti"
		// -5,-6,-7,-8: tribuna (p,d,c,a)
	    , Voto : Voto
		// valori separati da % contenenti i voti dei giocatori
	    , Modif : Modif
		// valori separati da % contenenti i modificatori dei giocatori
	    , Tot : Tot
		// valori separati da % contenenti i totali dei giocatori
	    , Supplementari : Supplementari
	    , ListaSupplementari : ListaSupplementari // separati da %, se -1 e' una ru, se 0 assente
	    , VotoSupplementari : VotoSupplementari // separati da %,
	    , TotaleSquadraSupplementari : TotaleSquadraSupplementari
	    , FattoreCampoSupplementari : FattoreCampoSupplementari
	    , GolSupplementari : GolSupplementari

	    , Rigori : Rigori
	    , ListaRigori : ListaRigori // separati da %,
		//vale -1 se RU, 0 se assente, altrimenti l'id del giocatore
	    , VotoRigori : VotoRigori // separati da %,
	    , GolRigori : GolRigori

	    , ParzialeSquadra : (ParzialeSquadra!='x')?ParzialeSquadra:null // Se "non esiste" allora vale "x"
	    , FattoreCampo : (FattoreCampo!='x')?FattoreCampo:null // Se "non esiste" allora vale "x"
	    , ModPortiere : (ModPortiere!='x')?ModPortiere:null // Se "non esiste" allora vale "x"
	    , ModDifesa : (ModDifesa!='x')?ModDifesa:null // Se "non esiste" allora vale "x"
	    , ModCentrocampo : (ModCentrocampo!='x')?ModCentrocampo:null // Se "non esiste" allora vale "x"
	    , ModAttacco : (ModAttacco!='x')?ModAttacco:null // Se "non esiste" allora vale "x"
	    , ModModulo : (ModModulo!='x')?ModModulo:null // Se "non esiste" allora vale "x"
	    , ModM1Pers : (ModM1Pers!='x')?ModM1Pers:null // Se "non esiste" allora vale "x"
	    , ModM2Pers : (ModM2Pers!='x')?ModM2Pers:null // Se "non esiste" allora vale "x"
	    , ModM3Pers : (ModM3Pers!='x')?ModM3Pers:null // Se "non esiste" allora vale "x"
		, TotaleSquadra : (TotaleSquadra!='x')?TotaleSquadra:null // Se "non esiste" allora vale "x"
	    , Gol : (Gol!='x')?Gol:null // Se "non esiste" allora vale "x"
    } 
}

function Z(IDIncontro,IDSquadra,IDLega,Nome,SquadraDiA,Ruolo,Pos,Rig) {
	return {
		IDIncontro:IDIncontro,
		IDSquadra:IDSquadra,
		IDLega:IDLega,
		Nome:Nome,
		SquadraDiA:SquadraDiA,
		Ruolo:Ruolo,
		Pos:Pos,
		Rig:Rig
	}
}

// Oggetto Fantasquadra
function F(ID,Nome,Presidente,Telef1,Telef2,Telef3,Email,IDDivisione,CreditiResidui) {
	return {
		ID : ID,
		Nome : Nome,
		Presidente : Presidente,
		Telef1 : Telef1,
		Telef2 : Telef2,
		Telef3 : Telef3,
		Email : Email,
		IDDivisione : IDDivisione,
		CreditiResidui : CreditiResidui,
		bilancio: [],
		rosa: []
	}
}

// Fantasquadra Extra lega
function FE(ID,IDLega,Nome) {
	return {
		ID : ID,
		IDLega : IDLega,
		Nome : Nome
	}
}
// Rosa
function R(IDSquadra,Ruolo,Nome,Squadra,Extracom,Stato,Contratto,Acq,Svinc,GioInf) {
	return {
		IDSquadra : IDSquadra,
		Ruolo : Ruolo,
		Nome : Nome,
		Squadra : Squadra,
		Extracom : Extracom,
		Stato : Stato, // vale 0 per rosa, 1 per svincolati, 2 per infortunati
		Contratto : Contratto, // vale -1 per i infortunati, -2 per prestito
		Acq : Acq,
		Svinc : Svinc,
		GioInf : GioInf
	}
}
// Bilancio
function B(IDSquadra,Descrizione,Valore,Data) {
	return {
		IDSquadra : IDSquadra,
		Descrizione : Descrizione,
		Valore : Valore,
		Data : Data
	}
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

function Quotidiano(ID,Nome) {
	return {
		ID:ID,
		Nome:Nome
	}
}

function GiocatoreA(ID,IDSquadra,Ruolo,Codice,Crediti,Extra) {
	return {
		Nome: ID,
		Squadra: IDSquadra,
		Ruolo: Ruolo,
		Codice: Codice,
		Crediti: Crediti,
		Extra: Extra
	};
}

function IncontroA(GiornataDiA,Casa,Fuori,GolCasa,GolFuori){
	return {
		GiornataDiA:GiornataDiA,
		Casa:Casa,
		Fuori:Fuori,
		GolCasa:GolCasa,
		GolFuori:GolFuori
	};
}



module.exports = router;