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
								[3648,336,144,48],[3696,288,96,48],[3744,240,48,48]];
		
		dane.obiekty = {};
		dane.obiekty.niebo = niebo;
		dane.obiekty.mapa = mapa;
		dane.obiekty.mario = mario;		
		dane.obiekty.tabelaScian = [];
		
		sciany.forEach(function(z) {
			dane.obiekty.tabelaScian.push(new Obiekty.zadania.Sciana(z[0],z[1],z[2],z[3]));
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
			this.obraz= new Obiekty.zadania.Obraz(img, 1056, 208, 16, 16);
			this.x =x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.pedY = 1;
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