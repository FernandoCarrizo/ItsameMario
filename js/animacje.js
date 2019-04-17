class Animacje {
	aktualizacja(dane) {
		this.niebo(dane);
		this.mario(dane);
		this.potwor(dane);
		this.moneta(dane);
	}
	
	niebo(dane) {
		dane.obiekty.niebo.x -=1;
		
		if(dane.obiekty.niebo.x < -1440) {
			dane.obiekty.niebo.x = 0;
		}
	}
	
	mario(dane) {
		dane.obiekty.mario.obecnyStan.animacja(dane);
	}
	
	potwor(dane) {
		dane.obiekty.tabelaPotworow.forEach((p) => {
			p.obecnyStan.animacja(dane);
		});
	}
    
    moneta(dane) {
		dane.obiekty.tabelaMonet.forEach((m) => {
			m.obecnyStan.animacja(dane);
		});
    }
}