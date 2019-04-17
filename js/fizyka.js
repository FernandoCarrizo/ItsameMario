class Fizyka {
	constructor() {}
	
	aktualizacja(dane) {
		this.grawitacja(dane.obiekty.mario);
		dane.obiekty.tabelaPotworow.forEach((p) => {
			this.grawitacja(p);
		});
		
		this.wykrywanieKolizji(dane);
		
		this.smierc(dane);
	}
	
	grawitacja(obiekt) {
		if(obiekt.typ=="mario" && !obiekt.momentSmierci) obiekt.obecnyStan = obiekt.stan.skakanie;
		obiekt.pedY+=1;
		obiekt.y+=obiekt.pedY;
	}
	
	wykrywanieKolizji(dane) {
		let WykrywanieKolizji = (obiekt1, obiekt2) => {
			if( obiekt1.x < obiekt2.x + obiekt2.w &&
				obiekt1.x + obiekt1.w > obiekt2.x &&
				obiekt1.y < obiekt2.y + obiekt2.h &&
				obiekt1.y + obiekt1.h > obiekt2.y) {
					this.kolizja(obiekt1, obiekt2, dane);
			}
		};
		
		let mario = dane.obiekty.mario;
		
		if(!mario.momentSmierci) {	
			dane.obiekty.tabelaScian.forEach((sciana) => {	
				WykrywanieKolizji(mario, sciana);
			});	
									
			dane.obiekty.tabelaMonet.forEach((moneta) => {
				WykrywanieKolizji(mario, moneta);
			});
		}	
		
		dane.obiekty.tabelaPotworow.forEach((potwor) => {
			if(!mario.momentSmierci) WykrywanieKolizji(mario, potwor);
			
			dane.obiekty.tabelaScian.forEach((sciana) => {
				WykrywanieKolizji(potwor, sciana);
			});		
		});	
					
	}
	
	kolizja(obiekt1, obiekt2, dane) {
		if(obiekt1.typ === "mario") {
			let mario = obiekt1;
			if(obiekt2.typ === "sciana") {
				let stronaKolizji = this.stronaKolizji(obiekt1, obiekt2);
				
				if(stronaKolizji[0]) {
					mario.obecnyStan = mario.stan.stanie;
					mario.y = obiekt2.y - mario.h;
					mario.pedY = 0;
				}
				if(stronaKolizji[2]) {
					mario.y = obiekt2.y + obiekt2.h - 1;
					if(mario.pedY < 0) mario.pedY = 1;
				}
				if(stronaKolizji[3]) {
					mario.x = obiekt2.x - mario.w;
					mario.pedX = 0;
				}
				if(stronaKolizji[1]) {
					mario.x = obiekt2.x + obiekt2.w;
					mario.pedX = 0;
				}
			} else if(obiekt2.typ === "potwor") {
				let stronaKolizji = this.stronaKolizji(mario, obiekt2);
				
				if(stronaKolizji[0]) {
					let nrPotwora = dane.obiekty.tabelaPotworow.indexOf(obiekt2);
					dane.obiekty.tabelaPotworow.splice(nrPotwora, 1);
					mario.obecnyStan = mario.stan.skakanie;
					mario.pedY = -20.5;
				}				
				if(stronaKolizji[1] || stronaKolizji[3] || stronaKolizji[2]) {
					mario.obecnyStan = mario.stan.smierc;
					mario.pedY = -20.5;
					mario.momentSmierci = true;
					setTimeout(() => {
						dane.kontroler.smierc.strataZycia(dane);
					}, 750);				
				}
			}
			else if(obiekt2.typ === "moneta") {
				let nrMonety = dane.obiekty.tabelaMonet.indexOf(obiekt2);
				dane.obiekty.tabelaMonet.splice(nrMonety, 1);
				mario.monety++;
			}
		} else if(obiekt1.typ === "potwor") {
			if(obiekt2.typ === "sciana") {
				let stronaKolizji = this.stronaKolizji(obiekt1, obiekt2);
								
				if(stronaKolizji[0]) {
					obiekt1.obecnyStan = obiekt1.stan.poruszanie;
					obiekt1.y = obiekt2.y - obiekt1.h;
					obiekt1.pedY = 0;
				}				
				if(stronaKolizji[1]) {
					obiekt1.x = obiekt2.x + obiekt2.w;
					obiekt1.pedX = 2;
				}					
				if(stronaKolizji[3]) {
					obiekt1.x = obiekt2.x - obiekt1.w;
					obiekt1.pedX = -2;
				}
			}
		}
	}
	
	stronaKolizji(obiekt1, obiekt2) {	
		let maksymalnaOdlegloscX = obiekt1.w/2 + obiekt2.w/2,
			maksymalnaOdlegloscY = obiekt1.h/2 + obiekt2.h/2;
						
		let katLewyGorny = Math.atan2(maksymalnaOdlegloscY, maksymalnaOdlegloscX) * 180 / Math.PI,
			katPrawyGorny = 180 - katLewyGorny;				
		
		let odlegloscX = (obiekt2.x + obiekt2.w/2) - (obiekt1.x + obiekt1.w/2 ),
			odlegloscY = (obiekt2.y + obiekt2.h/2) - (obiekt1.y + obiekt1.h/2 - obiekt1.pedY);
						
		let katObiektow = Math.atan2(odlegloscY, odlegloscX) * 180 / Math.PI;
				
		let stronaKolizji = [false, false, false, false];
		if(katObiektow > katLewyGorny && katObiektow < katPrawyGorny) { // gora
			stronaKolizji[0] = true;
		} else if(katObiektow > katPrawyGorny || katObiektow < -katPrawyGorny) { // prawo
			stronaKolizji[1] = true;
		} else if(katObiektow > -katPrawyGorny && katObiektow < -katLewyGorny) { // doł
			stronaKolizji[2] = true;
		} else if(katObiektow > -katLewyGorny && katObiektow < katLewyGorny) { // lewo
			stronaKolizji[3] = true;
		}
				
		return stronaKolizji;
	}
	
	smierc(dane) {
		if(dane.obiekty.mario.y > 624) {		
			dane.obiekty.mario.momentSmierci = true;
			dane.kontroler.smierc.strataZycia(dane);	
		}
	}
}