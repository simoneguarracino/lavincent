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