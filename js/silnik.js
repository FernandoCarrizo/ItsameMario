var Silnik = {
	ini: function() {
		var skyCanvas = document.getElementById("sky-canvas");
		var bgCanvas = document.getElementById("bg-canvas");
		var fgCanvas = document.getElementById("fg-canvas");
		
		var canvas = {
			skyCanvas: skyCanvas,
			bgCanvas: bgCanvas,
			fgCanvas: fgCanvas,
			skyCtx: skyCanvas.getContext("2d"),
			bgCtx: bgCanvas.getContext("2d"),
			fgCtx: fgCanvas.getContext("2d"),
		};
		
		var grafika = new Image();
		grafika.src = "img/stylesheet.png";
		
		grafika.addEventListener("load", function() {
			var grafika = this;
		});
		
		var dane = {
			nrKlatki: 0,
			canvas: canvas,
			grafika: grafika
		};
		
		Obiekty.ini(dane);
		Silnik.start(dane);
	},
	
	start: function(dane) {
		var petla = function() {
			Silnik.wejscie(dane);
			Silnik.aktualizacje(dane);
			Silnik.render(dane);
			
			dane.nrKlatki++;
			
			window.requestAnimationFrame(petla);
		};
		
		petla();
	},
	
	wejscie: function(dane) {
		
	},
	
	aktualizacje: function(dane) {
		Animacje.aktualizacja(dane);
	},
	
	render: function(dane) {
		Render.aktualizacja(dane);
	}
};

window.onload = Silnik.ini();