class Wejscie {
  constructor() {
    this.nacisniety = {};
    document.onkeydown = (event) => {
			this.nacisniety[event.keyCode] = true;
		}

		document.onkeyup = (event) => {
			this.nacisniety[event.keyCode] = false;
		}
  }

  aktualizacja(dane) {
    let mario = dane.obiekty.mario;

		if(this.nacisnieto(39) && !mario.momentSmierci && mario.obecnyStan != mario.stan.miganie) {
			mario.kierunek = "prawo";
      mario.pedX = 8;

      if(mario.pedY == 0) {
        mario.obecnyStan = mario.stan.poruszanie;
      } else {
        mario.obecnyStan = mario.stan.skakanie;
      }
		} else if(this.nacisnieto(37) && !mario.momentSmierci && mario.obecnyStan != mario.stan.miganie) {
			mario.kierunek = "lewo";
      mario.pedX = -8;

      if(mario.pedY == 0) {
        mario.obecnyStan = mario.stan.poruszanie;
      } else {
        mario.obecnyStan = mario.stan.skakanie;
      }
		} else {
      mario.pedX = 0;
    }

		if(this.nacisnieto(32) && !mario.momentSmierci && mario.obecnyStan != mario.stan.miganie) {
			mario.obecnyStan = mario.stan.skakanie;
		}
  }

  nacisnieto(kod) {
    return this.nacisniety[kod];
  }
}
