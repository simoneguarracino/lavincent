var mongoose = require('mongoose');
var fs=require('fs');
var iconv=require('iconv-lite');
var myutil=require('../util/myutil');

var competizione={}

competizione.Schema = new mongoose.Schema({
	ID : Number,
	Nome: String,
	Predefinita: Boolean,
	gironi: [{
		ID: Number,
		IDGruppo: Number,
		Nome: String
	}]
});

competizione.coll=mongoose.model('Competizione', competizione.Schema);

competizione.inizializza=function(req, res, f){
	competizione.coll.collection.remove();
	fs.readFile('fcm/fcmCompetizioniDati.js',function(err, data){
		if(err)
			throw err
		eval(iconv.decode(data,'latin1'));
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

		mongoose.model('Competizione').create(arrCompetizioni, function(err, cl){
			if(err){
				console.log(err.errors)
				throw err;
			}
			f();
		})
	});
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

// Costruttore dell'oggetto Divisione
function Divisione(ID,Nome) {
	return {
		ID : ID,
		Nome : Nome
	}
}

// Costruttore dell'oggetto DivComp
function DivComp(IDComp, IDDiv) {
	return {
		IDComp : IDComp,
		IDDiv : IDDiv
	}
}

// Costruttore dell'oggetto Girone
function Girone(ID, IDComp, IDGruppo, Nome) {
	return {
		ID : ID,
		IDComp : IDComp,
		IDGruppo : IDGruppo,
		Nome : Nome
	}
}

// Costruttore dell'oggetto Gruppo 
function Gruppo(ID, Nome) {
	return {
		ID : ID,
		Nome : Nome
	}
}

module.exports = competizione