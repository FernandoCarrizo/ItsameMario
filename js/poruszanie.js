var Poruszanie = {
	aktualizacja: function(dane) {
		Poruszanie.mario(dane);
	},
	
	mario: function(dane) {
		dane.obiekty.mario.obecnyStan.ruch(dane);
	}
}