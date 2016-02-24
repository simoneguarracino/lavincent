// Oggetti JavaScript per Fantasquadre
// Oggetto Fantasquadra
function F(ID,Nome,Presidente,Telef1,Telef2,Telef3,Email,IDDivisione,CreditiResidui) {
	this.ID = ID
	this.Nome = Nome
	this.Presidente = Presidente
	this.Telef1 = Telef1
	this.Telef2 = Telef2
	this.Telef3 = Telef3
	this.Email = Email
	this.IDDivisione = IDDivisione
	this.CreditiResidui = CreditiResidui
}

// Fantasquadra Extra lega
function FE(ID,IDLega,Nome) {
	this.ID = ID
	this.IDLega = IDLega
	this.Nome = Nome
}
// Rosa
function R(IDSquadra,Ruolo,Nome,Squadra,Extracom,Stato,Contratto,Acq,Svinc,GioInf) {
	this.IDSquadra = IDSquadra
	this.Ruolo = Ruolo
	this.Nome = Nome
	this.Squadra = Squadra
	this.Extracom = Extracom
	this.Stato = Stato // vale 0 per rosa, 1 per svincolati, 2 per infortunati
	this.Contratto = Contratto // vale -1 per i infortunati, -2 per prestito
	this.Acq = Acq
	this.Svinc = Svinc
	this.GioInf = GioInf
}
// Bilancio
function B(IDSquadra,Descrizione,Valore,Data) {
	this.IDSquadra = IDSquadra
	this.Descrizione = Descrizione
	this.Valore = Valore
	this.Data = Data
}

function GeneraIntestazioneFantasquadre(cFsq) {
var arrF = new Object()
arrF = arrFantasquadre
document.write("<form name='frmFsq' id='frmFsq' action='rose.htm' method='get'>")
document.write("<table width='100%' border='00' cellspacing='0' cellpadding='0'>")
document.write("<tr><td width='5%' class='t-xxsB'><nobr>Fantasquadra:&nbsp;<select name='Fsq' class='t-xxs' id='Fsq'>")
for (i=1;i<arrF.length;i++) {
	document.write("<option value='" + arrF[i].ID + "'")
	if (arrF[i].ID == cFsq) document.write(" selected")
	document.write(">" + arrF[i].Nome + "</option>")
}
document.write("</select></nobr></td>")
document.write("<td width='95%' class='t-xxsB'>&nbsp;&nbsp;<input name='Invia' type='submit' class='t-xxs' id='Invia' value='  Vai  '></td>")
document.write("</tr></table></form>")
}

function GeneraSquadra(IDSquadra) {
var tabS = new Tabella(2,2)
var i,iD,isDivisione=0
	i=1
	while (arrFantasquadre[i].ID != IDSquadra) {
		i++
	}
	if (arrFantasquadre[i].IDDivisione != 0) {
		isDivisione=1
		iD=1
		while (arrDivisioni[iD].ID != arrFantasquadre[i].IDDivisione) {
			iD++
		}
	}
	tabS.SetStileRiga(1,"t-xxs")
	tabS.SetStile(1,1,"IntRossoBluDx")
	tabS.SetValore(1,1,"Squadra:&nbsp;")
	tabS.SetStile(1,2,"t-xxsB")
	tabS.SetValore(1,2,"&nbsp;"+arrFantasquadre[i].Nome)
	if (isDivisione == 1) {
		tabS.SetStileRiga(2,"t-xxs")
		tabS.SetStile(2,1,"IntRossoBluDx")
		tabS.SetValore(2,1,"Divisione:&nbsp;")
		tabS.SetStile(2,2,"Cella")
		tabS.SetValore(2,2,"&nbsp;"+arrDivisioni[iD].Nome)
	}
	tabS.SetStileRiga(isDivisione+2,"t-xxs")
	tabS.SetStile(isDivisione+2,1,"IntRossoBluDx")
	tabS.SetValore(isDivisione+2,1,"Presidente:&nbsp;")
	tabS.SetStile(isDivisione+2,2,"Cella")
	tabS.SetValore(isDivisione+2,2,"&nbsp;"+arrFantasquadre[i].Presidente)
	tabS.SetStileRiga(isDivisione+3,"t-xxs")
	tabS.SetStile(isDivisione+3,1,"IntRossoBluDx")
	tabS.SetValore(isDivisione+3,1,"Tel. casa:&nbsp;")
	tabS.SetStile(isDivisione+3,2,"Cella")
	tabS.SetValore(isDivisione+3,2,"&nbsp;"+arrFantasquadre[i].Telef1)
	tabS.SetStileRiga(isDivisione+4,"t-xxs")
	tabS.SetStile(isDivisione+4,1,"IntRossoBluDx")
	tabS.SetValore(isDivisione+4,1,"Tel. lavoro:&nbsp;")
	tabS.SetStile(isDivisione+4,2,"Cella")
	tabS.SetValore(isDivisione+4,2,"&nbsp;"+arrFantasquadre[i].Telef2)
	tabS.SetStileRiga(isDivisione+5,"t-xxs")
	tabS.SetStile(isDivisione+5,1,"IntRossoBluDx")
	tabS.SetValore(isDivisione+5,1,"Cellulare:&nbsp;")
	tabS.SetStile(isDivisione+5,2,"Cella")
	tabS.SetValore(isDivisione+5,2,"&nbsp;"+arrFantasquadre[i].Telef3)
	tabS.SetStileRiga(isDivisione+6,"t-xxs")
	tabS.SetStile(isDivisione+6,1,"IntRossoBluDx")
	tabS.SetValore(isDivisione+6,1,"eMail:&nbsp;")
	tabS.SetStile(isDivisione+6,2,"Cella")
	tabS.SetValore(isDivisione+6,2,"&nbsp;<a href='mailto:" + arrFantasquadre[i].Email+"'>"+arrFantasquadre[i].Email+"</a>")
	tabS.SetStileRiga(isDivisione+7,"t-xxs")
	tabS.SetStile(isDivisione+7,1,"IntRossoBluDx")
	tabS.SetValore(isDivisione+7,1,"Crediti Residui:&nbsp;")
	tabS.SetStile(isDivisione+7,2,"Cella")
	tabS.SetValore(isDivisione+7,2,"&nbsp;" + arrFantasquadre[i].CreditiResidui)

	tabS.nome = "Squadra"
	tabS.larghezza=50
	tabS.border=0
	tabS.cellpadding=1
	tabS.cellspacing=0
	tabS.stile="ClassEl"
	tabS.SetLarghezzaColonna(1,30)
	tabS.SetLarghezzaColonna(2,70)
	tabS.Stampa()
}

function GeneraRosa(IDSquadra) {
var tabR = new Tabella(2,5)
var i,cnt,sT,sR,fatto
	fatto=false
	tabR.nome="Rosa"
	tabR.larghezza=95
	tabR.border=0
	tabR.cellpadding=1
	tabR.cellspacing=0
	tabR.stile="ClassEl"
	tabR.SetLarghezzaColonna(1,10)
	tabR.SetLarghezzaColonna(2,60)
	tabR.SetLarghezzaColonna(3,20)
	tabR.SetLarghezzaColonna(4,4)
	tabR.SetLarghezzaColonna(5,6)
	tabR.SetStileRiga(1,"IntRossoBlu")
	tabR.SetStile(1,1,"Cella")
	tabR.SetStile(1,2,"Cella")
	tabR.SetStile(1,3,"Cella")
	tabR.SetStile(1,4,"Cella")
	tabR.SetStile(1,5,"Cella")
	tabR.SetValore(1,1,"Ruolo")
	tabR.SetValore(1,2,"Nome")
	tabR.SetValore(1,3,"Squadra")
	tabR.SetValore(1,4,"Con")
	tabR.SetValore(1,5,"$Acq")
	cnt=2
	for(i=1;i<arrRose.length;i++) {
		if ((arrRose[i].IDSquadra==IDSquadra)&&(arrRose[i].Stato==0)) {
			fatto=true			
			if ((cnt % 2) == 0) {
				tabR.SetStileRiga(cnt,"RosaD")
			} else {
				tabR.SetStileRiga(cnt,"RosaP")
			}
			tabR.SetStile(cnt,1,"Cella")
			tabR.SetStile(cnt,2,"Cella")
			tabR.SetStile(cnt,3,"Cella")
			tabR.SetStile(cnt,4,"CellaCentro")
			tabR.SetStile(cnt,5,"CellaCentro")
			sT="<span class='t-xxs"
			if (arrRose[i].Ruolo==1) {
				sR="G"
				sT+="G'>Portiere&nbsp;</span>"
			} else if (arrRose[i].Ruolo==2) {
				sR="V"
				sT+="V'>Difensore&nbsp;</span>"
			} else if (arrRose[i].Ruolo==3) {
				sR="R"
				sT+="R'>Centrocampista&nbsp;</span>"
			} else if (arrRose[i].Ruolo==4) {
				sR="Blu"
				sT+="Blu'>Attaccante&nbsp;</span>"
			} 
			tabR.SetValore(cnt,1,sT)
			tabR.SetValore(cnt,2,"<span class='t-xxs"+sR+"B'>&nbsp;"+arrRose[i].Nome+"</span>")
			tabR.SetValore(cnt,3,"<span class='t-xxs"+sR+"'>&nbsp;"+arrRose[i].Squadra+"</span>")
			tabR.SetValore(cnt,4,"<span class='t-xxs"+sR+"'>"+(arrRose[i].Contratto==-2?"Pres":arrRose[i].Contratto)+"</span>")
			tabR.SetValore(cnt,5,"<span class='t-xxs"+sR+"B'>"+arrRose[i].Acq+"</span>")
			cnt++
		} else {
			if ((fatto) && (arrRose[i].IDSquadra!=IDSquadra)) i=arrRose.length
			//esce dal ciclo senza proseguire per tutte le altre
		}
	}
    tabR.Stampa()
}

function GeneraVendutiInfortunati(IDSquadra) {
var tabV = new Tabella(2,5)
var tabI = new Tabella(2,6)
var i,cnt,sT,sR,fatto
	fatto=false
	tabV.Nome="Svincolati"
	tabV.larghezza=95
	tabV.border=0
	tabV.cellpadding=1
	tabV.cellspacing=0
	tabV.stile="ClassEl"
	tabV.SetLarghezzaColonna(1,10)
	tabV.SetLarghezzaColonna(2,60)
	tabV.SetLarghezzaColonna(3,20)
	tabV.SetLarghezzaColonna(4,4)
	tabV.SetLarghezzaColonna(5,6)
	tabV.SetStileRiga(1,"IntRossoBlu")
	tabV.SetSpan(1,1,5)
	tabV.SetSpanned(1,2,true)
	tabV.SetSpanned(1,3,true)
	tabV.SetSpanned(1,4,true)
	tabV.SetSpanned(1,5,true)
	tabV.SetValore(1,1,"Svincolati")
	tabV.SetStileRiga(2,"IntRossoBlu")
	tabV.SetStile(2,1,"Cella")
	tabV.SetStile(2,2,"Cella")
	tabV.SetStile(2,3,"Cella")
	tabV.SetStile(2,4,"Cella")
	tabV.SetStile(2,5,"Cella")
	tabV.SetValore(2,1,"Ruolo")
	tabV.SetValore(2,2,"Nome")
	tabV.SetValore(2,3,"Squadra")
	tabV.SetValore(2,4,"Con")
	tabV.SetValore(2,5,"$Acq")
	cnt=3
	for(i=1;i<arrRose.length;i++) {
		if ((arrRose[i].IDSquadra==IDSquadra)&&(arrRose[i].Stato==1)) {
			fatto=true
			if ((cnt % 2) == 0) {
				tabV.SetStileRiga(cnt,"RosaP")
			} else {
				tabV.SetStileRiga(cnt,"RosaD")
			}
			tabV.SetStile(cnt,1,"Cella")
			tabV.SetStile(cnt,2,"Cella")
			tabV.SetStile(cnt,3,"Cella")
			tabV.SetStile(cnt,4,"CellaCentro")
			tabV.SetStile(cnt,5,"CellaCentro")
			sT="<span class='t-xxs"
			if (arrRose[i].Ruolo==1) {
				sR="G"
				sT+="G'>Portiere&nbsp;</span>"
			} else if (arrRose[i].Ruolo==2) {
				sR="V"
				sT+="V'>Difensore&nbsp;</span>"
			} else if (arrRose[i].Ruolo==3) {
				sR="R"
				sT+="R'>Centrocampista&nbsp;</span>"
			} else if (arrRose[i].Ruolo==4) {
				sR="Blu"
				sT+="Blu'>Attaccante&nbsp;</span>"
			} 
			tabV.SetValore(cnt,1,sT)
			tabV.SetValore(cnt,2,"<span class='t-xxs"+sR+"B'>&nbsp;"+arrRose[i].Nome+"</span>")
			tabV.SetValore(cnt,3,"<span class='t-xxs"+sR+"'>&nbsp;"+arrRose[i].Squadra+"</span>")
			tabV.SetValore(cnt,4,"<span class='t-xxs"+sR+"'>"+(arrRose[i].Contratto==-1?"Inf":(arrRose[i].Contratto==-2?"Pres":arrRose[i].Contratto))+"</span>")
			tabV.SetValore(cnt,5,"<span class='t-xxs"+sR+"B'>"+arrRose[i].Acq+"</span>")
			cnt++
		} else {
			if ((fatto) && (arrRose[i].IDSquadra!=IDSquadra)) i=arrRose.length
			//esce dal ciclo senza proseguire per tutte le altre
		}
	}
  	tabV.Stampa()
	document.write("<br>")
	tabI.Nome="Infortunati"
	tabI.larghezza=95
	tabI.border=0
	tabI.cellpadding=1
	tabI.cellspacing=0
	tabI.stile="ClassEl"
	tabI.SetLarghezzaColonna(1,10)
	tabI.SetLarghezzaColonna(2,52)
	tabI.SetLarghezzaColonna(3,20)
	tabI.SetLarghezzaColonna(4,4)
	tabI.SetLarghezzaColonna(5,6)
	tabI.SetLarghezzaColonna(6,8)
	tabI.SetStileRiga(1,"IntRossoBlu")
	tabI.SetSpan(1,1,6)
	tabI.SetSpanned(1,2,true)
	tabI.SetSpanned(1,3,true)
	tabI.SetSpanned(1,4,true)
	tabI.SetSpanned(1,5,true)
	tabI.SetSpanned(1,6,true)
	tabI.SetValore(1,1,"Infortunati")
	tabI.SetStileRiga(2,"IntRossoBlu")
	tabI.SetStile(2,1,"Cella")
	tabI.SetStile(2,2,"Cella")
	tabI.SetStile(2,3,"Cella")
	tabI.SetStile(2,4,"Cella")
	tabI.SetStile(2,5,"Cella")
	tabI.SetStile(2,6,"Cella")
	tabI.SetValore(2,1,"Ruolo")
	tabI.SetValore(2,2,"Nome")
	tabI.SetValore(2,3,"Squadra")
	tabI.SetValore(2,4,"Con")
	tabI.SetValore(2,5,"$Acq")
	tabI.SetValore(2,6,"Gio")
	cnt=3
	fatto=false
	for(i=1;i<arrRose.length;i++) {
		if ((arrRose[i].IDSquadra==IDSquadra)&&(arrRose[i].Stato==2)) {
			fatto=true
			if ((cnt % 2) == 0) {
				tabI.SetStileRiga(cnt,"RosaP")
			} else {
				tabI.SetStileRiga(cnt,"RosaD")
			}
			tabI.SetStile(cnt,1,"Cella")
			tabI.SetStile(cnt,2,"Cella")
			tabI.SetStile(cnt,3,"Cella")
			tabI.SetStile(cnt,4,"CellaCentro")
			tabI.SetStile(cnt,5,"CellaCentro")
			tabI.SetStile(cnt,6,"CellaCentro")
			sT="<span class='t-xxs"
			if (arrRose[i].Ruolo==1) {
				sR="G"
				sT+="G'>Portiere&nbsp;</span>"
			} else if (arrRose[i].Ruolo==2) {
				sR="V"
				sT+="V'>Difensore&nbsp;</span>"
			} else if (arrRose[i].Ruolo==3) {
				sR="R"
				sT+="R'>Centrocampista&nbsp;</span>"
			} else if (arrRose[i].Ruolo==4) {
				sR="Blu"
				sT+="Blu'>Attaccante&nbsp;</span>"
			} 
			tabI.SetValore(cnt,1,sT)
			tabI.SetValore(cnt,2,"<span class='t-xxs"+sR+"B'>&nbsp;"+arrRose[i].Nome+"</span>")
			tabI.SetValore(cnt,3,"<span class='t-xxs"+sR+"'>&nbsp;"+arrRose[i].Squadra+"</span>")
			tabI.SetValore(cnt,4,"<span class='t-xxs"+sR+"'>"+(arrRose[i].Contratto==-1?"Inf":(arrRose[i].Contratto==-2?"Pres":arrRose[i].Contratto))+"</span>")
			tabI.SetValore(cnt,5,"<span class='t-xxs"+sR+"B'>"+arrRose[i].Acq+"</span>")
			tabI.SetValore(cnt,6,"<span class='t-xxs"+sR+"'>"+arrRose[i].GioInf+"</span>")
			cnt++
		} else {
			if ((fatto) && (arrRose[i].IDSquadra!=IDSquadra)) i=arrRose.length
			//esce dal ciclo senza proseguire per tutte le altre
		}
	}
	tabI.Stampa()

}

function GeneraBilancio(IDSquadra) {
var tabB = new Tabella(2,4)
var i,cnt,sT,sR,fatto
	fatto=false
	tabB.nome="Bilancio"
	tabB.larghezza=95
	tabB.border=0
	tabB.cellpadding=1
	tabB.cellspacing=0
	tabB.stile="ClassEl"
	tabB.SetLarghezzaColonna(1,60)
	tabB.SetLarghezzaColonna(2,10)
	tabB.SetLarghezzaColonna(3,10)
	tabB.SetLarghezzaColonna(4,20)
	tabB.SetStileRiga(1,"IntRossoBlu")
	tabB.SetStile(1,1,"Cella")
	tabB.SetStile(1,2,"CellaCentro")
	tabB.SetStile(1,3,"CellaCentro")
	tabB.SetStile(1,4,"Cella")
	tabB.SetValore(1,1,"Descrizione")
	tabB.SetValore(1,2,"Entrata")
	tabB.SetValore(1,3,"Uscita")
	tabB.SetValore(1,4,"Data")
	cnt=2
	for(i=1;i<arrBilanci.length;i++) {
		if (arrBilanci[i].IDSquadra==IDSquadra) {
			fatto=true
			if ((cnt % 2) == 0) {
				tabB.SetStileRiga(cnt,"RosaD")
			} else {
				tabB.SetStileRiga(cnt,"RosaP")
			}
			tabB.SetStile(cnt,1,"Cella")
			tabB.SetStile(cnt,2,"CellaCentro")
			tabB.SetStile(cnt,3,"CellaCentro")
			tabB.SetStile(cnt,4,"Cella")
			tabB.SetValore(cnt,1,arrBilanci[i].Descrizione)
			tabB.SetValore(cnt,2,arrBilanci[i].Valore>=0?"<span class='t-xxsVB'>"+arrBilanci[i].Valore+"</span>":"")
			tabB.SetValore(cnt,3,arrBilanci[i].Valore<0?"<span class='t-xxsRB'>"+(-arrBilanci[i].Valore)+"</span>":"")
			tabB.SetValore(cnt,4,arrBilanci[i].Data)
			cnt++
		} else {
			if ((fatto) && (arrBilanci[i].IDSquadra!=IDSquadra)) i=arrBilanci.length
			//esce dal ciclo senza proseguire per tutte le altre
		}
	}
	i=1
	while (arrFantasquadre[i].ID != IDSquadra) {
		i++
	}
	tabB.SetStileRiga(cnt,"IntBluGiallo")
	tabB.SetValore(cnt,1,"Crediti Residui: " + arrFantasquadre[i].CreditiResidui)
    tabB.Stampa()
}
