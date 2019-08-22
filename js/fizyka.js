var Fizyka = {
	aktualizacja: function(dane) {
		Fizyka.zadania.Grawitacja(dane.obiekty.mario);
		Fizyka.zadania.WykrywanieKolizji(dane);
		Fizyka.zadania.Smierc(dane);
	},
	
	zadania: {
		Grawitacja: function(obiekt) {
			obiekt.obecnyStan = obiekt.stan.skakanie;
			obiekt.pedY+=1;
			obiekt.y+=obiekt.pedY;
		},
		
		WykrywanieKolizji: function(dane) {
			var mario = dane.obiekty.mario;
			
			var WykrywanieKolizji = function(obiekt) {
				if(mario.x < obiekt.x + obiekt.w &&
				    mario.x + mario.w > obiekt.x &&
				    mario.y < obiekt.y + obiekt.h &&
				    mario.y +mario.h > obiekt.y) {
						Fizyka.zadania.Kolizja(dane, obiekt);
				}
			};
			
			dane.obiekty.tabelaScian.forEach(function(sciana) {
				WykrywanieKolizji(sciana);
			});
		},
		
		Kolizja: function(dane, obiekt) {
			var mario = dane.obiekty.mario;
			
			if(obiekt.typ === "sciana") {
				if(mario.y+mario.h>obiekt.y && mario.x+mario.w > obiekt.x+10 && mario.x < obiekt.x+obiekt.w-10 && mario.pedY >= 0) {
					mario.obecnyStan = mario.stan.stanie;
					mario.y = obiekt.y - mario.h;
					mario.pedY = 0;
				}
				
				if(mario.x + mario.w > obiekt.x +16 && mario.x < obiekt.x + obiekt.w - 16 && mario.y > obiekt.y) {
					mario.y = obiekt.y + obiekt.h;
					mario.pedY = 1;
				}
				
				if(mario.x < obiekt.x && mario.y + mario.h > obiekt.y && mario.y < obiekt.y + obiekt.h) {
					mario.x = obiekt.x - mario.w;
				}
				
				if(mario.x > obiekt.x && mario.y + mario.h > obiekt.y && mario.y < obiekt.y + obiekt.h) {
					mario.x = obiekt.x + obiekt.w;
				}
			}
		},
		
		Smierc: function(dane) {
			if(dane.obiekty.mario.y > 624) Smierc.wywolanie(dane);
		}
	}
}