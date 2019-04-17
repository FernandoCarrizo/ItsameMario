class Wejscie {
	constructor(dane) {
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
		
		if(this.nacisnieto(39) && !mario.momentSmierci) {
			mario.kierunek = "prawo";
			if(mario.pedX < 10) {
				mario.pedX+=1;
			}
			
			if(mario.pedY == 0) {
				mario.obecnyStan = mario.stan.poruszanie;
			} else {
				mario.obecnyStan = mario.stan.skakanie;
			}
		} 
		else if(mario.pedX > 0 && !mario.momentSmierci) {
			if(mario.obecnyStan != mario.stan.skakanie) mario.obecnyStan = mario.stan.poruszanie;
			mario.pedX-=1;
		}
		
		
		if(this.nacisnieto(37) && !mario.momentSmierci) {
			mario.kierunek = "lewo";
			if(mario.pedX > -10) {
				mario.pedX-=1;
			}
			
			if(mario.pedY == 0) {
				mario.obecnyStan = mario.stan.poruszanie;
			} else {
				mario.obecnyStan = mario.stan.skakanie;
			}
		} 
		else if(mario.pedX < 0 && !mario.momentSmierci) {
			if(mario.obecnyStan != mario.stan.skakanie) mario.obecnyStan = mario.stan.poruszanie;
			mario.pedX+=1;
		}
		
		if(this.nacisnieto(32)) {
			if(!mario.momentSmierci) mario.obecnyStan = mario.stan.skakanie;      
		}
	}
	
	nacisnieto(kod) {
		return this.nacisniety[kod];
	}
};