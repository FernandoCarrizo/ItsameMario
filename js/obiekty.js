var Obiekty = {
	ini: function(dane) {
		var niebo = {
			obraz: new Obiekty.zadania.Obraz(dane.grafika, 0, 208, 960, 208),
			x: 0,
			y: 0,
			w: 2880,
			h: 624
		};
		
		var mapa = {
			obraz: new Obiekty.zadania.Obraz(dane.grafika, 0, 0, 1440, 208),
			x: 0,
			y: 0,
			w: 4320,
			h: 624
		};
		
		var mario = new Obiekty.zadania.Mario(dane.grafika,0,0,48,48);
		 
		var sciany = [[0,528,1104,96],[528,336,144,48],[576,144,48,48],[960,480,144,48],[1008,432,96,48],
								[1056,384,48,48],[1296,528,480,96],[1296,480,144,48],[1296,432,96,48],[1296,384,48,48],
								[1776,480,48,144],[1920,432,48,192],[2064,384,48,240],[2208,336,48,288],[2352,336,528,96],
								[2352,432,384,96],[2352,528,1968,96],[2256,96,144,48],[2544,96,48,48],[2736,96,48,48],[2928,96,48,48],
								[3120,144,48,48],[3024,336,48,48],[3216,336,48,48],[3504,480,288,48],[3552,432,240,48],[3600,384,192,48],
								[3648,336,144,48],[3696,288,96,48],[3744,240,48,48],[-48,0,48,624],[4320,0,48,624]];
								
		var potwory = [[912, 480],[1440, 480], [2880, 480]];
										
		dane.obiekty = {};
		dane.obiekty.niebo = niebo;
		dane.obiekty.mapa = mapa;
		dane.obiekty.mario = mario;		
		dane.obiekty.tabelaScian = [];
		dane.obiekty.tabelaPotworow = [];
		
		sciany.forEach(function(z) {
			dane.obiekty.tabelaScian.push(new Obiekty.zadania.Sciana(z[0],z[1],z[2],z[3]));
		});
		
		potwory.forEach(function(p) {
			dane.obiekty.tabelaPotworow.push(new Obiekty.zadania.Potwor(dane.grafika, p[0], p[1], 48, 48));
		});
	},
	
	zadania: {
		Obraz: function(img, x, y, w, h) {
			this.img = img;
			this.x =x;
			this.y = y;
			this.w = w;
			this.h = h;
		},
		
		Mario: function(img, x, y, w, h) {
			var wnetrze = this;
			
			this.obraz= new Obiekty.zadania.Obraz(img, 1056, 208, 16, 16);
			this.animacja = {
				poruszaniePrawo: {
					klatka: [new Obiekty.zadania.Obraz(img,976,208,16,16),
					new Obiekty.zadania.Obraz(img,960,208,16,16),
					new Obiekty.zadania.Obraz(img,976,208,16,16),
					new Obiekty.zadania.Obraz(img,992,208,16,16)],
					obecnaKlatka: 0
				},
				poruszanieLewo: {
					klatka: [new Obiekty.zadania.Obraz(img,976,224,16,16),
					new Obiekty.zadania.Obraz(img,960,224,16,16),
					new Obiekty.zadania.Obraz(img,976,224,16,16),
					new Obiekty.zadania.Obraz(img,992,224,16,16)],
					obecnaKlatka: 0
				},
				staniePrawo: new Obiekty.zadania.Obraz(img,1056,208,16,16),
				stanieLewo: new Obiekty.zadania.Obraz(img,1056,224,16,16),
				skokPrawo: new Obiekty.zadania.Obraz(img,1024,208,16,16),
				skokLewo: new Obiekty.zadania.Obraz(img,1024,224,16,16),
				smierc: new Obiekty.zadania.Obraz(img, 1040, 208, 16, 16)
			};
			this.stan = {
				stanie: {
					ruch: function(dane) {
						return;
					},
					animacja: function(dane) {
						if(wnetrze.kierunek==="prawo") {
							wnetrze.obraz = wnetrze.animacja.staniePrawo;
						} else {
							wnetrze.obraz = wnetrze.animacja.stanieLewo;
						}
					}
				},
				skakanie: {
					ruch: function(dane) {
						if(wnetrze.pedY==0) {
							wnetrze.pedY-=23.5;
						}
					},
					animacja: function(dane) {
						if(wnetrze.kierunek==="prawo") {
							wnetrze.obraz = wnetrze.animacja.skokPrawo;
						} else {
							wnetrze.obraz = wnetrze.animacja.skokLewo;
						}
					}
				},
				poruszanie: {
					ruch: function(dane) {
						if(wnetrze.kierunek==="prawo") {
							if(wnetrze.x < dane.canvas.fgCanvas.width/2 || dane.obiekty.mapa.x <= dane.canvas.fgCanvas.width-dane.obiekty.mapa.w) {
								wnetrze.x += wnetrze.pedX;
							} else {
								dane.obiekty.mapa.x -= wnetrze.pedX;
								for( var i = 0; i<dane.obiekty.tabelaScian.length; i++) {
									dane.obiekty.tabelaScian[i].x -= wnetrze.pedX;
								}
								for( var i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
									dane.obiekty.tabelaPotworow[i].x -= wnetrze.pedX;
								}
							}
						} else {
							if(wnetrze.x > dane.canvas.fgCanvas.width/2 || dane.obiekty.mapa.x >= 0) {
								wnetrze.x -= wnetrze.pedX;
							} else {
								dane.obiekty.mapa.x += wnetrze.pedX;
								for( var i = 0; i<dane.obiekty.tabelaScian.length; i++) {
									dane.obiekty.tabelaScian[i].x += wnetrze.pedX;
								}
								for( var i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
									dane.obiekty.tabelaPotworow[i].x += wnetrze.pedX;
								}
							}
						}
					},
					animacja: function(dane) {
						if(wnetrze.kierunek === "prawo") {
							if(dane.nrKlatki % 5 == 0) {
								wnetrze.obraz = wnetrze.animacja.poruszaniePrawo.klatka[wnetrze.animacja.poruszaniePrawo.obecnaKlatka];
								wnetrze.animacja.poruszaniePrawo.obecnaKlatka++;
							}
							
							if(wnetrze.animacja.poruszaniePrawo.obecnaKlatka>3) {
								wnetrze.animacja.poruszaniePrawo.obecnaKlatka=0;
							}
						} else {
							if(dane.nrKlatki % 5 == 0) {
								wnetrze.obraz = wnetrze.animacja.poruszanieLewo.klatka[wnetrze.animacja.poruszanieLewo.obecnaKlatka];
								wnetrze.animacja.poruszanieLewo.obecnaKlatka++;
							}
							
							if(wnetrze.animacja.poruszanieLewo.obecnaKlatka>3) {
								wnetrze.animacja.poruszanieLewo.obecnaKlatka=0;
							}
						}
					}
				},
				smierc: {
					ruch: function(dane) {
						wnetrze.pedX = 0;
					}, 
					animacja: function(dane) {
						wnetrze.obraz = wnetrze.animacja.smierc;
					}
				}
			};
			this.obecnyStan = wnetrze.stan.stanie;
			this.kierunek = "prawo";
			this.x =x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.pedY = 1;
			this.pedX = 8;
			this.zycia = 3;
			this.momentSmierci = false;
		},
		
		Potwor: function(img, x, y, w, h) {
			var wnetrze = this;
			
			this.obraz = new Obiekty.zadania.Obraz(img, 960, 240, 16, 16);
			this.animacja = {
				poruszanie: {
					klatka: [new Obiekty.zadania.Obraz(img, 960, 240, 16, 16),
								new Obiekty.zadania.Obraz(img, 976, 240, 16, 16),
								new Obiekty.zadania.Obraz(img, 992, 240, 16, 16),
								new Obiekty.zadania.Obraz(img, 1008, 240, 16, 16)],
					obecnaKlatka: 0
				},
				skok: new Obiekty.zadania.Obraz(img, 960, 240, 16, 16)
			};
			this.stan = {
				poruszanie: {
					ruch: function(dane) {
						if(wnetrze.kierunek === "prawo") {
							wnetrze.x += wnetrze.pedX;
						} else {
							wnetrze.x -= wnetrze.pedX;
						}
					},
					animacja: function(dane) {
						if(dane.nrKlatki % 5 == 0) {
							wnetrze.obraz = wnetrze.animacja.poruszanie.klatka[wnetrze.animacja.poruszanie.obecnaKlatka];
							wnetrze.animacja.poruszanie.obecnaKlatka++;
						}
						
						if(wnetrze.animacja.poruszanie.obecnaKlatka > 3) {
							wnetrze.animacja.poruszanie.obecnaKlatka = 0;
						}
					}
				},
				skakanie: {
					ruch: function(dane) {
						return;
					},
					animacja: function(dane) {
						wnetrze.obraz = wnetrze.animacja.skok;
					}
				}
			};
			this.obecnyStan = wnetrze.stan.poruszanie;
			this.kierunek = "prawo";
			this.pedY = 0;
			this.pedX = 1;
			this.typ = "potwor";
			this.x =x;
			this.y = y;
			this.w = w;
			this.h = h;
		},
		
		Sciana: function(x,y,w,h) {
			this.x =x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.typ = "sciana";
		}
	}
}