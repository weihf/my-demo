
var snow = function() {
	var canvas = document.getElementById("c");
	var ctx = canvas.getContext("2d");
	var W = 500;
	var H = 500;
	canvas.width = W;
	canvas.height = H;
	var pieces = 100;
	var allSnow = [];
	for (var i = 0; i < pieces; i++) {
		allSnow.push({
			x: Math.random() * W,
			y: Math.random() * H,
			r: Math.random() * 4 + 1,
			d: Math.random() * pieces
		})
	}
	setInterval(draw, 33);

	function draw() {
		ctx.clearRect(0, 0, W, H);
		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		for (var i = 0; i < pieces; i++) {
			var p = allSnow[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
		}
		ctx.fill();
		move();
	}
	var angle = 0;

	function move() {
		angle += 0.01;
		for (var i = 0; i < pieces; i++) {
			var p = allSnow[i];
			p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
			p.x += Math.sin(angle) * 2;
			if (p.x > W + 5 || p.x < -5 || p.y > H) {
				if (i % 3 > 0) {
					allSnow[i] = {
						x: Math.random() * W,
						y: -10,
						r: p.r,
						d: p.d
					};
				} else {
					if (Math.sin(angle) > 0) {
						allSnow[i] = {
							x: -5,
							y: Math.random() * H,
							r: p.r,
							d: p.d
						};
					} else {
						allSnow[i] = {
							x: W + 5,
							y: Math.random() * H,
							r: p.r,
							d: p.d
						};
					}
				}
			}
		}
	}

}
window.onload = snow();