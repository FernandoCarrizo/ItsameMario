var Poruszanie = {
	aktualizacja: function(dane) {
		Poruszanie.zadania.Mario(dane);
	},
	
	zadania: {
		Mario:function(dane) {
			dane.obiekty.mario.obecnyStan.ruch(dane);
		}
	}
}