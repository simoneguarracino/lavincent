function RV(IDSquadra,IDGiocatore,Ruolo,IDQuot,ListaGio,ListaFormatoGio,ListaStat,ListaFormatoStat) {
	this.IDSquadra = IDSquadra
	this.IDGiocatore = IDGiocatore
	// vale:
	// 0: titoli di colonna
	// >0: riga di giocatore
	// -1: riga dei tot/parz
	// -2: riga dell mv
	// -3: riga delle fm
	// -4: riga dell'avversario
	// -5: riga del risultato
	this.Ruolo = Ruolo 
	this.IDQuot = IDQuot
	// nome del quotidiano
	this.ListaGio = ListaGio
	// contiene la lista, separata da % con i valori del giocatore
	this.ListaFormatoGio = ListaFormatoGio
	// e' composto da due cifre di cui la prima indica il colore e la seconda lo stile
	// prima cifra
	//  0 = bianco
	//  1 = rosso
	//  2 = ciano
	//  3 = verde
	//  4 = giallo
	//  x+5 = colore primo piano = grigio
	// seconda cifra (bit)
	//  0 = normale
	//  1 = neretto
	//  2 = corsivo
	//  4 = sottolineato
    // quindi le combinazioni sono: 0=-,1=B,2=I,3=BI,4=S,5=SB,6=SI,7=SBI
	this.ListaStat = ListaStat
	// valori separati da % con le statistiche (26 valori)
	this.ListaFormatoStat = ListaFormatoStat
}

function GeneraIntestazioneFantasquadreQuotidiani(cSq,cQuot) {
var arrF = new Object()
var arrQ = new Object()
var i
arrF = arrFantasquadre
arrQ = arrQuotidiani
document.write("<form name='frmRv' id='frmRv' action='regvoti.php' method='get'>")
document.write("<table class='intesquotsq' border='0' cellspacing='0' cellpadding='0'>")
document.write("<tr><td class='regvoti_infoq'><nobr>&nbsp;&nbsp;Quotidiano:&nbsp;<select name='Quot' onchange='this.form.submit()' id='Quot'>")
for (i=1;i<arrQ.length;i++) {
	document.write("<option value='" + arrQ[i].ID + "'")
	if (arrQ[i].ID == cQuot) document.write(" selected")
	document.write(">" + arrQ[i].Nome + "</option>")
}
document.write("</select></nobr></td>")
document.write("<td class='regvoti_infos'><nobr>Fantasquadra:&nbsp;<select name='Sq' onchange='this.form.submit()' id='Sq'>")
for (i=1;i<arrF.length;i++) {
	document.write("<option value='" + arrF[i].ID + "'")
	if (arrF[i].ID == cSq) document.write(" selected")
	document.write(">" + arrF[i].Nome + "</option>")
}
document.write("</select></nobr></td>")
document.write("</tr></table></form>")
}

function GeneraRegistroVoti(IDSq,IDQuot) {
var i,j,f,fmt
var arrDati = new Object()
var arrDatiF = new Object()
var arrStat = new Object()
var arrStatF = new Object()
var tabe = new Tabella(10,10)
var arrRV = arrRegistri
var riga,pd,grigio
var primacolStat
   tabe.nome="Registro voti"
   tabe.larghezza = 100
   tabe.border=0
   tabe.cellspacing=0
   tabe.cellpadding =0
   tabe.stile = "regv"
   riga=1
   for (i=1;i<arrRV.length;i++) {
      if (arrRV[i].IDQuot==IDQuot) {
         arrDati = arrRV[i].ListaGio.split("%")
         arrDatiF = arrRV[i].ListaFormatoGio.split("%")
         arrStat = arrRV[i].ListaStat.split("%")
         arrStatF = arrRV[i].ListaFormatoStat.split("%")
         primacolStat=arrDati.length
         if (arrRV[i].IDGiocatore==0) {
            tabe.SetStileRiga(riga,"riga-blu2")
            for (j=0;j<arrDati.length;j++) {
               tabe.SetValore(riga,j+1,"<nobr>"+arrDati[j]+"</nobr>")
            }
            for (j=0;j<arrStat.length;j++) {
         tabe.SetValore(riga,j+1+primacolStat,"<nobr>"+arrStat[j]+"</nobr>")
           }
         } else {
            if ((riga % 2) == 0) {
               pd="dispariRv"
            } else {
               pd="pariRv"
            }

            for (j=0;j<arrDati.length;j++) {
               f=parseInt(arrDatiF[j])
               if (f>=50) {
                  grigio="-grigio"
                  f=f-50
               } else {
                  grigio=""
               }
               if (f<10) {
                  // bianco
                  tabe.SetStile(riga,j+1,"riga-"+pd+grigio)
               } else if (f>=10 && f<20) {
                  // rosso
                  tabe.SetStile(riga,j+1,"cella-rosso"+grigio)
               } else if (f>=20 && f<30) {
                  // rosso
                  tabe.SetStile(riga,j+1,"cella-ciano"+grigio)
               } else if (f>=30 && f<40) {
                  // rosso
                  tabe.SetStile(riga,j+1,"cella-verde"+grigio)
               } else if (f>=40 && f<50) {
                  // rosso
                  tabe.SetStile(riga,j+1,"cella-oliva"+grigio)
               }
               if (f>=10) f=(f+"").charAt(1)
               f=parseInt(f)
               fmt=""
               if (f>0) {
                  if ((f & 1)) fmt=fmt+"B"
                  if ((f & 2)) fmt=fmt+"I"
                  if ((f & 4)) fmt=fmt+"U"
               }
               if (fmt!="") {
                  tabe.SetValore(riga,j+1,"<nobr><div class='tmod"+fmt+"'>"+arrDati[j]+"</div></nobr>")
               } else {
                  tabe.SetValore(riga,j+1,"<nobr>"+arrDati[j]+"</nobr>")
               }
            }
            for (j=0;j<arrStat.length;j++) {
               f=parseInt(arrStatF[j])
               if (f>=50) {
                  grigio="-grigio"
                  f=f-50
               } else {
                  grigio=""
               }
               if (f<10) {
tabe.SetStile(riga,j+1+primacolStat,"riga-"+pd+"-cx")
               } else if (f>=10 && f<20) {
                  tabe.SetStile(riga,j+1+primacolStat,"cella-rosso-cx")
               } else if (f>=20 && f<30) {
                  tabe.SetStile(riga,j+1+primacolStat,"cella-ciano-cx")
               } else if (f>=30 && f<40) {
                  tabe.SetStile(riga,j+1+primacolStat,"cella-verde-cx")
               } else if (f>=40 && f<50) {
                  tabe.SetStile(riga,j+1+primacolStat,"cella-oliva-cx")
               }
               if (f>=10) f=(f+"").charAt(1)
               f=parseInt(f)
               fmt=""
               if (f>0) {
                  if ((f & 1)) fmt=fmt+"B"
                  if ((f & 2)) fmt=fmt+"I"
                  if ((f & 4)) fmt=fmt+"U"
               }

               if (fmt!="") {
                  tabe.SetValore(riga,j+1+primacolStat,"<nobr><div class='tmod"+fmt+"'>"+arrStat[j]+"</div></nobr>")
               } else {
                  tabe.SetValore(riga,j+1+primacolStat,"<nobr>"+arrStat[j]+"</nobr>")
               }
            }
         }
         riga++
      }
   }
   tabe.Stampa()
}

function GeneraRegistroVotiInt(IDSq,IDQuot) {
var i,j,f,fmt
var arrDati = new Object()
var arrDatiF = new Object()
var arrStat = new Object()
var arrStatF = new Object()
var tabe = new Tabella(10,1)
var arrRV = arrRegistri
var riga,pd,grigio
var primacolStat
   tabe.nome="Registro voti"
   tabe.larghezza = 99
   tabe.border=0
   tabe.cellspacing=0
   tabe.cellpadding =0
   tabe.stile = "regv"
   riga=1
   tabe.SetValore(1,1,"Giocatore")
   for (i=1;i<arrRV.length;i++) {
      if (arrRV[i].IDQuot==IDQuot) {
         arrDati = arrRV[i].ListaGio.split("%")
         arrDatiF = arrRV[i].ListaFormatoGio.split("%")
         arrStat = arrRV[i].ListaStat.split("%")
         arrStatF = arrRV[i].ListaFormatoStat.split("%")
         primacolStat=arrDati.length
         if (arrRV[i].IDGiocatore==0) {
            tabe.SetStileRiga(riga,"riga-blu")
         } else {
            if ((riga % 2) == 0) {
               pd="dispariSq"
            } else {
               pd="pariSq"
            }

            if (arrRV[i].IDGiocatore==0) {
               tabe.SetStile(riga,1,"riga-"+pd)
               tabe.SetValore(riga,1,"<nobr>Giocatore</nobr>")
            } else if (arrRV[i].IDGiocatore==-1) {
               tabe.SetStile(riga,1,"riga-blu")
               tabe.SetValore(riga,1,"<nobr>Totale Squadra (Parziale)</nobr>")
            } else if (arrRV[i].IDGiocatore==-2) {
               tabe.SetStile(riga,1,"riga-"+pd)
               tabe.SetValore(riga,1,"<nobr>Mediavoto</nobr>")
            } else if (arrRV[i].IDGiocatore==-3) {
               tabe.SetStile(riga,1,"riga-"+pd)
               tabe.SetValore(riga,1,"<nobr>Fantamedia</nobr>")
            } else if (arrRV[i].IDGiocatore==-4) {
               tabe.SetStile(riga,1,"riga-"+pd)
               tabe.SetValore(riga,1,"<nobr>Avversario</nobr>")
            } else if (arrRV[i].IDGiocatore==-5) {
               tabe.SetStile(riga,1,"riga-blu")
               tabe.SetValore(riga,1,"<nobr>Risultato</nobr>")
            } else {
               tabe.SetStile(riga,1,"riga-"+pd)
               if (arrRV[i].Ruolo==1) {
						tabe.SetValore(riga,1,"<nobr><span class='t-xxsGBr'>"+toProperCase(filterSpecial(filter(eval("xg"+arrRV[i].IDGiocatore))))+"</span></nobr>")
					} else if (arrRV[i].Ruolo==2) {
						tabe.SetValore(riga,1,"<nobr><span class='t-xxsVBr'>"+toProperCase(filterSpecial(filter(eval("xg"+arrRV[i].IDGiocatore))))+"</span></nobr>")
					} else if (arrRV[i].Ruolo==3) {
						tabe.SetValore(riga,1,"<nobr><span class='t-xxsRBr'>"+toProperCase(filterSpecial(filter(eval("xg"+arrRV[i].IDGiocatore))))+"</span></nobr>")
					} else if (arrRV[i].Ruolo==4) {
						tabe.SetValore(riga,1,"<nobr><span class='t-xxsBluBr'>"+toProperCase(filterSpecial(filter(eval("xg"+arrRV[i].IDGiocatore))))+"</span></nobr>")
               }               
            }

         }
         riga++
      }
   }
   tabe.Stampa()
}
//FUNZIONCINE UTILI

//elimina le minuscole e l'apice dalla stringa in input
function filterSpecial(str) {
	re = /\?|\"|'/g;
	// remove special characters like "$" and "," etc...
	return str.replace(re, "´");
}

//elimina le minuscole e l'apice dalla stringa in input
function filter(str) {
	re = /a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|à|è|ì|ò|(|)|ù|\./g;
	// remove special characters like "$" and "," etc...
	return str.replace(re, "");


}

//Mette l'iniziale di ogni parola in maiuscolo e il resto in minuscolo: In Questo Modo Qui
	// proper case function (JScript 5.5+)
	function toProperCase(s){
		return s.toLowerCase().replace(/^(.)|\s(.)/g,
		function($1) { return $1.toUpperCase(); });
	}
	