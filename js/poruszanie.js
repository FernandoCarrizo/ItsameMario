class Poruszanie {
  aktualizacja(dane) {
		this.mario(dane);
		this.potwor(dane);
    this.bloczekMonet(dane);
	}

  mario(dane) {
    dane.obiekty.mario.obecnyStan.ruch(dane);
  }

  potwor(dane) {
    dane.obiekty.tabelaPotworow.forEach(function(p) {
      p.obecnyStan.ruch(dane);
    });
  }

  bloczekMonet(dane) {
    dane.obiekty.tabelaBloczkowMonet.forEach(function(bm) {
      bm.obecnyStan.ruch(dane);
    });
  }
}
