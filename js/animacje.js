var Animacje = {
	aktualizacja: function(dane) {
		Animacje.zadania.Niebo(dane);
		Animacje.zadania.Mario(dane);
		Animacje.zadania.Potwor(dane);
		Animacje.zadania.Moneta(dane);
	},
	
	zadania: {
		Niebo: function(dane) {
			dane.obiekty.niebo.x -=1;
			
			if(dane.obiekty.niebo.x < -1440) {
				dane.obiekty.niebo.x = 0;
			}
		},
		
		Mario: function(dane) {
			dane.obiekty.mario.obecnyStan.animacja(dane);
		},
		
		Potwor: function(dane) {
			dane.obiekty.tabelaPotworow.forEach(function(p) {
				p.obecnyStan.animacja(dane);
			});
		},
    
    Moneta: function(dane) {
      dane.obiekty.tabelaMonet.forEach(function(m) {
				m.obecnyStan.animacja(dane);
			});
    }
	}
}