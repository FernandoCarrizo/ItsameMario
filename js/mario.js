class Mario {
	constructor(img, x, y, w, h) {
		this.obraz= new Obraz(img, 1056, 208, 16, 16);
		this.animacja = {
			poruszaniePrawo: {
				klatka: [new Obraz(img,976,208,16,16),
						new Obraz(img,960,208,16,16),
						new Obraz(img,976,208,16,16),
						new Obraz(img,992,208,16,16)],
				obecnaKlatka: 0
			},
			poruszanieLewo: {
				klatka: [new Obraz(img,976,224,16,16),
						new Obraz(img,960,224,16,16),
						new Obraz(img,976,224,16,16),
						new Obraz(img,992,224,16,16)],
				obecnaKlatka: 0
			},
			staniePrawo: new Obraz(img,1056,208,16,16),
			stanieLewo: new Obraz(img,1056,224,16,16),
			skokPrawo: new Obraz(img,1024,208,16,16),
			skokLewo: new Obraz(img,1024,224,16,16),
			smierc: new Obraz(img, 1040, 208, 16, 16)
		};
		this.stan = {
			stanie: {
				ruch: (dane) => {},
				animacja: (dane) => {
					if(this.kierunek==="prawo") {
						this.obraz = this.animacja.staniePrawo;
					} else {
						this.obraz = this.animacja.stanieLewo;
					}
				}
			},
			skakanie: {
				ruch: (dane) => {
					if(this.pedY==0) {
						this.pedY-=23.5;
		  
						// dane.audio.skok.pause();
						// dane.audio.skok.currentTime = 0;
						// dane.audio.skok.play();
					}
				},
				animacja: (dane) => {
					if(this.kierunek==="prawo") {
						this.obraz = this.animacja.skokPrawo;
					} else {
						this.obraz = this.animacja.skokLewo;
					}
				}
			},
			poruszanie: {
				ruch: (dane) => {
					if(this.kierunek==="prawo") {
						if(this.x < dane.canvas.fgCtx.canvas.width/2 || dane.obiekty.mapa.x <= dane.canvas.fgCtx.canvas.width-dane.obiekty.mapa.w) {
							this.x += this.pedX;
						} else {
							dane.obiekty.mapa.x -= this.pedX;
							for( let i = 0; i<dane.obiekty.tabelaScian.length; i++) {
								dane.obiekty.tabelaScian[i].x -= this.pedX;
							}
							for( let i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
								dane.obiekty.tabelaPotworow[i].x -= this.pedX;
							}
							for( let i = 0; i<dane.obiekty.tabelaMonet.length; i++) {
								dane.obiekty.tabelaMonet[i].x -= this.pedX;
							}
						}
					} else {
						if(this.x > dane.canvas.fgCtx.canvas.width/2 || dane.obiekty.mapa.x >= 0) {
							this.x -= this.pedX;
						} else {
							dane.obiekty.mapa.x += this.pedX;
							for( let i = 0; i<dane.obiekty.tabelaScian.length; i++) {
								dane.obiekty.tabelaScian[i].x += this.pedX;
							}
							for( let i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
								dane.obiekty.tabelaPotworow[i].x += this.pedX;
							}
							for( let i = 0; i<dane.obiekty.tabelaMonet.length; i++) {
								dane.obiekty.tabelaMonet[i].x += this.pedX;
							}
			
						}
					}
				},
				animacja:  (dane) => {
					if(this.kierunek === "prawo") {
						if(dane.nrKlatki % 5 == 0) {
							this.obraz = this.animacja.poruszaniePrawo.klatka[this.animacja.poruszaniePrawo.obecnaKlatka];
							this.animacja.poruszaniePrawo.obecnaKlatka++;
						}
						
						if(this.animacja.poruszaniePrawo.obecnaKlatka>3) {
							this.animacja.poruszaniePrawo.obecnaKlatka=0;
						}
					} else {
						if(dane.nrKlatki % 5 == 0) {
							this.obraz = this.animacja.poruszanieLewo.klatka[this.animacja.poruszanieLewo.obecnaKlatka];
							this.animacja.poruszanieLewo.obecnaKlatka++;
						}
						
						if(this.animacja.poruszanieLewo.obecnaKlatka>3) {
							this.animacja.poruszanieLewo.obecnaKlatka=0;
						}
					}
				}
			},
			smierc: {
				ruch:  (dane) => {
					this.pedX = 0;
				},
				animacja:  (dane) => {
					this.obraz = this.animacja.smierc;
				}
			}
		};
		this.obecnyStan = this.stan.stanie;
		this.kierunek = "prawo";
		this.x =x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.pedY = 1;
		this.pedX = 8;
		this.zycia = 3;
		this.momentSmierci = false;
		this.monety = 0;
		this.typ = "mario";
	}
}