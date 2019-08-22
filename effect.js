var w = innerWidth, h = innerHeight;
var v = Math.min(w, h), ctx;

var Rmax = v/2 - 20, Rmin = v/8;
var circles = 15, points = 10;

onload = function() {
  var cvs = document.querySelector("canvas");
  cvs.width = w; cvs.height = h;
  ctx = cvs.getContext("2d");
  
  animate();
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, w, h);

  var t = Date.now() / 1000;

  for(var j = 0; j < circles; j++)
  for(var i = 0; i < points; i++) {
    var p1 = project(i-1,   j,   t);
    var p2 = project(i, j,   t);
    var p3 = project(i+1, j+1, t);
    var p4 = project(i,   j+1, t);

    if(project(i+1/2, j+1/2, t).a > Math.SQRT1_2/2) {
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);

      ctx.fillStyle =  `hsla(${t + i/points*2*Math.PI
        + 2*j/circles*2*Math.PI
      }rad, 50%, 50%, ${p1.a})`;
      ctx.fill();
    }
  }

  requestAnimationFrame(animate);
}

function project(i, j, t) {
  var angle = (i + j / 2) / points * 2 * Math.PI + t;
  var offset = j / circles * 2 * Math.PI + t;

  var r = Rmin + (Rmax - Rmin) *
    (0.5 + 0.5 * Math.cos(angle + offset));

  var a = 0.5 + 0.5 * Math.sin(angle + offset);
  ctx.fillStyle = `rgba(255, 255, 255, ${a})`;

  var x = w / 2 + r * Math.cos(angle);
  var y = h / 2 + r * Math.sin(angle);

  return {x:x, y:y, a: a};
}
