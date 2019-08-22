var Animacje = {
	aktualizacja: function(dane) {
		Animacje.zadania.niebo(dane);
	},
	
	zadania: {
		niebo: function(dane) {
			dane.obiekty.niebo.x -=1;
			if(dane.obiekty.niebo.x < -1440) {
				dane.obiekty.niebo.x = 0;
			}
		}
	}
}