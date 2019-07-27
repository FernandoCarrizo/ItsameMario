class Obiekty {
  constructor(dane) {
    let niebo = {
			obraz: new Obraz(dane.grafika, 0, 208, 960, 208),
			x: 0,
			y: 0,
			w: 2880,
			h: 624
		};

		let mapa = {
			obraz: new Obraz(dane.grafika, 0, 0, 1440, 208),
			x: 0,
			y: 0,
			w: 4320,
			h: 624
		};

		let mario = new Mario(dane.grafika,0,0,48,48);

		let sciany = [[0,528,1056,96],[528,336,144,48],[576,144,48,48],[960,480,48,48],[1008,432,48,96],
								[1056,384,48,240],[1344,528,480,96],[1296,384,48,240],[1344,432,48,96],[1392,480,48,48],
								[1776,480,48,144],[1920,432,48,192],[2064,384,48,240],[2208,336,48,288],[2352,336,528,96],
								[2352,432,384,96],[2352,528,1968,96],[2256,96,144,48],[2544,96,48,48],[2736,96,48,48],[2928,96,48,48],
								[3120,144,48,48],[3024,336,48,48],[3216,336,48,48],[3504,480,48,48],[3552,432,48,96],[3600,384,48,144],
								[3648,336,48,192],[3696,288,48,240],[3744,240,48,288],[-48,0,48,624],[4320,0,48,624]];;

		let potwory = [[912, 480],[1440, 480], [2880, 480]];

    let monety = [[528,240],[576,240],[624,240]];

		dane.obiekty = {};
		dane.obiekty.niebo = niebo;
		dane.obiekty.mapa = mapa;
		dane.obiekty.mario = mario;
		dane.obiekty.tabelaScian = [];
		dane.obiekty.tabelaPotworow = [];
    dane.obiekty.tabelaMonet = [];

		sciany.forEach(function(z) {
			dane.obiekty.tabelaScian.push(new Sciana(z[0],z[1],z[2],z[3]));
		});

		potwory.forEach(function(p) {
			dane.obiekty.tabelaPotworow.push(new Potwor(dane.grafika, p[0], p[1], 48, 48));
		});

		monety.forEach(function(m) {
			dane.obiekty.tabelaMonet.push(new Moneta(dane.grafika, m[0], m[1], 48, 48));
		});
  }
}
