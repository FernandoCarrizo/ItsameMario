var Poruszanie = {
	aktualizacja: function(dane) {
		Poruszanie.zadania.Mario(dane);
		Poruszanie.zadania.Potwor(dane);
	},
	
	zadania: {
		Mario:function(dane) {
			dane.obiekty.mario.obecnyStan.ruch(dane);
		},
		
		Potwor: function(dane) {
			dane.obiekty.tabelaPotworow.forEach(function(p) {
				p.obecnyStan.ruch(dane);
			});
		}
	}
}