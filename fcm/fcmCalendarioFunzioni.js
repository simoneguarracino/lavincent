// Oggetti JavaScript per Calendario
// riferisce fcmGenerale.js

/**********************************
*********** COSTRUTTORI ***********
***********************************/
// Costruttore dell'oggetto Incontro (abbreviato in I)
function I(ID,IncAcc,IDTipo,Giocato,IDFantagiornata,Fantagiornata,IDCompetizione,Competizione,IDGirone,Girone,GiornataDiA,IDCasa,IDFuori,IDLegaCasa,IDLegaFuori,NomeCasa,NomeFuori,GolCasa,GolFuori,ParzialeCasa,ParzialeFuori,TotaleCasa,TotaleFuori,M1Casa,M1Fuori,M2Casa,M2Fuori,M3Casa,M3Fuori) {
	this.ID = ID
	this.IncAcc = IncAcc
	this.IDTipo = IDTipo
	this.IDFantagiornata = IDFantagiornata
	this.Fantagiornata = Fantagiornata
	this.IDCompetizione = IDCompetizione
	this.IDGirone = IDGirone
	this.Competizione = Competizione
	this.Girone = Girone
	this.IDSquadre = new Coppia(IDCasa,IDFuori)
	this.IDLegaSquadre = new Coppia(IDLegaCasa,IDLegaFuori)
	this.Nomi = new Coppia(NomeCasa,NomeFuori)
	this.Gol = new Coppia(GolCasa,GolFuori)
	this.Parziali = new Coppia(ParzialeCasa,ParzialeFuori)
	this.Totali = new Coppia(TotaleCasa,TotaleFuori)
	this.M1 = new Coppia(M1Casa,M1Fuori)
	this.M2 = new Coppia(M2Casa,M2Fuori)
	this.M3 = new Coppia(M3Casa,M3Fuori)
	this.Giocato = Giocato
	this.GiornataDiA = GiornataDiA	
}

/***********************************
************** METODI **************
************************************/
function RiempiListaIncontri(giornata,competizione) {
	// Trova tutti gli incontri di una giornata di A
	// e di una certa competizione se diverso da 0
var arr = new Array()
var i,cnt=1
	for (i=1;i<arrIncontri.length;i++) {
		if ((parseInt(arrIncontri[i].GiornataDiA) == giornata) && ((competizione!=0 && (parseInt(arrIncontri[i].IDCompetizione)==competizione)) || competizione==0)) {
			// se non e' un riposo...
			if (arrIncontri[i].IDTipo!=INC_RIPOSO) {
				//aggiungilo
				arr[cnt] = new I()
				arr[cnt] = arrIncontri[i]
				cnt++
			}
		}
	}
	return arr
}

function FiltraCompetizione(arr,idComp) {
// Modifica l'array principale rimuovendo gli incontri
// che non fanno parte della competizione passata
var iComp = parseInt(idComp)
var i, cnt = 1
var newArr = new Array()
var d10
	Stato("Filtro Competizione...")
	d10 = Math.ceil(arr.length / 10)
	for (i=1;i<arr.length;i++) {
		if (parseInt(arr[i].IDCompetizione) == iComp) {
			newArr[cnt] = new I()
			newArr[cnt] = arr[i]
			cnt++
		}
		if ((i % d10) == 0) Stato("Filtro Competizione..." + (Math.floor((i*100)/arr.length)) + "%")
	}
	return newArr
}

function FiltraDivisione(arr,arrFsq,idDiv) {
// Modifica l'array principale rimuovendo gli incontri
// che non hanno squadre della divisione
var iDiv = parseInt(idDiv)
var iDiv2, iID
var i, j, cnt = 1, bAggiungi
var newArr = new Array()
var arrF = new Array()
var d10
	Stato("Filtro Divisione...")
	cnt = 1
	for (i=1;i<arrFsq.length;i++) {
		if (parseInt(arrFsq[i].IDDivisione) == iDiv) {
			arrF[cnt] = arrFsq[i].ID
			cnt++
		}
	}
	cnt = 1
	d10 = Math.ceil(arr.length / 10)
	// determina le squadre della Divisione
	for (i=1;i<arr.length;i++) {
		bAggiungi = false
		// solo per le squadre della lega, non extra 
		if ((parseInt(arr[i].IDLegaSquadre.Casa) != 0) || (parseInt(arr[i].IDLegaSquadre.Fuori) != 0)) {
			bAggiungi = true
		} else {
			for (j=1;j<arrF.length;j++) {
				if (arr[i].IDSquadre.Casa == arrF[j]) bAggiungi = true
			}
			if (!bAggiungi) {
				// controlla quella fuori casa	
				if ((parseInt(arr[i].IDTipo) != INC_GRANPREMIO) && (parseInt(arr[i].IDTipo) != INC_RIPOSO)) {
					for (j=1;j<arrF.length;j++) {
						if (arr[i].IDSquadre.Fuori == arrF[j]) bAggiungi = true
					}
				}
			}
		}
		if (bAggiungi) {
			newArr[cnt] = new I()
			newArr[cnt] = arr[i]
			cnt++
		}
		if ((i % d10) == 0) Stato("Filtro Divisione..." + (Math.floor((i*100)/arr.length)) + "%")
	}
	return newArr
}

function GeneraCalendario(idComp,idDiv) {
var arr = new Object()
var arrFSq = new Object()
var cale = new Tabella(2,5)
var bGiocato, i, j, iIncAcc
var iCorrGiornataDiA = 0, iUltimaGiornataDiA = 0, iPrecGiornataDiA=-1
var sPrecCompetizione = "", sCorrCompetizione = ""
var sPrecFantagiornata = "", sCorrFantagiornata = ""
var sPrecGirone = "", sCorrGirone = ""
var sSqCasa, sSqFuori, sIncTemp, sRisTemp
var iMaxRiga = 0, iCorrCol = 4, iCorrRiga = 1, iLastPosRiga = 1
var bCompetizioneCambiata = false, iUltimaRiga = 0, iTemp, sTemp
var iUltimoFormato = 0 // pari = 0, dispari = 1
var d10	
	// Genera la tabella del calendario (SOLO la tabella)
	// Apri tabella
	//arr = RiempiCalendario(arr)
	arr = arrIncontri
	d10 = Math.ceil(arr.length / 10)
	if (idComp != 0 && idComp != "") arr = FiltraCompetizione(arr,idComp)
	if (idDiv != 0 && idDiv != "") {
		//arrFsq = RiempiFantasquadre()
		arrFsq = arrFantasquadre
		arr = FiltraDivisione(arr,arrFsq,idDiv)
	}
	Stato("Generazione Calendario...")
	// Contenuti
	for (i=1;i<arr.length;i++) {
		iCorrGiornataDiA = arr[i].GiornataDiA
		if (iCorrGiornataDiA != iPrecGiornataDiA) {
			// Se la giornata di A è diversa, stampala
			iCorrRiga++
			if (iCorrCol==1) {
				iCorrCol=4
				iCorrRiga=iLastPosRiga
			} else {
				iCorrCol=1
				iCorrRiga = iUltimaRiga +1
				iLastPosRiga = iCorrRiga
			}
			iPrecGiornataDiA = iCorrGiornataDiA
			cale.SetStile(iCorrRiga,iCorrCol,"Giornata")
			cale.SetValore(iCorrRiga,iCorrCol,"Giornata di A: " + iCorrGiornataDiA + " &nbsp;<a href='form.htm?cGio=" + iCorrGiornataDiA + "'>Formazioni</a>&nbsp;" + "|&nbsp;<a href='ris.htm?cGio=" + iCorrGiornataDiA + "'>Tabellini</a>")
			cale.SetSpan(iCorrRiga,iCorrCol,2)
			cale.SetSpanned(iCorrRiga,iCorrCol+1,true)
			iCorrRiga++
			sPrecCompetizione = ""
			iUltimoFormato = 0
        }
		sCorrCompetizione = arr[i].Competizione
		bCompetizioneCambiata = false
		if (sPrecCompetizione != sCorrCompetizione) {
			// Stampa il nome competizione se diverso
			sPrecCompetizione = sCorrCompetizione
            bCompetizioneCambiata = true
			sPrecFantagiornata = "xxxxxxxxxxxxxxxxxxx"
			iUltimoFormato = 0
		}
		sCorrFantagiornata = arr[i].Fantagiornata
		if (((sPrecFantagiornata != sCorrFantagiornata) && sCorrFantagiornata != "") || ((sPrecFantagiornata != sCorrFantagiornata) && bCompetizioneCambiata)) { 
			// Se cambia la fantagiornata o la competizione e la fantagiorata è definita, stampale entrambe
			sPrecFantagiornata = sCorrFantagiornata
			cale.SetStile(iCorrRiga,iCorrCol,"Competizione")
			if (sCorrFantagiornata == "") {
				cale.SetValore(iCorrRiga,iCorrCol,sCorrCompetizione)
			} else {
				cale.SetValore(iCorrRiga,iCorrCol,sCorrCompetizione + ": " + sCorrFantagiornata)
			}
			cale.SetSpan(iCorrRiga,iCorrCol,2)
			cale.SetSpanned(iCorrRiga,iCorrCol+1,true)
			iCorrRiga++
			sPrecGirone = ""
			iUltimoFormato = 0
        }
		sCorrGirone = arr[i].Girone
		if ((sPrecGirone != sCorrGirone) && sCorrGirone != "") {
       		// Stampa il girone se presente e definito
			sPrecGirone = sCorrGirone
			cale.SetStile(iCorrRiga,iCorrCol,"Girone")
			cale.SetValore(iCorrRiga,iCorrCol,sCorrGirone)
			cale.SetSpan(iCorrRiga,iCorrCol,2)
			cale.SetSpanned(iCorrRiga,iCorrCol+1,true)
			iCorrRiga++
			iUltimoFormato = 0
		}
		//iIncAcc = arr[i].IncAcc
		//if (iIncAcc == 1) {
			// I
			iTemp = arr[i].IDTipo
			if (iTemp == INC_RIPOSO) {
				sIncTemp = arr[i].Nomi.Casa + " Riposa"
				sRisTemp = ""
			} else if (iTemp == INC_GRANPREMIO) {
				sIncTemp = arr[i].Nomi.Casa
				sRisTemp = arr[i].Totali.Casa
			} else {
				sIncTemp = arr[i].Nomi.Casa + " - " + arr[i].Nomi.Fuori
				sRisTemp = arr[i].Gol.Casa + " - " + arr[i].Gol.Fuori
			}
        //} else {
			// Accoppiamento
			// Rimuovere i commenti all'if precedente e compilare questa sezione
			//  per gestire in maniera diversa incontri da accoppiamenti
		//} // if iIncAcc == 1
 		if (iUltimoFormato == 0) {
			cale.SetStile(iCorrRiga,iCorrCol,"IncSqD")
			cale.SetStile(iCorrRiga,iCorrCol+1,"IncRisD")
			iUltimoFormato = 1
		} else {
			cale.SetStile(iCorrRiga,iCorrCol,"IncSqP")
			cale.SetStile(iCorrRiga,iCorrCol+1,"IncRisP")
			iUltimoFormato = 0
		}
		cale.SetValore(iCorrRiga,iCorrCol,sIncTemp)
		bGiocato = arr[i].Giocato
		if (bGiocato) {
			cale.SetValore(iCorrRiga,iCorrCol+1,sRisTemp)
  		} else {
			cale.SetValore(iCorrRiga,iCorrCol+1,"")
		}
		iCorrRiga++
		if (iCorrRiga >= iUltimaRiga) iUltimaRiga = iCorrRiga 
	if ((i % d10) == 0)	Stato("Generazione Calendario..." + (Math.floor((i*100)/arr.length)) + "%")
	} // for
	//larghezza colonne
	cale.nome="Calendario"
	cale.larghezza=100
	cale.border=0
	cale.cellpadding=0
	cale.cellspacing=0
	cale.SetLarghezzaColonna(1,39)
	cale.SetLarghezzaColonna(2,10)
	cale.SetLarghezzaColonna(3,0)
	cale.SetLarghezzaColonna(4,39)
	cale.SetLarghezzaColonna(5,10)
	cale.Stampa()
	/*
	document.write ("<TABLE width='100%' BORDER=0 CELLPADDING=0 CELLSPACING=0>");
	document.write("<tr><td width='39%'></td><td width='10%'></td><td></td><td width='39%'></td><td width='10%'></td></tr>")
	Stato("Visualizzazione Calendario...")
	d10 = Math.ceil(cale.numrighe / 10)
	for (i=1;i<=cale.numrighe;i++) {
		document.write("<tr>")
		for (j=1;j<=cale.numcolonne;j++) {
			if ((j==1) || (j>1 && cale.GetSpan(i,j-1)==1)) {
				sTemp="<td"
				if (cale.GetSpan(i,j)>1) {
					sTemp = sTemp + " colspan=" + cale.GetSpan(i,j)
				}
				if (cale.GetStile(i,j)!="") {
					sTemp = sTemp + " class='" + cale.GetStile(i,j) + "'"
				}
				sTemp += ">"
				sTemp = sTemp + cale.GetValore(i,j) + "</td>"
				document.write(sTemp)	
			}
		}
		document.writeln("</tr>")
		if ((i % d10) == 0) Stato("Visualizzazione Calendario..." + (Math.floor((i*100)/cale.numrighe)) + "%")
	}
	//Chiudi tabella
	document.writeln("</TABLE>")
	*/
}

function GetUltimaGiornataGiocata() {
// ritorna l'ultima giornata giocata. Se non e' stata giocata
// nessuna allora ritorna comunque 1
var i,trovata=false,gio=0
if (arrIncontri[1].Giocato == false) return 1
i=arrIncontri.length-1
	do {
		if (arrIncontri[i].Giocato && arrIncontri[i].IDTipo!=INC_RIPOSO) {
			gio=arrIncontri[i].GiornataDiA
		}
		i--
	} while (gio==0 && i>=1)
	return gio
}

function GetProssimaGiornataDaGiocare() {
// ritorna la prossima giornata di A da giocare. Se sono state
// giocate tutte ritorna comunque maxa
var i,trovata=false,gio=0
if (arrIncontri[1].Giocato == false) return 1
i=arrIncontri.length-1
	do {
		if (arrIncontri[i].Giocato && arrIncontri[i].IDTipo!=INC_RIPOSO) {
			gio=arrIncontri[i].GiornataDiA
		}
		i--
	} while (gio==0 && i>=1)
	return (gio==MaxA?MaxA:gio+1)
}