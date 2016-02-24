// La maggior parte di questo codice opera di Marcello "John Doe" Puri

// Oggetti JavaScript per AlboDOro
// Oggetto Competizione Albo dOro
function AdOC(IDc, idAttuale, nome, iniziataNel) {
	this.IDc = IDc
	this.idAttuale = idAttuale
	this.nome = nome
	this.iniziataNel = iniziataNel
}

// Oggetto Fantasquadra Albo d'Oro
function AdOF(IDf, idAttuale, nome, iniziataNel) {
	this.IDf = IDf
	this.idAttuale = idAttuale
	this.nome = nome
	this.iniziataNel = iniziataNel
}

// Oggetto Posizione Albo dOro
function AdOP(idCompetizione, idSquadra, anno, stagione, posizione, presidente, punti, note) {
	this.idCompetizione = idCompetizione
	this.idSquadra = idSquadra
	this.anno = anno
	this.stagione = stagione
	this.posizione = posizione
	this.presidente = presidente
	this.punti = punti
	this.note = note
}

function adoV(idSquadra,nome,idAttuale)
{
	var c
	this.idSquadra = idSquadra
	this.nome=nome
	this.idAttuale=idAttuale
	this.vittorie = new Array(arrAdOCompetizioni.length)
	//for (c = 0; c < arrAdOCompetizioni.length; this.vittorie[c++] = 0);
	for (c = 0; c < arrAdOCompetizioni.length; this.vittorie[arrAdOCompetizioni[c++].IDc] = 0);
}

function GeneraVittorie()
{
	var competizioni = arrAdOCompetizioni.length
	var vittorie = new Array()

	var tabV = new Tabella(2, competizioni + 1)

	var c, s, p, v, cnt, idx

	// Imposta proprietà della tabella
	tabV.nome = "Vittorie albo d'oro"
	tabV.larghezza = 100
	tabV.border = 0
	tabV.cellpadding = 1
	tabV.cellspacing = 0
	tabV.stile = "ClassEl"
	tabV.SetLarghezzaColonna(1, 30)
	for (c = 2; c <= competizioni + 1; tabV.SetLarghezzaColonna(c++, 70 / competizioni));

	// Imposta stile header
	tabV.SetStileRiga(1, "IntRossoBlu")

	// Imposta stile celle dell'header
	for (c = 1; c <= competizioni + 1; tabV.SetStile(1, c++, "Cella"));

	// Imposta valori celle dell'header
	tabV.SetValore(1, 1, "Squadra")

	for (c = 2; c <= competizioni+1 ; tabV.SetValore(1, c, arrAdOCompetizioni[c++ - 2].nome));

	// Calcola vittorie di ogni squadra
	for (s = 0; s < arrAdOFantasquadre.length; s++) {
		vittorie[arrAdOFantasquadre[s].IDf] = new adoV(arrAdOFantasquadre[s].IDf, arrAdOFantasquadre[s].nome,arrAdOFantasquadre[s].idAttuale)
 	}
	for (p = 0; p < arrAdOPosizioni.length; p++)
		if (arrAdOPosizioni[p].posizione == 1)
			vittorie[arrAdOPosizioni[p].idSquadra].vittorie[arrAdOPosizioni[p].idCompetizione]++;

	// E le ordina
	vittorie.sort(ordinaVittorie)

	// Riempie la tabella
	cnt = 2
	for (v = 0; v < vittorie.length; v++, cnt++) {
		if (vittorie[v]==null) {
			cnt--
		} else {
			// Imposta stile della riga
			if ((cnt % 2) == 0) tabV.SetStileRiga(cnt, "AlboD")
			else tabV.SetStileRiga(cnt, "AlboP");
	
			// Imposta stile e valore della cella 'squadra'
			//tabV.SetStile(cnt, 1, arrAdOFantasquadre[vittorie[v].idSquadra].idAttuale == 0 ? "Cella" : "CellaBold")
			tabV.SetStile(cnt,1,vittorie[v].idAttuale==0?"Cella":"CellaBold")
			//tabV.SetValore(cnt, 1, arrAdOFantasquadre[vittorie[v].idSquadra].nome)
			tabV.SetValore(cnt,1,vittorie[v].nome)
				
			// Imposta stile e valore delle celle 'vittorie'
			//for (c = 2; c <= competizioni + 1; c++) {
			idx=2
			for (c=0; c<vittorie[v].vittorie.length; c++) {
				if (vittorie[v].vittorie[c]!=null) {
					//tabV.SetStile(cnt, c, "CellaCentro")
					tabV.SetStile(cnt,idx,"CellaCentro")
					//vittorie[v].vittorie[c - 2]==0?tabV.SetValore(cnt,c,"&nbsp"):tabV.SetValore(cnt, c, vittorie[v].vittorie[c - 2])
					vittorie[v].vittorie[c]==0?tabV.SetValore(cnt,idx,"&nbsp"):tabV.SetValore(cnt,idx,vittorie[v].vittorie[c])
					idx++;
				}
			}
		}
	}

	tabV.Stampa()
}

function ordinaVittorie(a, b)
{
	var c
	var ret
	if ((a!=null) && (b!=null)) {
		for (c = 0; c < arrAdOCompetizioni.length; c++) {
			ret = 0
				if (a.vittorie[c] < b.vittorie[c]) return 1
				if (a.vittorie[c] > b.vittorie[c]) return -1
		}
		//return arrAdOFantasquadre[a.idSquadra].nome > arrAdOFantasquadre[b.idSquadra].nome ? 1 : -1
		return a.nome>b.nome?1:-1
	} else {
		return -1
	}
}


function adoP(idSquadra,nome,idAttuale)
{
	var c, p

	this.idSquadra = idSquadra
	this.nome=nome
	this.idAttuale=idAttuale
	this.piazzamenti = new Array(arrAdOCompetizioni.length)
	
	for (c = 0; c < arrAdOCompetizioni.length; c++) {
		//this.piazzamenti[c] = new Array()
		this.piazzamenti[arrAdOCompetizioni[c].IDc]=new Array()
		for (p = 0; p < arrAdOFantasquadre.length;p++) {
		 	this.piazzamenti[arrAdOCompetizioni[c].IDc][arrAdOFantasquadre[p].IDf] = 0
	 	}
	}
}

function GeneraPiazzamenti()
{
	var competizioni = arrAdOCompetizioni.length
	var piazzamenti = new Array()

	var tabP = new Tabella(2, competizioni + 1)

	var c, s, p, i, pp, cnt,idx

	// Imposta proprietà della tabella
	tabP.nome = "Piazzamenti albo d'oro"
	tabP.larghezza = 100
	tabP.border = 0
	tabP.cellpadding = 1
	tabP.cellspacing = 0
	tabP.stile = "ClassEl"
	tabP.SetLarghezzaColonna(1, 30)
	for (c = 2; c <= competizioni + 1; tabP.SetLarghezzaColonna(c++, 70 / competizioni));

	// Imposta stile header
	tabP.SetStileRiga(1, "IntRossoBlu");

	// Imposta stile celle dell'header
	for (c = 1; c <= competizioni + 1; tabP.SetStile(1, c++, "Cella"));

	// Imposta valori celle dell'header
	tabP.SetValore(1, 1, "Squadra")
	for (c = 2; c <= competizioni + 1; tabP.SetValore(1, c, arrAdOCompetizioni[c++ - 2].nome));

	// Calcola piazzamenti di ogni squadra
	for (s = 0; s < arrAdOFantasquadre.length;s++) {
		piazzamenti[arrAdOFantasquadre[s].IDf] = new adoP(arrAdOFantasquadre[s].IDf, arrAdOFantasquadre[s].nome,arrAdOFantasquadre[s].idAttuale)
	}
	for (p = 0; p < arrAdOPosizioni.length; p++) {
		piazzamenti[arrAdOPosizioni[p].idSquadra].piazzamenti[arrAdOPosizioni[p].idCompetizione][arrAdOPosizioni[p].posizione]++
	}
	
	// E le ordina
	piazzamenti.sort(ordinaPiazzamenti)

	// Riempie la tabella
	cnt = 2
	for (p = 0; p < piazzamenti.length; p++, cnt++) {
		if (piazzamenti[p]==null) {
			cnt--
		} else {
			
			// Imposta stile della riga
			if ((cnt % 2) == 0) tabP.SetStileRiga(cnt, "AlboD")
			else tabP.SetStileRiga(cnt, "AlboP");
	
			// Imposta stile e valore della cella 'squadra'
			//tabP.SetStile(cnt,1,piazzamenti[p].idAttuale==0?"Cella":"CellaBold")
			tabP.SetStile(cnt,1,"Cella")
			//tabP.SetValore(cnt,1,piazzamenti[p].nome)
			tabP.SetValore(cnt,1,"<span class='" + (piazzamenti[p].idAttuale==0?"t-xxsV":"t-xxsVB") +"'>" + piazzamenti[p].nome +"</span>")
			// Imposta stile e valore delle celle 'piazzamenti'
			idx=2
			for (c=0; c<piazzamenti[p].piazzamenti.length; c++) {
			//for (c = 2; c <= competizioni + 1; c++) {
				if (piazzamenti[p].piazzamenti[c]!=null) {
					tabP.SetStile(cnt, idx, "CellaCentro")
					valoreCella = ""
					for (i = 0; i < piazzamenti[p].piazzamenti[c].length; i++) {
						pp = piazzamenti[p].piazzamenti[c][i]
						if ((pp != 0) && (pp!=null)) {
							valoreCella += String(i) + "&deg;"
							if (pp > 1) valoreCella += " [" + piazzamenti[p].piazzamenti[c][i] + "]"
							valoreCella += ", "
						}
					}
					if (valoreCella!="") tabP.SetValore(cnt, idx, valoreCella.substring(0, valoreCella.length - 2))
					idx++
				}
			}
		}
	}

	tabP.Stampa()
}

function ordinaPiazzamenti(a, b)
{
	if ((a!=null) && (b!=null)) {
	//	return arrAdOFantasquadre[a.idSquadra].nome > arrAdOFantasquadre[b.idSquadra].nome ? 1 : -1
		return a.nome>b.nome?1:-1
	} else {
		return -1
	}
}

function determinaAnniCompetizione(idCompetizione)
{
	var p, anni = new Array(), aux = new Array()

	for (p = 0; p < arrAdOPosizioni.length; p++)
		if (idCompetizione == -1 || idCompetizione == arrAdOPosizioni[p].idCompetizione)
			aux.push(arrAdOPosizioni[p].anno);

	aux.sort()
	anni.push(aux[0])
	for (a = 0; a < aux.length - 1; a++) if (aux[a] != aux[a + 1]) anni.push(aux[a + 1]);

	return anni
}

function adoS(idSquadra, anni,nome,idAttuale)
{
	var a

	this.idSquadra = idSquadra
	this.idAttuale=idAttuale
	this.nome = nome
	this.storico = new Array(anni)
	for (a = 0; a < anni; this.storico[a++] = 0);
}

function GeneraStorico()
{
	var competizioni = arrAdOCompetizioni.length
	var storico
	var arrAnni = new Array()
	var anni

	var c, a, s, p, cnt,idx

	// Determina anni in cui si sono svolte le competizioni
	arrAnni = determinaAnniCompetizione(-1)
	anni = arrAnni.length

	var tabS = new Tabella(2, anni +1)

	// Genera una tabella per ogni competizione
	for (c = 0; c < competizioni; c++) {

		// Imposta proprietà della tabella
		tabS.nome = "Storico albo d'oro"
		tabS.larghezza = 100
		tabS.border = 0
		tabS.cellpadding = 1
		tabS.cellspacing = 0
		tabS.stile = "ClassEl"
		tabS.SetLarghezzaColonna(1, 30)
		for (a = 2; a <= anni + 1; tabS.SetLarghezzaColonna(a++, 70 / anni));

		// Imposta proprietà e contenuto del titolo (nome della competizione)
		tabS.SetStileRiga(1, "IntRossoBlu")
		tabS.SetSpan(1, 1, anni+1)
		for (a = 2; a <= anni + 1; tabS.SetSpanned(1,a++,true));
		
		tabS.SetValore(1, 1, arrAdOCompetizioni[c].nome)
		
		// Imposta stile e contenuto dell'header
		tabS.SetStileRiga(2, "IntRossoBlu")
		for (a = 1; a <= anni + 1; tabS.SetStile(2, a++, "Cella"));
		tabS.SetValore(2, 1, "Squadra")
		for (a = 2; a <= anni + 1; tabS.SetValore(2, a, arrAnni[a++ - 2]));
		storico=null
		storico=new Array()
		// Calcola storico della competizione
		for (s = 0; s < arrAdOFantasquadre.length; s++) {
			storico[arrAdOFantasquadre[s].IDf] = new adoS(arrAdOFantasquadre[s].IDf, anni,arrAdOFantasquadre[s].nome,arrAdOFantasquadre[s].idAttuale)
		}
		for (p = 0; p < arrAdOPosizioni.length; p++)
			if (arrAdOPosizioni[p].idCompetizione == arrAdOCompetizioni[c].IDc)
				storico[arrAdOPosizioni[p].idSquadra].storico[arrAdOPosizioni[p].anno - arrAnni[0]] = arrAdOPosizioni[p].posizione;

		// E le ordina
		storico.sort(ordinaStorico)

		// Riempie la tabella
		cnt = 3
		idx=3
		for (s = 0; s < storico.length; s++, cnt++) {
			if (storico[s]==null) {
				cnt--
			} else {
				// Imposta stile della riga
				if ((cnt % 2) == 0) tabS.SetStileRiga(cnt, "AlboD")
				else tabS.SetStileRiga(cnt, "AlboP");
	
				// Imposta stile e valore della cella 'squadra'
				//tabS.SetStile(cnt, 1, arrAdOFantasquadre[storico[s].idSquadra].idAttuale == 0 ? "Cella" : "CellaBold")
				//tabS.SetStile(cnt,1,storico[s].idAttuale==0?"Cella":"CellaBold")
				tabS.SetStile(cnt,1,"Cella")
				//tabS.SetValore(cnt, 1, arrAdOFantasquadre[storico[s].idSquadra].nome)
				//tabS.SetValore(cnt,1,storico[s].nome)
				tabS.SetValore(cnt,1,"<span class='" + (storico[s].idAttuale==0?"t-xxsR":"t-xxsRB") + "'>" + storico[s].nome + "</span>")
				// Imposta stile e valore delle celle 'storico'
				for (a = 2; a <= anni + 1; a++) {
					tabS.SetStile(cnt, a, "CellaCentro")
					tabS.SetValore(cnt, a, storico[s].storico[a - 2] != 0 ? storico[s].storico[a - 2] : "")
				}
				idx++
			}
		}

		tabS.Stampa()
		if (c != competizioni - 1) document.write("<br>")
	}
}

function ordinaStorico(a, b)
{
	//return arrAdOFantasquadre[a.idSquadra].nome > arrAdOFantasquadre[b.idSquadra].nome ? 1 : -1
	if ((a!=null) && (b!=null)) {
		return a.nome>b.nome?1:-1
	} else {
		return -1
	}
}


function GeneraDettagliato()
{
	var competizioni = arrAdOCompetizioni.length
	var dettagliato = new Array()
	var arrAnni = new Array()
	var arrRifSq = new Array()
	
	var anni

	var c, a, d, t,i

	
	// Determina anni in cui si sono svolte le competizioni
	arrAnni = determinaAnniCompetizione(-1)
	anni = arrAnni.length

	for (i=0;i<arrAdOFantasquadre.length;i++) {
		arrRifSq[arrAdOFantasquadre[i].IDf]=i
	}
	// Genera una tabella per ogni coppia competizione/anno
	for (a=anni-1; a>=0; a--) {
		for (c = 0; c < competizioni; c++) {

			var tabD = new Tabella(2, 5)

			// Imposta proprietà della tabella
			tabD.nome = "Dettagliato albo d'oro"
			tabD.larghezza = 100
			tabD.border = 0
			tabD.cellpadding = 1
			tabD.cellspacing = 0
			tabD.stile = "ClassEl"
			tabD.SetLarghezzaColonna(1, 30)
			tabD.SetLarghezzaColonna(2, 10)
			tabD.SetLarghezzaColonna(3, 10)
			tabD.SetLarghezzaColonna(4, 20)
			tabD.SetLarghezzaColonna(5, 30)

			// Imposta proprietà del titolo (nome della competizione)
			tabD.SetStileRiga(1, "IntRossoBlu")
			tabD.SetSpan(1, 1, 5)
			tabD.SetSpanned(1, 2, true)
			tabD.SetSpanned(1, 3, true)
			tabD.SetSpanned(1, 4, true)
			tabD.SetSpanned(1, 5, true)
			tabD.SetValore(1, 1, arrAdOCompetizioni[c].nome + " (" + arrAnni[a] + " )")

			// Imposta stile e contenuto dell'header
			tabD.SetStileRiga(2, "IntRossoBlu")
			for (t = 1; t <= 5; tabD.SetStile(2, t++, "Cella"));
			tabD.SetValore(2, 1, "Squadra")
			tabD.SetValore(2, 2, "Posizione")
			tabD.SetValore(2, 3, "Punti")
			tabD.SetValore(2, 4, "Presidente")
			tabD.SetValore(2, 5, "Note")

			// Calcola dettagliato della competizione
			dettagliato = new Array()
			for (p = 0; p < arrAdOPosizioni.length; p++)
				if ((arrAdOPosizioni[p].idCompetizione == arrAdOCompetizioni[c].IDc) && ((arrAdOPosizioni[p].anno - arrAnni[0]) == a))
					dettagliato.push(p);

			if (dettagliato.length != 0) {

				// E le ordina
				dettagliato.sort(ordinaDettagliato)

				// Riempie la tabella
				cnt = 3
				for (d = 0; d < dettagliato.length; d++, cnt++) {

					// Imposta stile della riga
					if ((cnt % 2) == 0) tabD.SetStileRiga(cnt, "AlboD")
					else tabD.SetStileRiga(cnt, "AlboP");

					// Imposta stile e valore delle celle
					//tabD.SetStile(cnt, 1, arrAdOFantasquadre[arrAdOPosizioni[dettagliato[d]].idSquadra].idAttuale == 0 ? "Cella" : "CellaBold")
					//tabD.SetStile(cnt, 1, arrAdOFantasquadre[arrRifSq[arrAdOPosizioni[dettagliato[d]].idSquadra]].idAttuale == 0 ? "Cella" : "CellaBold")
					tabD.SetStile(cnt, 1,"Cella")
					//tabD.SetValore(cnt, 1, arrAdOFantasquadre[arrAdOPosizioni[dettagliato[d]].idSquadra].nome)
					tabD.SetValore(cnt, 1,"<span class='" + (arrAdOFantasquadre[arrRifSq[arrAdOPosizioni[dettagliato[d]].idSquadra]].idAttuale == 0 ? "t-xxsG" : "t-xxsGB" )+ "'>" + arrAdOFantasquadre[arrRifSq[arrAdOPosizioni[dettagliato[d]].idSquadra]].nome + "</span>")

					tabD.SetStile(cnt, 2, "CellaCentro")
					tabD.SetValore(cnt, 2, arrAdOPosizioni[dettagliato[d]].posizione)

					tabD.SetStile(cnt, 3, "CellaCentro")
					tabD.SetValore(cnt, 3, arrAdOPosizioni[dettagliato[d]].punti)

					tabD.SetStile(cnt, 4, "Cella")
					tabD.SetValore(cnt, 4, arrAdOPosizioni[dettagliato[d]].presidente)

					tabD.SetStile(cnt, 5, "Cella")
					tabD.SetValore(cnt, 5, arrAdOPosizioni[dettagliato[d]].note)
				}

				tabD.Stampa()
				if ((a != anni - 1) || (c != competizioni - 1)) document.write("<br>")
			}
		}
	}
}

function ordinaDettagliato(a, b)
{
	return arrAdOPosizioni[a].posizione > arrAdOPosizioni[b].posizione ? 1 : -1
}
