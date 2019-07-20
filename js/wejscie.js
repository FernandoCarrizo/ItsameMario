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

		if(this.nacisnieto(39)) {
			mario.kierunek = "prawo";

			if(mario.pedY == 0) {
				mario.obecnyStan = mario.stan.poruszanie;
			} else {
				if(mario.x < dane.canvas.fgCtx.canvas.width/2 || dane.obiekty.mapa.x <= dane.canvas.fgCtx.canvas.width-dane.obiekty.mapa.w) {
					mario.x += mario.pedX;
				} else {
					dane.obiekty.mapa.x -= mario.pedX;
					for( let i = 0; i<dane.obiekty.tabelaScian.length; i++) {
						dane.obiekty.tabelaScian[i].x -= mario.pedX;
					}
					for( let i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
						dane.obiekty.tabelaPotworow[i].x -= mario.pedX;
					}
          for( let i = 0; i<dane.obiekty.tabelaMonet.length; i++) {
						dane.obiekty.tabelaMonet[i].x -= mario.pedX;
					}
				}
			}
		}
		if(this.nacisnieto(37)) {
			mario.kierunek = "lewo";

			if(mario.pedY == 0) {
				mario.obecnyStan = mario.stan.poruszanie;
			} else {
				if(mario.x > dane.canvas.fgCtx.canvas.width/2 || dane.obiekty.mapa.x >= 0) {
					mario.x -= mario.pedX;
				} else {
					dane.obiekty.mapa.x += mario.pedX;
					for( let i = 0; i<dane.obiekty.tabelaScian.length; i++) {
						dane.obiekty.tabelaScian[i].x += mario.pedX;
					}
					for( let i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
						dane.obiekty.tabelaPotworow[i].x += mario.pedX;
					}
          for( let i = 0; i<dane.obiekty.tabelaMonet.length; i++) {
						dane.obiekty.tabelaMonet[i].x += mario.pedX;
					}
				}
			}
		}
		if(this.nacisnieto(32)) {
			mario.obecnyStan = mario.stan.skakanie;
		}
  }

  nacisnieto(kod) {
    return this.nacisniety[kod];
  }
}
