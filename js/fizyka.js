class Fizyka {
  aktualizacja(dane) {
    this.grawitacja(dane.obiekty.mario);

		dane.obiekty.tabelaPotworow.forEach((p) => {
			this.grawitacja(p);
		});

    dane.obiekty.tabelaFragmentowCegiel.forEach((fc) => {
      this.grawitacja(fc);
    });

		this.wykrywanieKolizji(dane);
		this.smierc(dane);
  }

  grawitacja(obiekt) {
    if(obiekt.typ === "mario" && !obiekt.momentSmierci) {
      obiekt.obecnyStan = obiekt.stan.skakanie;
    }
    obiekt.pedY+=1;
    obiekt.y+=obiekt.pedY;
  }

  smierc(dane) {
    if(dane.obiekty.mario.y > 624) {
      dane.obiekty.mario.momentSmierci = true;
      dane.kontroler.smierc.strataZycia(dane);
    }
  }

  wykrywanieKolizji(dane) {
    let wykrywanieKolizji = (obiekt1, obiekt2) => {
      if(obiekt1.x < obiekt2.x + obiekt2.w &&
          obiekt1.x + obiekt1.w > obiekt2.x &&
          obiekt1.y < obiekt2.y + obiekt2.h &&
          obiekt1.y + obiekt1.h > obiekt2.y) {
          this.kolizja(obiekt1, obiekt2, dane);
      }
    };

    let mario = dane.obiekty.mario;
    if(!mario.momentSmierci) {
      dane.obiekty.tabelaScian.forEach((sciana) => {
				wykrywanieKolizji(mario, sciana);
			});

      dane.obiekty.tabelaMonet.forEach((moneta) => {
				wykrywanieKolizji(mario, moneta);
			});

      dane.obiekty.tabelaBloczkowMonet.forEach((bloczekMonet) => {
        wykrywanieKolizji(mario, bloczekMonet);
      });

      dane.obiekty.tabelaPlatform.forEach((platforma) => {
        wykrywanieKolizji(mario, platforma);
      });

      dane.obiekty.tabelaBloczkowCegiel.forEach((bloczekCegiel) => {
        wykrywanieKolizji(mario, bloczekCegiel);
      });
    }

    dane.obiekty.tabelaPotworow.forEach((potwor) => {
      if(!mario.momentSmierci) wykrywanieKolizji(mario, potwor);

      dane.obiekty.tabelaScian.forEach((sciana) => {
				wykrywanieKolizji(potwor, sciana);
			});

      dane.obiekty.tabelaBloczkowMonet.forEach((bloczekMonet) => {
				wykrywanieKolizji(potwor, bloczekMonet);
			});

      dane.obiekty.tabelaPlatform.forEach((platforma) => {
        wykrywanieKolizji(potwor, platforma);
      });

      dane.obiekty.tabelaBloczkowCegiel.forEach((bloczekCegiel) => {
        wykrywanieKolizji(potwor, bloczekCegiel);
      });
    });
  }

  kolizja(obiekt1, obiekt2, dane) {
    let stronaKolizji = this.stronaKolizji(obiekt1, obiekt2);
    if(obiekt1.typ === "mario") {
      let mario = obiekt1;
      if(obiekt2.typ === "sciana" || obiekt2.typ === "bloczekMonet" || obiekt2.typ === "platforma" || obiekt2.typ === "bloczekCegiel") {
        if(stronaKolizji[0]) {
          mario.obecnyStan = mario.stan.stanie;
          mario.y = obiekt2.y - mario.h;
          mario.pedY = 0;
          if(obiekt2.typ === "platforma") {
            mario.pedX = obiekt2.pedX;
            mario.kontrolerRuchu(dane);
          }
        }
        if(stronaKolizji[2]) {
          mario.y = obiekt2.y + obiekt2.h - 1;
          if(mario.pedY < 0) mario.pedY = 1;
          if(obiekt2.typ === "bloczekMonet") {
            obiekt2.obecnyStan = obiekt2.stan.drganie;
            obiekt2.obecnyStan.licznik = 0;
            obiekt2.y = obiekt2.sy;
            obiekt2.moneta.y = obiekt2.sy;
            if(obiekt2.monety > 0) mario.monety++;
            obiekt2.monety--;
          }
          if(obiekt2.typ === "bloczekCegiel") {
            if(mario.mozeNiszczyc) {
              dane.obiekty.tabelaFragmentowCegiel.push(
                new FragmentCegiel(dane.grafika, obiekt2.x, obiekt2.y, obiekt2.w/2, obiekt2.h/2, 0),
                new FragmentCegiel(dane.grafika, obiekt2.x + obiekt2.w/2, obiekt2.y, obiekt2.w/2, obiekt2.h/2, 1),
                new FragmentCegiel(dane.grafika, obiekt2.x, obiekt2.y + obiekt2.h/2, obiekt2.w/2, obiekt2.h/2, 2),
                new FragmentCegiel(dane.grafika, obiekt2.x + obiekt2.w/2, obiekt2.y + obiekt2.h/2, obiekt2.w/2, obiekt2.h/2, 3)
              );
              let nrBloczka = dane.obiekty.tabelaBloczkowCegiel.indexOf(obiekt2);
    					dane.obiekty.tabelaBloczkowCegiel.splice(nrBloczka, 1);
            } else {
              obiekt2.obecnyStan = obiekt2.stan.drganie;
            }
          }
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
        if(stronaKolizji[0]) {
          let nrPotwora = dane.obiekty.tabelaPotworow.indexOf(obiekt2);
					dane.obiekty.tabelaPotworow.splice(nrPotwora, 1);
					mario.obecnyStan = mario.stan.skakanie;
					mario.pedY = -20.5;
        }
        if(stronaKolizji[1] || stronaKolizji[2] || stronaKolizji[3]) {
          mario.obecnyStan = mario.stan.smierc;
          mario.pedY = -20.5;
          mario.momentSmierci = true;
          setTimeout(() => {
            dane.kontroler.smierc.strataZycia(dane);
          }, 750);
        }
      } else if(obiekt2.typ === "moneta") {
        let nrMonety = dane.obiekty.tabelaMonet.indexOf(obiekt2);
        dane.obiekty.tabelaMonet.splice(nrMonety, 1);
        mario.monety++;
      }
    } else if(obiekt1.typ === "potwor") {
      let potwor = obiekt1;
      if(obiekt2.typ === "sciana" || obiekt2.typ === "bloczekMonet" || obiekt2.typ === "platforma" || obiekt2.typ === "bloczekCegiel") {
        if(stronaKolizji[0]) {
          potwor.obecnyStan = potwor.stan.poruszanie;
          potwor.y = obiekt2.y - potwor.h;
          potwor.pedY = 0;
          if(obiekt2.typ === "platforma") {
            potwor.x += obiekt2.pedX;
          }
        }
        if(stronaKolizji[3]) {
          potwor.x = obiekt2.x - potwor.w;
          potwor.pedX = -2;
        }
        if(stronaKolizji[1]) {
          potwor.x = obiekt2.x + obiekt2.w;
          potwor.pedX = 2;
        }
      }
    }
  }

  stronaKolizji(obiekt1, obiekt2) {
    let maksymalnaOdlegloscX = (obiekt1.w + obiekt2.w)/2,
      maksymalnaOdlegloscY = (obiekt1.h + obiekt2.h)/2;

    let katLewyGorny = Math.atan2(maksymalnaOdlegloscY, maksymalnaOdlegloscX) * 180 / Math.PI,
      katPrawyGorny = 180 - katLewyGorny;

    let odlegloscX = (obiekt2.x + obiekt2.w/2) - (obiekt1.x + obiekt1.w/2 - obiekt1.pedX),
      odlegloscY = (obiekt2.y + obiekt2.h/2) - (obiekt1.y + obiekt1.h/2 - obiekt1.pedY);

    let katObiektow = Math.atan2(odlegloscY, odlegloscX) * 180 / Math.PI;

    let stronaKolizji = [false, false, false, false];
    if(katObiektow > katLewyGorny && katObiektow < katPrawyGorny) {
      stronaKolizji[0] = true;
    }
    if(katObiektow > katPrawyGorny || katObiektow < -katPrawyGorny) {
      stronaKolizji[1] = true;
    }
    if(katObiektow > -katPrawyGorny && katObiektow < -katLewyGorny) {
      stronaKolizji[2] = true;
    }
    if(katObiektow > -katLewyGorny && katObiektow < katLewyGorny) {
      stronaKolizji[3] = true;
    }

    return stronaKolizji;
  }
}
