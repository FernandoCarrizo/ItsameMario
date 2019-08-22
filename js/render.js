var Render = {
	aktualizacja: function(dane) {
		Render.zadania.Rysuj(dane.obiekty.niebo, dane.canvas.skyCtx);
		dane.canvas.bgCtx.clearRect(0,0, dane.canvas.bgCanvas.width, dane.canvas.bgCanvas.height);
		Render.zadania.Rysuj(dane.obiekty.mapa, dane. canvas.bgCtx);
	},
	
	
	zadania: {
		Rysuj: function(co, gdzie) {
			gdzie.drawImage(co.obraz.img, 
										co.obraz.x, co.obraz.y,
										co.obraz.w, co.obraz.h,
										co.x, co.y, co.w, co.h);
		}
	}
}