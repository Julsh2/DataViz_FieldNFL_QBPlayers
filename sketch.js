var mahomes;
let regularSeason;
let passStats
var seasonSelection; 
var typeSelection;
let selectedYear;
let typeSelected;
let index; 
let mapValue; 

let opcoesMenu = {
  "LONGEST": {key: 'longest', unit: 'yds'},
  "TOUCHDOWNS":{key: 'touchdowns', unit: 'tds'},
  "SACKS": {key: 'sacks', unit: 'sacks'}
}

let valorStats;

let fieldX = 1500
let fieldTD;
let fieldY = 704
let numbersField = [10, 20, 30, 40, 50, 40, 30, 20, 10]
let divisions
let padding = 70
let linhaInferior
let linhaSuperior
let strokeLines = 4

let escolhaMenu

let imgBall;

function preload() {

  imgBall = loadImage('ball.png')

}

function setup() {
  createCanvas(1810, 850);
  
  let xPeak = (x0 + x1) / 2;
  [a, b, c] = parabolaThroughThreePoints(x0, y0, x1, y1, xPeak, yPeak);

  angleMode(DEGREES);

 
  contornoField = (width/2 - fieldX/2) // onde começa o campo

  linhaInferior = height/2 - fieldY/2 + padding
  linhaSuperior = height/2 + fieldY/2 - padding

  divisions = fieldX/(numbersField.length+1) // o tamanho do campo dividido pela quantidade de numeros
  
  fieldTD = fieldX + (divisions * 2)
  
  console.log(divisions)
  console.log(contornoField)

  loadJSON('playerProfile.json', gotData)
}

function gotData(data) {
  mahomes = data;

// regularSeason = mahomes.seasons.filter(function(s) {
//   return s.type === "REG";
// });

regularSeason = mahomes.seasons.filter(s => s.type === "REG");

passStats = regularSeason.map(s => s.teams[0].statistics.passing);

seasonSelection = createSelect();
seasonSelection.position(10, 10)

typeSelection = createSelect();
typeSelection.position(300, 10)

seasonSelection.changed(updateFilter);
typeSelection.changed(updateFilter);

seasonSelection.option("SELECT A YEAR", -1)
regularSeason.forEach(season => {
  seasonSelection.option(season.year)
})

typeSelection.option("SELECT A STATS", -1)

Object.keys(opcoesMenu).forEach(type => {
  typeSelection.option(type)
})

// typeSelection.option('LONGEST')
// typeSelection.option('TOUCHDOWNS')


  console.log(regularSeason)

}

function updateFilter() {
x0 = contornoField
selectedYear = seasonSelection.value();
typeSelected = typeSelection.value();

index = regularSeason.findIndex(season => season.year == selectedYear) 

escolhaMenu = opcoesMenu[typeSelected].key

valorMenu = passStats[index][escolhaMenu]


if (selectedYear == -1 || typeSelected == -1) {
    return;
  }

mapValue = map(valorMenu, 0, 100, contornoField, contornoField + fieldX)
console.log(mapValue)
x1 = (mapValue)
console.log(`x1: ${x1}; longest: ${valorMenu}`)


// if (selectedYear != -1 && typeSelected == 'LONGEST') {

// mapValue = map(passStats[index].longest, 0, 100, contornoField, contornoField + fieldX)
// console.log(mapValue)
// x1 = (mapValue)
// console.log(`x1: ${x1}; longest: ${passStats[index].longest}`)
// }

// if (selectedYear != -1 && typeSelected == 'TOUCHDOWNS') {

// mapValue = map(passStats[index].touchdowns, 0, 100, contornoField, contornoField+fieldX)
// console.log(mapValue)
// x1 = (mapValue)
// console.log(`x1: ${x1}; touchdowns: ${passStats[index].touchdowns}`)

// }

let xPeak = (x0 + x1) / 2;
    [a, b, c] = parabolaThroughThreePoints(x0, y0, x1, y1, xPeak, yPeak);
    yPeak = random(200, 260)

t = 0;

}

function draw() {

  background(18, 163, 84);
  
  rectMode(CENTER);
  
  noFill();
  stroke(255)
  strokeWeight(12)
  rect(width/2, height/2, fieldX, fieldY)
  rect(width/2, height/2, fieldTD, fieldY)
  
    for (let i = 0; i < numbersField.length; i++) {
      
    let x = contornoField + divisions + (divisions * i)
      
    fill(255)
    noStroke()
    textSize(30)
    textFont('Black Ops One')
    textAlign(CENTER, CENTER)
    
    push();
    translate(x, linhaInferior)
    rotate(180)
    text(numbersField[i], 0, 0)
    pop();
      
    text(numbersField[i], x, linhaSuperior)
  }

    push();
    textSize(80)
    translate(10+(divisions/2), height/2)
    rotate(180+90)
    text('TOUCHDOWN', 0, 0)
    pop();
  
  
    push();
    textSize(80)
    translate(fieldTD-(divisions/2), height/2)
    rotate(90)
    text('MAHOMES', 0, 0)
    
    pop();


    
  for (let i = 0; i <= (numbersField.length * 2) + 1; i++) {
    let x = (contornoField+ (i * divisions)/2)
    
    stroke(255)
    strokeWeight(strokeLines)
    line(x, height/2 - fieldY/2, x, height/2 + fieldY/2)
  }
  
  for (let i = 0; i <= (numbersField.length * 11) + 1; i++) {
    
    let x = (contornoField+ (i * divisions)/10)

    strokeWeight(strokeLines)
    line(x, linhaInferior - 35, x, linhaInferior - 55)
    line(x, linhaSuperior + 35, x, linhaSuperior + 55)
  } 


if (selectedYear != -1 && typeSelected != -1) {
desenhaParabola(x0, y0, x1, y1, yPeak);
animaBola() 
}


}