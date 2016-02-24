// Oggetti generali per FCM

// Costanti di incontro
var INC_NORMALE = 1 // Normale con fattore campo
var INC_RIPOSO = 2 // La squadra in casa riposa
var INC_GRANPREMIO = 3 // La squadra in casa è in gran premio
var INC_NORMALE_NEUTRO = 4 // Normale in campo neutro
var INC_ELIMDIRETTA_AND = 5 // Eliminazione diretta, andata
var INC_ELIMDIRETTA_RIT = 6 // Eliminazione diretta, ritorno
var INC_ELIMDIRETTA_DIR = 7 // Eliminazione diretta, partita secca
var INC_ELIMDIRETTA_DIR_FC = 8 // Come precedente, ma con fattore campo

// Costruttore dell'oggetto Coppia
function Coppia(casa,fuori) {
	this.Casa=casa
	this.Fuori=fuori
}

function RisultatiUltima() {
	document.location.href="ris.htm?Gio="+GetUltimaGiornataGiocata()
}

function FormazioniProssima() {
	document.location.href="form.htm?Gio="+GetProssimaGiornataDaGiocare()
}

function CreaListaLink() {
	// necessita di fcmVariabili definito
	for (var i=1;i<=10;i++) {
		if (eval("Link"+i+"url")!="") {
			document.write ("<a href='"+eval("Link"+i+"url")+"' target='"+LinkTarget+"'>"+eval("Link"+i)+"</a><br><br>")
		}
	}
}

function CreaWebmaster() {
	if (WebmasterNome!="") {
		document.write("<a class='navlink' href='mailto:"+WebmasterEmail+"'>"+WebmasterNome+"</a>")
	}
}