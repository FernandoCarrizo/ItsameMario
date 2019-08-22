var Render = {
	aktualizacja: function(dane) {
		Render.zadania.Rysuj(dane.obiekty.niebo, dane.canvas.skyCtx);
		
		dane.canvas.bgCtx.clearRect(0,0, dane.canvas.bgCanvas.width, dane.canvas.bgCanvas.height);
		Render.zadania.Rysuj(dane.obiekty.mapa, dane.canvas.bgCtx);
		
		dane.canvas.fgCtx.clearRect(0,0, dane.canvas.fgCanvas.width, dane.canvas.fgCanvas.height);
		Render.zadania.Rysuj(dane.obiekty.mario, dane.canvas.fgCtx);
		
		Render.zadania.Pisz("Lives: " + dane.obiekty.mario.zycia, dane.canvas.fgCtx, 16, 32, "16px", "PixelEmulator");
		
		if(dane.obiekty.mario.zycia<1) Render.zadania.Pisz("Game Over", dane.canvas.fgCtx, 200, 300, "72px", "PixelEmulator");
		
		dane.obiekty.tabelaPotworow.forEach(function(p) {
			Render.zadania.Rysuj(p, dane.canvas.fgCtx);
		});
	},
	
	zadania: {
		Rysuj: function(co, gdzie) {
			gdzie.drawImage(co.obraz.img, 
										co.obraz.x, co.obraz.y, 
										co.obraz.w, co.obraz.h,
										co.x, co.y, co.w, co.h);
		},
		
		Pisz:function(tekst, gdzie, x, y, rozmiar, czcionka) {
			gdzie.font = rozmiar + " " + czcionka;
			gdzie.fillStyle = '#fff';
			gdzie.fillText(tekst,x,y);
		}
	}
}