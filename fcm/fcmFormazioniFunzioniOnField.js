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

function GeneraFormazioni(cGio,cComp, nomeSkin) {
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
		if (arrI[i].IDTipo!=INC_GRANPREMIO) {
			document.write("<div class='matchonfield'>")
			document.write("<div class='headerincontro'>")
			document.write("<img class='logocasa' src='skin/" +nomeSkin+ "/img/team/logo/mini/"+arrI[i].IDSquadre.Casa+".png'>")
			document.write("<div class='nomesqcasa'>" +arrI[i].Nomi.Casa+ "</div>")
			document.write("<div class='nomesqfuori'>" +arrI[i].Nomi.Fuori+ "</div>")
			document.write("<img class='logofuori' src='skin/" +nomeSkin+ "/img/team/logo/mini/"+arrI[i].IDSquadre.Fuori+".png'>")
			document.write("<div class='componfield'>"+arrI[i].Competizione+": "+arrI[i].Fantagiornata+"</div>")	
			document.write("</div>") 	
			// tabella casa
			f=GetFormazione(arrI[i].ID,arrI[i].IDSquadre.Casa,arrI[i].IDLegaSquadre.Casa)
			document.write("<div class='sqcasa'>")	
			RiempiCampoFormazione(f,arrI[i].Nomi.Casa,"si",nomeSkin)
			document.write("</div>")	
			// tabella fuori
			f=GetFormazione(arrI[i].ID,arrI[i].IDSquadre.Fuori,arrI[i].IDLegaSquadre.Fuori)
			document.write("<div class='sqfuori'>")
			RiempiCampoFormazione(f,arrI[i].Nomi.Fuori,"no",nomeSkin)
			document.write("</div>")	
			//chiudi tabella degli incontri
			document.write("</div>")
			document.write("<div class='stampaonfield'><a href='formprint.php' target='_blank'><img src='skin/" +nomeSkin+ "/img/print.png'>STAMPA formazioni</a></div>")
		} else {
			document.write("<div class='matchonfield'>")
			document.write("<div class='headerincontroGP'>")
			document.write("<img class='logocasa' src='skin/" +nomeSkin+ "/img/team/logo/mini/"+arrI[i].IDSquadre.Casa+".png'>")
			document.write("<div class='nomesqcasa'>" +arrI[i].Nomi.Casa+ "</div>")
			document.write("<div class='componfieldGP'>"+arrI[i].Competizione+": "+arrI[i].Fantagiornata+"</div>")	
			document.write("</div>") 	
			// tabella casa (o unica se gran premio)
			f=GetFormazione(arrI[i].ID,arrI[i].IDSquadre.Casa,arrI[i].IDLegaSquadre.Casa)
			document.write("<div class='sqcasaGP'>")	
			RiempiCampoFormazione(f,arrI[i].Nomi.Casa,"si",nomeSkin)
			document.write("</div>")
			document.write("</div>")
			document.write("<div class='stampaonfield'><a href='formprint.php' target='_blank'><img src='skin/" +nomeSkin+ "/img/print.png'>STAMPA formazioni</a></div>")
		}
	}
}

function RiempiCampoFormazione(f,nome,casa,nomeSkin) {
	var dif=0
	var cen=0
	var att=0
	for (j=1;j<f.length;j++) {
		if (j<12){
			if (f[j].Ruolo==2) {
				dif++
			} else if (f[j].Ruolo==3) {
				cen++
			} else if (f[j].Ruolo==4) {
				att++
			}
		}
	}
	document.write("<div class='modulo'>Modulo: " +dif+ "-" +cen+ "-" +att+ "</div>")
	document.write("<div class='titolari'>")
		document.write("<div class='tit'>")
		if (casa == "si") {
			for (j=1;j<f.length;j++) {
				for(i=1;i<arrGiocatoriA.length;i++) {
					if (eval("xg"+arrGiocatoriA[i].ID) == f[j].Nome) {
						photo = arrGiocatoriA[i].Codice
					}
				}	
				if (f[j].Pos==0) {
					// titolari
					if ((j!=1)&&(f[j].Ruolo!=f[j-1].Ruolo)){
						document.write("</div>")
						document.write("<div class='tit'>")
					}
					document.write("<div class='titruolo'>")
					document.write("<img src='skin/" +nomeSkin+ "/img/figu/"+photo+".png'>")
					document.write("<div class='nomegio'>"+getOnlyUpper(f[j].Nome)+"</div>")
					document.write("</div>")
				}
			}
		} else {
			for (j=f.length-1;j>0;j--) {
				for(i=1;i<arrGiocatoriA.length;i++) {
					if (eval("xg"+arrGiocatoriA[i].ID) == f[j].Nome) {
						photo = arrGiocatoriA[i].Codice
					}
				}	
				if (f[j].Pos==0) {
					// titolari
					if ((j!=f.length-1)&&(f[j].Ruolo!=f[j+1].Ruolo)){
						document.write("</div>")
						document.write("<div class='tit'>")
					}
					document.write("<div class='titruolo'>")
					document.write("<img src='skin/" +nomeSkin+ "/img/figu/"+photo+".png' onError=this.src='skin/" +nomeSkin+ "/img/player.png' width='30px'>")
					document.write("<div class='nomegio'>"+getOnlyUpper(f[j].Nome)+"</div>")
					document.write("</div>")
				}
			}
		}
		document.write("</div>")	
	document.write("</div>")
	if (casa == "si") {
		document.write("<div class='panchinari'>")
	} else {
		document.write("<div class='panchinarifuori'>")
	}
		for (j=1;j<f.length;j++) {
			for(i=1;i<arrGiocatoriA.length;i++) {
				if (eval("xg"+arrGiocatoriA[i].ID) == f[j].Nome) {
					photo = arrGiocatoriA[i].Codice
				}
			}
			if (f[j].Pos>0) {
				// panchinari
				document.write("<div class='pancruolo'>")
				document.write("<img src='skin/" +nomeSkin+ "/img/figu/"+photo+".png' onError=this.src='skin/" +nomeSkin+ "/img/player.png' width='30px'>")
				document.write("<div>"+getOnlyUpper(f[j].Nome)+"</div>")
				document.write("</div>")
			}
		}
	document.write("</div>")	
}

//FUNZIONCINE UTILI
//elimina la substring che contiene almeno una lettera minuscola
//es. COGNOME Nome -> COGNOME
function getOnlyUpper(str) {
	str = str.split(" ")
	for (i=0;i<str.length;i++){
		if (str[i].search(/[a-z]/g)!= -1)
			str = str.slice(0, i)
	}
	return str.join(" ")
}