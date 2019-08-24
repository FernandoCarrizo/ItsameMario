class Mario {
	constructor(img, x, y, w, h) {
		this.obraz= new Obraz(img,3504,64,16,16);
		this.animacja = {
			poruszaniePrawo: {
				klatka: [new Obraz(img,3424,64,16,16),
				new Obraz(img,3408,64,16,16),
				new Obraz(img,3424,64,16,16),
				new Obraz(img,3440,64,16,16)],
				obecnaKlatka: 0
			},
			poruszanieLewo: {
				klatka: [new Obraz(img,3424,80,16,16),
				new Obraz(img,3408,80,16,16),
				new Obraz(img,3424,80,16,16),
				new Obraz(img,3440,80,16,16)],
				obecnaKlatka: 0
			},
			staniePrawo: new Obraz(img,3504,64,16,16),
			stanieLewo: new Obraz(img,3504,80,16,16),
			skokPrawo: new Obraz(img,3472,64,16,16),
			skokLewo: new Obraz(img,3472,80,16,16),
			smierc: new Obraz(img, 3488, 64, 16, 16)
		};
		this.animacjaDuzy = {
			poruszaniePrawo: {
				klatka: [new Obraz(img,3424,0,16,32),
								 new Obraz(img,3408,0,16,32),
								 new Obraz(img,3424,0,16,32),
								 new Obraz(img,3440,0,16,32)],
				obecnaKlatka: 0
			},
			poruszanieLewo: {
				klatka: [new Obraz(img,3520,0,16,32),
								 new Obraz(img,3504,0,16,32),
								 new Obraz(img,3520,0,16,32),
								 new Obraz(img,3536,0,16,32)],
				obecnaKlatka: 0
			},
			miganiePrawo: {
				klatka: [new Obraz(img,3488,0,16,32),
								 new Obraz(img,3520,64,16,32)],
				obecnaKlatka: 0
			},
			miganieLewo: {
				klatka: [new Obraz(img,3584,0,16,32),
								 new Obraz(img,3520,64,16,32)],
				obecnaKlatka: 0
			},
			staniePrawo: new Obraz(img,3488,0,16,32),
			stanieLewo: new Obraz(img,3584,0,16,32),
			skokPrawo: new Obraz(img,3472,0,16,32),
			skokLewo: new Obraz(img,3568,0,16,32),
		};
		this.animacjaStrzelanie = {
			poruszaniePrawo: {
				klatka: [new Obraz(img,3424,32,16,32),
								 new Obraz(img,3408,32,16,32),
								 new Obraz(img,3424,32,16,32),
								 new Obraz(img,3440,32,16,32)],
				obecnaKlatka: 0
			},
			poruszanieLewo: {
				klatka: [new Obraz(img,3520,32,16,32),
								 new Obraz(img,3504,32,16,32),
								 new Obraz(img,3520,32,16,32),
								 new Obraz(img,3536,32,16,32)],
				obecnaKlatka: 0
			},
			miganiePrawo: {
				klatka: [new Obraz(img,3488,32,16,32),
								 new Obraz(img,3520,64,16,32)],
				obecnaKlatka: 0
			},
			miganieLewo: {
				klatka: [new Obraz(img,3584,32,16,32),
								 new Obraz(img,3520,64,16,32)],
				obecnaKlatka: 0
			},
			staniePrawo: new Obraz(img,3488,32,16,32),
			stanieLewo: new Obraz(img,3584,32,16,32),
			skokPrawo: new Obraz(img,3472,32,16,32),
			skokLewo: new Obraz(img,3568,32,16,32),
		};
		this.stan = {
			stanie: {
				ruch: (dane) => {
					return;
				},
				animacja: (dane) => {
					let animacja = this.animacja;
					if(this.mozeStrzelac) {
						animacja = this.animacjaStrzelanie;
						this.h = 2 * h - 1;
					} else if(this.mozeNiszczyc) {
						animacja = this.animacjaDuzy;
						this.h = 2 * h - 1;
					} else {
						this.h = h;
					}
					if(this.kierunek==="prawo") {
						this.obraz = animacja.staniePrawo;
					} else {
						this.obraz = animacja.stanieLewo;
					}
				}
			},
			skakanie: {
				ruch: (dane) => {
					if(this.pedY==0) {
						this.pedY-=23.5;
					}

					this.kontrolerRuchu(dane);
				},
				animacja: (dane) => {
					let animacja = this.animacja;
					if(this.mozeStrzelac) {
						animacja = this.animacjaStrzelanie;
						this.h = 2 * h - 1;
					} else if(this.mozeNiszczyc) {
						animacja = this.animacjaDuzy;
						this.h = 2 * h - 1;
					} else {
						this.h = h;
					}
					if(this.kierunek==="prawo") {
						this.obraz = animacja.skokPrawo;
					} else {
						this.obraz = animacja.skokLewo;
					}
				}
			},
			poruszanie: {
				ruch: (dane) => {
					this.kontrolerRuchu(dane);
				},
				animacja: (dane) => {
					let animacja = this.animacja;
					if(this.mozeStrzelac) {
						animacja = this.animacjaStrzelanie;
						this.h = 2 * h - 1;
					} else if(this.mozeNiszczyc) {
						animacja = this.animacjaDuzy;
						this.h = 2 * h - 1;
					} else {
						this.h = h;
					}
					if(this.kierunek === "prawo") {
						if(dane.nrKlatki % 5 == 0) {
							this.obraz = animacja.poruszaniePrawo.klatka[animacja.poruszaniePrawo.obecnaKlatka];
							animacja.poruszaniePrawo.obecnaKlatka++;
						}

						if(animacja.poruszaniePrawo.obecnaKlatka>3) {
							animacja.poruszaniePrawo.obecnaKlatka=0;
						}
					} else {
						if(dane.nrKlatki % 5 == 0) {
							this.obraz = animacja.poruszanieLewo.klatka[animacja.poruszanieLewo.obecnaKlatka];
							animacja.poruszanieLewo.obecnaKlatka++;
						}

						if(animacja.poruszanieLewo.obecnaKlatka>3) {
							animacja.poruszanieLewo.obecnaKlatka=0;
						}
					}
				}
			},
			miganie: {
				licznik: 0,
				ruch: (dane) => {
					this.pedX = 0;
					this.pedY = 0;
				},
				animacja: (dane) => {
					let animacja = this.animacja;
					if(this.mozeStrzelac) {
						animacja = this.animacjaStrzelanie;
					} else if(this.mozeNiszczyc) {
						animacja = this.animacjaDuzy;
					}
					if(this.kierunek == "prawo") {
						if(dane.nrKlatki % 5 == 0) {
							this.obraz = animacja.miganiePrawo.klatka[animacja.miganiePrawo.obecnaKlatka];
							animacja.miganiePrawo.obecnaKlatka++;
						}

						if(animacja.miganiePrawo.obecnaKlatka>1) {
							animacja.miganiePrawo.obecnaKlatka=0;
						}
					} else {
						if(dane.nrKlatki % 5 == 0) {
							this.obraz = animacja.miganieLewo.klatka[animacja.miganieLewo.obecnaKlatka];
							animacja.miganieLewo.obecnaKlatka++;
						}

						if(animacja.miganieLewo.obecnaKlatka>1) {
							animacja.miganieLewo.obecnaKlatka=0;
						}
					}
				}
			},
			smierc: {
				ruch: (dane) => {
					this.pedX = 0;
				},
				animacja: (dane) => {
					this.h = h;
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
		this.mozeNiszczyc = false;
		this.mozeStrzelac = false;
		this.naladowany = true;
		this.momentSmierci = false;
		this.monety = 0;
		this.typ = "mario";
	}

	kontrolerRuchu(dane) {
		if(((this.x - this.pedX <= dane.canvas.fgCtx.canvas.width/2 || dane.obiekty.mapa.x - this.pedX < dane.canvas.fgCtx.canvas.width - dane.obiekty.mapa.w) && this.kierunek === "prawo") || ((this.x - this.pedX > dane.canvas.fgCtx.canvas.width/2 || dane.obiekty.mapa.x - this.pedX >= 0) && this.kierunek === "lewo")) {
			this.x += this.pedX;
		} else {
			dane.obiekty.mapa.x -= this.pedX;
			for( var i = 0; i<dane.obiekty.tabelaScian.length; i++) {
				dane.obiekty.tabelaScian[i].x -= this.pedX;
			}
			for( var i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
				dane.obiekty.tabelaPotworow[i].x -= this.pedX;
			}
			for( var i = 0; i<dane.obiekty.tabelaMonet.length; i++) {
				dane.obiekty.tabelaMonet[i].x -= this.pedX;
			}
			for( let i = 0; i<dane.obiekty.tabelaBloczkowMonet.length; i++) {
				dane.obiekty.tabelaBloczkowMonet[i].moneta.x -= this.pedX;
				dane.obiekty.tabelaBloczkowMonet[i].x -= this.pedX;
			}
			for( var i = 0; i<dane.obiekty.tabelaPlatform.length; i++) {
				dane.obiekty.tabelaPlatform[i].x -= this.pedX;
			}
			for( var i = 0; i<dane.obiekty.tabelaBloczkowCegiel.length; i++) {
				dane.obiekty.tabelaBloczkowCegiel[i].x -= this.pedX;
			}
			for( var i = 0; i<dane.obiekty.tabelaFragmentowCegiel.length; i++) {
				dane.obiekty.tabelaFragmentowCegiel[i].x -= this.pedX;
			}
			for( var i = 0; i<dane.obiekty.tabelaBloczkowGrzybow.length; i++) {
				dane.obiekty.tabelaBloczkowGrzybow[i].x -= this.pedX;
			}
			for( var i = 0; i<dane.obiekty.tabelaGrzybow.length; i++) {
				dane.obiekty.tabelaGrzybow[i].x -= this.pedX;
			}
			for( var i = 0; i<dane.obiekty.tabelaPociskow.length; i++) {
				dane.obiekty.tabelaPociskow[i].x -= this.pedX;
			}
		}
	}
}
