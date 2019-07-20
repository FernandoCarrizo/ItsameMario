class Moneta {
  constructor(img, x, y, w, h) {
    this.obraz = new Obraz(img, 960, 256, 16, 16);
    this.animacja = {
      obrot: {
        klatka: [new Obraz(img, 960, 256, 16, 16),
                new Obraz(img, 976, 256, 16, 16),
                new Obraz(img, 992, 256, 16, 16),
                new Obraz(img, 1008, 256, 16, 16)],
        obecnaKlatka: 0
      }
    };
    this.stan = {
      obrot: {
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
    this.typ = "moneta";
  }
}
