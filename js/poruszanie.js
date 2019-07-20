class Poruszanie {
  aktualizacja(dane) {
		this.mario(dane);
		this.potwor(dane);
	}

  mario(dane) {
    dane.obiekty.mario.obecnyStan.ruch(dane);
  }

  potwor(dane) {
    dane.obiekty.tabelaPotworow.forEach(function(p) {
      p.obecnyStan.ruch(dane);
    });
  }
}
