var Fizyka = {
	aktualizacja: function(dane) {
		Fizyka.zadania.Grawitacja(dane.obiekty.mario);
		Fizyka.zadania.WykrywanieKolizji(dane);
	},
	
	zadania: {
		Grawitacja: function(obiekt) {
			obiekt.pedY+=1;
			obiekt.y+=obiekt.pedY;
		},
		
		WykrywanieKolizji: function(dane) {
			var mario = dane.obiekty.mario;
			
			var WykrywanieKolizji = function(obiekt) {
				if(mario.x<obiekt.x+obiekt.w && mario.x + mario.w > obiekt.x && mario.y<obiekt.y+obiekt.h && mario.y+mario.h>obiekt.y) {
					Fizyka.zadania.Kolizja(dane, obiekt);
				}
			}
			
			dane.obiekty.tabelaScian.forEach(function(sciana) {
				WykrywanieKolizji(sciana);
			});
		},
		
		Kolizja: function(dane, obiekt) {
			var mario = dane.obiekty.mario;
			
			if(obiekt.typ === "sciana") {
				if(mario.y+mario.h>obiekt.y && mario.x+mario.w > obiekt.x+10 && mario.x < obiekt.x+obiekt.w-10 && mario.pedY >= 0) {
					mario.y = obiekt.y - mario.h;
					mario.pedY = 0;
				}
			}
		}
	}
}