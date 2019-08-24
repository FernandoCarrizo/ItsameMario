class Pocisk {
  constructor(img, x, y, w, h, p) {
    this.obraz = new Obraz(img, 3408, 176, 8, 8);
    this.animacja = {
      obrot: {
        klatka: [new Obraz(img, 3408, 176, 8, 8),
                new Obraz(img, 3416, 176, 8, 8),
                new Obraz(img, 3408, 184, 8, 8),
                new Obraz(img, 3416, 184, 8, 8)],
        obecnaKlatka: 0
      },
      wybuch: {
        klatka: [new Obraz(img, 3424, 176, 16, 16),
                new Obraz(img, 3440, 176, 16, 16),
                new Obraz(img, 3456, 176, 16, 16),
                new Obraz(img, 3472, 176, 16, 16)],
        obecnaKlatka: 0
      },
    };
    this.stan = {
      wybuch: {
        ruch: (dane) => {
          //this.x += this.pedX;

        },
        animacja: (dane) => {
          this.w = 2 * w;
          this.h = 2 * h;
          if(dane.nrKlatki % 5 == 0) {
            this.obraz = this.animacja.wybuch.klatka[this.animacja.wybuch.obecnaKlatka];
            this.animacja.wybuch.obecnaKlatka++;
          }

          if(this.animacja.wybuch.obecnaKlatka > 3) {
            let nrPocisku = dane.obiekty.tabelaPociskow.indexOf(this);
            dane.obiekty.tabelaPociskow.splice(nrPocisku, 1);
          }
        }
      },
      obrot: {
        licznik: 0,
        ruch: (dane) => {
          this.x += this.pedX;
          if(this.y > dane.obiekty.mapa.h) {
            if(this.y > dane.obiekty.mapa.h) {
  						let nrPocisku = dane.obiekty.tabelaPociskow.indexOf(this);
  						dane.obiekty.tabelaPociskow.splice(nrPocisku, 1);
  					}
          }
        },
        animacja: (dane) => {
          if(dane.nrKlatki % 5 == 0) {
            this.obraz = this.animacja.obrot.klatka[this.animacja.obrot.obecnaKlatka];
            this.animacja.obrot.obecnaKlatka++;
          }

          if(this.animacja.obrot.obecnaKlatka > 3) {
            this.animacja.obrot.obecnaKlatka = 0;
          }
        }
      }
    };
    this.obecnyStan = this.stan.obrot;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.pedX = p;
    this.pedY = 0;
    this.typ = "pocisk";
  }
}
