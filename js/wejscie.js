var Wejscie = {
	ini: function(dane) {
		document.onkeydown = function(event) {
			Wejscie.zadania.nacisniety[event.keyCode] = true;
		}
		
		document.onkeyup = function(event) {
			Wejscie.zadania.nacisniety[event.keyCode] = false;
		}
	},
	
	aktualizacja: function(dane) {
		var mario = dane.obiekty.mario;
		
		if(Wejscie.zadania.Nacisnieto(39)) {
			mario.kierunek = "prawo";
			
			if(mario.pedY == 0) {
				mario.obecnyStan = mario.stan.poruszanie;
			} else {
				if(mario.x < dane.canvas.fgCanvas.width/2 || dane.obiekty.mapa.x <= dane.canvas.fgCanvas.width-dane.obiekty.mapa.w) {
					mario.x += mario.pedX;
				} else {
					dane.obiekty.mapa.x -= mario.pedX;
					for( var i = 0; i<dane.obiekty.tabelaScian.length; i++) {
						dane.obiekty.tabelaScian[i].x -= mario.pedX;
					}
					for( var i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
						dane.obiekty.tabelaPotworow[i].x -= mario.pedX;
					}
				}
			}
		}
		if(Wejscie.zadania.Nacisnieto(37)) {
			mario.kierunek = "lewo";
			
			if(mario.pedY == 0) {
				mario.obecnyStan = mario.stan.poruszanie;
			} else {
				if(mario.x > dane.canvas.fgCanvas.width/2 || dane.obiekty.mapa.x >= 0) {
					mario.x -= mario.pedX;
				} else {
					dane.obiekty.mapa.x += mario.pedX;
					for( var i = 0; i<dane.obiekty.tabelaScian.length; i++) {
						dane.obiekty.tabelaScian[i].x += mario.pedX;
					}
					for( var i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
						dane.obiekty.tabelaPotworow[i].x += mario.pedX;
					}
				}
			}
		}
		if(Wejscie.zadania.Nacisnieto(32)) {
			mario.obecnyStan = mario.stan.skakanie;
		}
	},
	
	zadania: {
		nacisniety: {},
		
		Nacisnieto: function(kod) {
			return Wejscie.zadania.nacisniety[kod];
		}
	}
}