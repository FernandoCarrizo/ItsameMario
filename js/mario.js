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
				klatka: [new  Obraz(img,976,224,16,16),
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
					if(this.kierunek === "prawo") {
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
					}
					
					if(((this.x - this.pedX <= dane.canvas.fgCtx.canvas.width/2 || dane.obiekty.mapa.x - this.pedX < dane.canvas.fgCtx.canvas.width - dane.obiekty.mapa.w) && this.kierunek === "prawo") || ((this.x - this.pedX > dane.canvas.fgCtx.canvas.width/2 || dane.obiekty.mapa.x - this.pedX >= 0) && this.kierunek === "lewo")) {
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
						for( let i = 0; i<dane.obiekty.tabelaBloczkowMonet.length; i++) {
							dane.obiekty.tabelaBloczkowMonet[i].moneta.x -= this.pedX;
							dane.obiekty.tabelaBloczkowMonet[i].x -= this.pedX;
						}
					}					
				},
				animacja: (dane) => {
					if(this.kierunek === "prawo") {
						this.obraz = this.animacja.skokPrawo;	
					} else {
						this.obraz = this.animacja.skokLewo;
					}
				}
			},
			poruszanie: {
				ruch: (dane) => {
					if(((this.x - this.pedX <= dane.canvas.fgCtx.canvas.width/2 || dane.obiekty.mapa.x - this.pedX < dane.canvas.fgCtx.canvas.width - dane.obiekty.mapa.w) && this.kierunek === "prawo") || ((this.x - this.pedX > dane.canvas.fgCtx.canvas.width/2 || dane.obiekty.mapa.x - this.pedX >= 0) && this.kierunek === "lewo")) {
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
						for( let i = 0; i<dane.obiekty.tabelaBloczkowMonet.length; i++) {
							dane.obiekty.tabelaBloczkowMonet[i].moneta.x -= this.pedX;
							dane.obiekty.tabelaBloczkowMonet[i].x -= this.pedX;
						}
					}	
				},
				animacja: (dane) => {
					if(this.kierunek === "prawo") {						
						var typPoruszanie = this.animacja.poruszaniePrawo;
						if(dane.nrKlatki % 5 == 0) {
							this.obraz = typPoruszanie.klatka[typPoruszanie.obecnaKlatka];
							typPoruszanie.obecnaKlatka++;
						}
						
						if(typPoruszanie.obecnaKlatka>3) {
							typPoruszanie.obecnaKlatka=0;
						}											
					} else {
						var typPoruszanie = this.animacja.poruszanieLewo;
						if(dane.nrKlatki % 5 == 0) {
							this.obraz = typPoruszanie.klatka[typPoruszanie.obecnaKlatka];
							typPoruszanie.obecnaKlatka++;
						}
						
						if(typPoruszanie.obecnaKlatka>3) {
							typPoruszanie.obecnaKlatka=0;
						}
					}
				}
			},
			smierc: {
				ruch: (dane) => {
					this.pedX = 0;
				},
				animacja: (dane) => {
					this.obraz = this.animacja.smierc;
				}
			}
		};
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.pedY = 1;
		this.pedX = 0;
		this.zycia = 3;
		this.monety = 0;
		this.typ = "mario";
		this.kierunek = "prawo";
		this.momentSmierci = false;
		this.obecnyStan = this.stan.stanie;
	}
};