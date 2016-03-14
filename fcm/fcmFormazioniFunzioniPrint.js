function Commenti(IDIncontro,IDSquadra,IDLega,Cap,Vic,Ora,Commento) {
	this.IDIncontro = IDIncontro
	this.IDSquadra = IDSquadra
	this.IDLega = IDLega
	this.Cap = Cap
	this.Vic = Vic
	this.Ora = Ora
	this.Commento = Commento
}
// Oggetto Formazione (abbreviato Z)
function Z(IDIncontro,IDSquadra,IDLega,Nome,SquadraDiA,Ruolo,Pos,Rig) {
	this.IDIncontro = IDIncontro
	this.IDSquadra = IDSquadra
	this.IDLega = IDLega
	this.Nome = Nome
	this.SquadraDiA = SquadraDiA
	this.Ruolo = Ruolo
	this.Pos = Pos
	this.Rig = Rig
}

function GetFormazione(IDIncontro,IDSquadra,IDLega) {
// scorre la lista delle formazioni e ritorna tutte quelle che 
// hanno i tre valori corrispondenti. Quindi le ordina per pos
// mettendo pero' quelli con -1 alla fine e non all'inizio
var arr = new Array()
var i,cnt=1
var tipo,pPrimo,pUltimo
	for (i=1;i<arrFormazioni.length;i++) {
		if ((arrFormazioni[i].IDIncontro==IDIncontro) && (arrFormazioni[i].IDSquadra==IDSquadra) && (arrFormazioni[i].IDLega==IDLega)) {
			arr[cnt]=new Z
			arr[cnt]=arrFormazioni[i]
			cnt++
		} else {
			if (cnt>1) i=arrFormazioni.length
		}
	}
	//ordina
	for (i=1;i<arr.length;i++) {
		if (arr[i].Pos==-1) arr[i].Pos=999
	}
	if (arr.length>1) {
		QuickSortFormazioniPos(arr,1,arr.length-1)
		for (i=1;i<arr.length;i++) {
			if (arr[i].Pos==999) arr[i].Pos=-1
		}
		//ora ordina per ruolo all'interno delle tipologie
		// titolari
		pPrimo=arr.length-1
		pUltimo=1
		for (i=1;i<arr.length;i++) {
			if (arr[i].Pos==0) {
				if (i<pPrimo) pPrimo=i
				pUltimo=i
			}
		}
		if (pPrimo<pUltimo)	QuickSortFormazioniRuolo(arr,pPrimo,pUltimo)
		//riserve
		pPrimo=arr.length-1
		pUltimo=1
		for (i=1;i>arr.length;i++) {
			if (arr[i].Pos>0) {
				if (i<pPrimo) pPrimo=i
				pUltimo=i
			}
		}
		if (pPrimo<pUltimo)	QuickSortFormazioniRuolo(arr,pPrimo,pUltimo)
		//tribuna
		pPrimo=arr.length-1
		pUltimo=1
		for (i=1;i<arr.length;i++) {
			if (arr[i].Pos==-1) {
				if (i<pPrimo) pPrimo=i
				pUltimo=i
			}
		}
		if (pPrimo<pUltimo)	QuickSortFormazioniRuolo(arr,pPrimo,pUltimo)
	}
	return arr
}

function QuickSortFormazioniPos(arr,s,d) {
var i,j,X,m
var z1
	i = s
    j = d
    X = arr[Math.floor((s+d)/2)].Pos
    do {
		while (arr[i].Pos < X) {
			i++
		}
        while (X < arr[j].Pos) {
			j--
		}
		if (i<=j) {
			z1=arr[i]
			arr[i]=arr[j]
			arr[j]=z1
            i++
			j--
		}
	} while (i<=j)
	if (s<j) QuickSortFormazioniPos(arr,s,j)
	if (i<d) QuickSortFormazioniPos(arr,i,d)
}

function QuickSortFormazioniRuolo(arr,s,d) {
var i,j,X,m
var z1
	i = s
    j = d
    X = arr[Math.floor((s+d)/2)].Ruolo
    do {
		while (arr[i].Ruolo < X) {
			i++
		}
        while (X < arr[j].Ruolo) {
			j--
		}
		if (i<=j) {
			z1=arr[i]
			arr[i]=arr[j]
			arr[j]=z1
            i++
			j--
		}
	} while (i<=j)
	if (s<j) QuickSortFormazioniRuolo(arr,s,j)
	if (i<d) QuickSortFormazioniRuolo(arr,i,d)
}

function GeneraFormazioni(cGio,cComp) {
var arrI = new Array()
var f = new Array()
var tabe = new Object()
var str="",i,j
var ruolo,pd,colore
	// includi nel documento il file js corrispondente alla giornata
	//document.write("<script src='js/fcmFormazioniDati"+cGio+".js' type='text/javascript'></scr" + "ipt>")
	// carica la lista degli incontri di questa giornata e competizione
	arrI = RiempiListaIncontri(cGio,cComp) 
	// per ogni incontro
	// 1- apri un layer
	// 2- crea la tabella
	for (i=1;i<arrI.length;i++) {
		// tabella che contiene gli incontri
		document.write("<center><table width='95%' border=0 cellpadding=0 cellspacing=0><tr><td height='20' colspan="+((arrI[i].IDTipo==INC_GRANPREMIO)?"1":"2")+" align='center'>")
  		document.write("<span class='Competizione'>"+arrI[i].Competizione+": "+arrI[i].Fantagiornata+"</span></td></tr>")
		// riga inferiore
		document.write("<tr>")
		// tabella di sinistra (o unica se gran premio)
		document.write("<td width='"+((arrI[i].IDTipo==INC_GRANPREMIO)?"100":"50")+"%' align='center' valign='top'>")
		// tabella casa
		tabe=null
		tabe=new Tabella(1,3)
		f=GetFormazione(arrI[i].ID,arrI[i].IDSquadre.Casa,arrI[i].IDLegaSquadre.Casa)
		tabe=RiempiTabellaFormazione(tabe,f,arrI[i].Nomi.Casa)
		tabe.Stampa()
		document.write("</td>")
		if (arrI[i].IDTipo!=INC_GRANPREMIO) {
			document.write("<td width='50%' align='center' valign='top'>")
			// tabella fuori
			tabe=null
			tabe=new Tabella(1,3)
			f=GetFormazione(arrI[i].ID,arrI[i].IDSquadre.Fuori,arrI[i].IDLegaSquadre.Fuori)
			tabe=RiempiTabellaFormazione(tabe,f,arrI[i].Nomi.Fuori)
			tabe.Stampa()
			document.write("</td>")
		}
		document.write("</tr>")
		document.write("<tr><td height='20' colspan="+((arrI[i].IDTipo==INC_GRANPREMIO)?"1":"2")+" align='center'></td></tr>")
		//chiudi tabella degli incontri
		document.write("</table></center>")
	}
}

function RiempiTabellaFormazione(tabe,f,nome) {
var i,j,pd,colore,ruolo,inseritariga=0,riga=1
	tabe.nome="Formazione " + nome
	tabe.larghezza = 90
	tabe.border=1
	tabe.cellspacing=0
	tabe.cellpadding = 1
	tabe.stile = "Tabella"
	// nome della squadra
	tabe.SetValore(1,1,nome)
	tabe.SetStile(1,1,"Intestazione")
	tabe.SetSpan(1,1,2)
	tabe.SetSpanned(1,2,true)
	tabe.SetLarghezzaColonna(1,5)
	tabe.SetLarghezzaColonna(2,80)
	tabe.SetLarghezzaColonna(3,10)
	for (j=1;j<f.length;j++) {
	   if ((j<f.length)&&(f[j].Pos>=0)){
		riga=1+j+inseritariga
		if ((riga % 2) == 0) {
			pd="D"
		} else {
			pd="P"
		}
		if (f[j].Ruolo==1) {
			ruolo="P"
			colore="G"
		} else if (f[j].Ruolo==2) {
			ruolo="D"
			colore="V"
		} else if (f[j].Ruolo==3) {
			ruolo="C"
			colore="R"
		} else if (f[j].Ruolo==4) {
			ruolo="A"
			colore="Blu"
		}
		// per inserire la riga bianca tra titolari e riserve
		if (inseritariga==0 && f[j].Pos>0) {
			tabe.SetStileRiga(riga,"Riga2")
			tabe.SetValore(riga,1,"&nbsp;")
			tabe.SetStile(riga,1,"Riga2")
			tabe.SetSpan(riga,1,2)
			tabe.SetSpanned(riga,2,true)
			inseritariga=1
			riga=1+j+inseritariga
		}
		tabe.SetStileRiga(riga,"Riga")
		// ruolo e nome
		if (f[j].Pos==0) {
			// titolari
			tabe.SetValore(riga,1,"<span class='testo'>"+ruolo+"</span>")
			tabe.SetValore(riga,2,"<span class='testo'>"+f[j].Nome+" ("+f[j].SquadraDiA+")" + (f[j].Rig>0?" [R:"+f[j].Rig+"]":"")+ "</span>")
		} else if (f[j].Pos>0) {
			tabe.SetValore(riga,1,"<span class='testo'>"+ruolo+"</span>")
			tabe.SetValore(riga,2,"<span class='testo'>"+f[j].Nome+" ("+f[j].SquadraDiA+")"+ (f[j].Rig>0?" [R:"+f[j].Rig+"]":"")+ "</span>")
		} else {
			tabe.SetValore(riga,1,"&nbsp;")
			tabe.SetValore(riga,2,"<span class='testo'>"+f[j].Nome+" ("+f[j].SquadraDiA+")"+ (f[j].Rig>0?" [R:"+f[j].Rig+"]":"")+ "</span>")
		}
		tabe.SetStile(riga,1,"Centro")
		tabe.SetStile(riga,2,"Centro")
		if (f[j].Ruolo==1) {
			tabe.SetStile(riga,1,"Centro")
			tabe.SetStile(riga,2,"Centro")
	    }
	    }
	}
	return tabe
}
