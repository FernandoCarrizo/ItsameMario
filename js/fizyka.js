class Fizyka {
  aktualizacja(dane) {
    this.grawitacja(dane.obiekty.mario);
		//this.wykrywanieKolizji(dane);
		this.smierc(dane);

		dane.obiekty.tabelaPotworow.forEach((p) => {
			this.grawitacja(p);
			//this.wykrywanieKolizji2(dane, p);
		});
  }

  grawitacja(obiekt) {
    if(!obiekt.momentSmierci) obiekt.obecnyStan = obiekt.stan.skakanie;
    obiekt.pedY+=1;
    obiekt.y+=obiekt.pedY;
  }

  smierc(dane) {
    if(dane.obiekty.mario.y > 624) {
      dane.obiekty.mario.momentSmierci = true;
      dane.kontroler.smierc.strataZycia(dane);
    }
  }
}
