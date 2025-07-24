
let x0 = -100, y0 = 450;
let x1 = -100, y1 = 450;
let yPeak = 120;
let a, b, c;
let t = 0; // vai de 0 a 1

function animaBola() {
  // Anima a bolinha  


  let x = lerp(x0, x1, t);    // x vai de x0 até x1 conforme t
  let y = a * x * x + b * x + c;
 // ellipse(x, y, 24);
imageMode(CENTER);
  image(imgBall, x, y)

  fill(255)



  if (index != -1 && passStats[index]) {

  if (typeSelected == 'LONGEST') {
    console.log("foi")

    text(`${passStats[index].longest}yds`, x, y + 27)
  }
  if (typeSelected == 'TOUCHDOWNS') {
    text(`${passStats[index].touchdowns}tds`, x, y + 27)
  }

 // text(`${infoTexto}yds`, x, y + 27)
  }

  // Avança o tempo (ajuste a velocidade como quiser)
  if (t <= 1) t =   t += 0.005; // volta ao início para repetir

 

}



function desenhaParabola(x0, y0, x1, y1, yPeak) {
  let xPeak = (x0 + x1) / 2;
  let [a, b, c] = parabolaThroughThreePoints(x0, y0, x1, y1, xPeak, yPeak);

  stroke(255);
  strokeWeight(3);  
noStroke();
  noFill();
  beginShape();
  for (let x = x0; x <= x1; x += 1) {
    let y = a*x*x + b*x + c;
    vertex(x, y);
  }
  endShape();
}


function parabolaThroughThreePoints(x0, y0, x1, y1, x2, y2) {
  let A = [
    [x0*x0, x0, 1],
    [x1*x1, x1, 1],
    [x2*x2, x2, 1]
  ];
  let Y = [y0, y1, y2];
  let det = (A[0][0]*A[1][1]*A[2][2] + A[0][1]*A[1][2]*A[2][0] + A[0][2]*A[1][0]*A[2][1])
          - (A[0][2]*A[1][1]*A[2][0] + A[0][1]*A[1][0]*A[2][2] + A[0][0]*A[1][2]*A[2][1]);
  function det3(a,b,c, d,e,f, g,h,i) {
    return a*e*i + b*f*g + c*d*h - c*e*g - b*d*i - a*f*h;
  }
  let da = det3(Y[0],A[0][1],A[0][2], Y[1],A[1][1],A[1][2], Y[2],A[2][1],A[2][2]);
  let db = det3(A[0][0],Y[0],A[0][2], A[1][0],Y[1],A[1][2], A[2][0],Y[2],A[2][2]);
  let dc = det3(A[0][0],A[0][1],Y[0], A[1][0],A[1][1],Y[1], A[2][0],A[2][1],Y[2]);
  return [da/det, db/det, dc/det];
}
