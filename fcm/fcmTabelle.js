// Gestione Tabelle
/**********************************
*********** COSTRUTTORI ***********
***********************************/
// Costruttore dell'oggetto Cella per le tabelle
function Cella(valore,stile,span) {
	this.valore = valore
	this.stile = stile
	this.span = span
	this.spanned = false
}

// Costruttore dell'oggetto RigaTabella
function RigaTabella(numcolonne) {
	this.numcolonne = numcolonne
	this.riga = new Array(numcolonne)
	this.Stile = ""
	for (var i=1; i<=numcolonne; i++) {
		this.riga[i] = new Cella("&nbsp;","",1)
	}
}

// Costruttore dell'oggetto Tabella, formata da celle
function Tabella(numrighe,numcolonne) {
	this.nome = ""
	this.numrighe = numrighe
	this.numcolonne = numcolonne 
	this.tab = new Array(numrighe)
	this.larghezza = 100
	this.border=0
	this.cellspacing=0
	this.cellpadding = 0
	this.stile = ""
	this.larghezzacolonne = new Array(numcolonne)
	for (var i=1; i<=numrighe; i++) {
		this.tab[i] = new RigaTabella(numcolonne)
	}
	this.SetStile = TabellaSetStile
	this.SetValore = TabellaSetValore
	this.GetStile = TabellaGetStile
	this.GetValore = TabellaGetValore
	this.AggiungiRiga = TabellaAggiungiRiga
	this.SetSpan = TabellaSetSpan
	this.GetSpan = TabellaGetSpan
	this.SetStileRiga = TabellaSetStileRiga
	this.GetStileRiga = TabellaGetStileRiga
	this.SetSpanned = TabellaSetSpanned
	this.GetSpanned = TabellaGetSpanned
	this.Stampa = TabellaStampa
	this.SetLarghezzaColonna = TabellaSetLarghezzaColonna
	this.IncrementaColonna = TabellaIncrementaColonna
}
/***********************************
************** METODI **************
************************************/
function TabellaIncrementaColonna(colonna) {
	this.numcolonne=colonna
	for (var r=1;r<=this.numrighe;r++) {
		for (var c=this.numcolonne;c<=colonna;c++) this.tab[r].riga[c] =  new Cella("&nbsp;","",1)
	}
}
function TabellaAggiungiRiga() {
	// Aggiunge una riga all'array della visualizzazione
	this.numrighe++
	this.tab[this.tab.length] = new RigaTabella(this.numcolonne)
}

function TabellaSetStileRiga(riga,stile) {
	while (riga>this.numrighe) {
		this.AggiungiRiga()
	}
	this.tab[riga].Stile = stile
}

function TabellaGetStileRiga(riga) {
	return this.tab[riga].Stile 
}

function TabellaSetValore(riga,colonna,valore) {
	// Imposta un valore nella tabella alla posizione riga x colonna
	while (riga>this.numrighe) {
		this.AggiungiRiga()
	}
	if (colonna>this.numcolonne) this.IncrementaColonna(colonna)
	this.tab[riga].riga[colonna].valore = valore
}

function TabellaSetStile(riga,colonna,stile) {
	// Imposta uno stile CSS nell'array alla posizione riga x colonna
	while (riga>this.numrighe) {
		this.AggiungiRiga()
	}
	if (colonna>this.numcolonne) this.IncrementaColonna(colonna)
	this.tab[riga].riga[colonna].stile = stile
}

function TabellaGetValore(riga,colonna) {
	return this.tab[riga].riga[colonna].valore
}

function TabellaGetStile(riga,colonna) {
	return this.tab[riga].riga[colonna].stile
}

function TabellaSetSpan(riga,colonna,span) {
	while (riga>this.numrighe) {
		this.AggiungiRiga()
	}
	if (colonna>this.numcolonne) this.IncrementaColonna(colonna)
	this.tab[riga].riga[colonna].span = span
}

function TabellaGetSpan(riga,colonna) {
	return this.tab[riga].riga[colonna].span
}

function TabellaSetSpanned(riga,colonna,spanned) {
	while (riga>this.numrighe) {
		this.AggiungiRiga()
	}
	if (colonna>this.numcolonne) this.IncrementaColonna(colonna)
	this.tab[riga].riga[colonna].spanned = spanned
}

function TabellaGetSpanned(riga,colonna) {
	return this.tab[riga].riga[colonna].spanned
}

function TabellaStampa() {
var i,j,d10,sTemp
	d10 = Math.ceil(this.numrighe / 10)
	document.write("<TABLE width='"+this.larghezza+"%' BORDER="+this.border+" CELLSPACING="+this.cellspacing+" CELLPADDING="+this.cellpadding+(this.stile!=""?" class='"+this.stile+"'":"")+">")
	for (i=1;i<=this.numrighe;i++) {
		sTemp="<tr"
		if (this.GetStileRiga(i)!="") sTemp += " class='" + this.tab[i].Stile + "'" 
		sTemp += ">"
		document.write(sTemp)
		for (j=1;j<=this.numcolonne;j++) {
			if (!this.GetSpanned(i,j)) {
				sTemp="<td"
				if (this.GetSpan(i,j)==1){
					if (this.larghezzacolonne[j]>0) sTemp += " width=" + this.larghezzacolonne[j] + "%"
				}
				if (this.GetSpan(i,j)>1) sTemp += " colspan=" + this.GetSpan(i,j)
				if (this.GetStile(i,j)!="")	sTemp += " class='" + this.GetStile(i,j) + "'"
				sTemp += ">" + this.GetValore(i,j) + "</td>"
				document.write(sTemp)
			}
		}
		document.writeln("</tr>")		
		if ((i % d10) == 0) Stato("Visualizzazione " + this.nome + "..." + (Math.floor((i*100)/this.numrighe)) + "%")
	}
	document.write("</table>")
}

function TabellaSetLarghezzaColonna(colonna,larghezzaperc) {
	this.larghezzacolonne[colonna] = larghezzaperc
}
