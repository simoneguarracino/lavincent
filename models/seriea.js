var mongoose = require('mongoose');
var fs=require('fs');
var iconv=require('iconv-lite');
var myutil=require('../util/myutil');

var seriea={giocatore:{},quotidiano:{},squadradia:{}}

seriea.giocatore.schema=

seriea.inizializza=function(req,res,f){
	fs.readFile('fcm/fcmSerieADati.js', function(err1,data1){
		if(err1)
			throw err1;
		fs.readFile('fcm/fcmSerieADatiDettaglio.js', function(err2,data2){
			if (err2)
				throw data2;
			eval(iconv.decode(data1,'latin1'));
			eval(iconv.decode(data2,'latin1'));
		})
	})
}

function Quotidiano(ID,Nome) {
	this.ID = ID
	this.Nome = Nome
}

function GiocatoreA(ID,IDSquadra,Ruolo,Codice,Crediti,Extra) {
	this.ID = ID
	this.IDSquadra = IDSquadra
	this.Ruolo = Ruolo
	// 1 = PORT, 2 = DIFE, 3 = CENT, 4 = ATTA
	this.Codice = Codice
	this.Crediti = Crediti
	this.Extra = Extra
}

module.exports = seriea