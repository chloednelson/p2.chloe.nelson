let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;
let cam;
let actualtemp;
let skydescription;
let lowtemp;
let hightemp;
let articlename1;
let articlename2;
let articlename3;
let articlename4;
let articlename5;
let task1;
let task2;
let task3;
let task4;
let task5;
let taskjson;
let btnOn = false;
let col;

var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=33.5779&lon=-101.8552&units=imperial&appid=cca888b00f06bd791c674793fbf86e3d';
var newsURL='https://newsdata.io/api/1/news?apikey=pub_13484debe132044057a2a38f77a478964f974&q=top%20news ';

function setup() {
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();
  createCanvas(cam.width, cam.height);
  stroke(255);
  
  let radius = min(125, 125) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;
  
  r = random(255);
  g = random(255);
  b = random(255);

  cx = 250 / 2;
  cy = 225 / 2;
  weatherURL = loadJSON(weatherURL, weatherdraw)
  newsURL = loadJSON(newsURL, newsdraw)
  taskjson = loadJSON('Calendar.json', taskdraw)
}

function weatherdraw(weather){
  actualtemp = weather.main.temp;
  skydescription = weather.weather[0].description;
  lowtemp = weather.main.temp_min;
  hightemp = weather.main.temp_max;
}
function newsdraw(news){
  articlename1 = news.results[0].title;
  articlename2 = news.results[1].title;
  articlename3 = news.results[2].title;
  articlename4 = news.results[3].title;
  articlename5 = news.results[4].title;
}
function taskdraw(task){
  task1 = task.Day.Monday[0].Task1;
  task2 = task.Day.Monday[0].Task2;
  task3 = task.Day.Monday[0].Task3;
  task4 = task.Day.Monday[0].Task4;
  task5 = task.Day.Monday[0].Task5;
}


function draw() {
  background(200);
  image(cam, 0, 0);
  
  textAlign('center', 'center')
    textSize(10);
    textFont('Helvetica');
    text(0, canvas.w/2, canvas.h - 20);
  draw_circle(); 
  draw_weather(); 
  draw_news();
  draw_tasks();
  draw_Sleep();
  rect(575,400, 25,25,100);
  if( btnOn == true ){
    fill(0,0,255);
    draw_light();
  }
  
}
  
function draw_weather(){
  stroke(255);
  fill(175,200,220,75);
  rect(30,185,150,105, 20); 
  fill(0);
  textSize(18);
  textAlign(CENTER);
  text('Weather', 105, 200);
  textSize(12);
  fill(0);
  text('Actual Temp: ' + actualtemp + 'F', 95,215);
  text('Low: ' + lowtemp + 'F', 73,235);
  text('High: '+ hightemp+ 'F', 75,255);
  text('Weather: ' + skydescription , 10,160,180,230);
}

function draw_circle(){
  noStroke();
  fill(244, 122, 158);
  ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
  fill(237, 34, 93);
  ellipse(cx, cy, clockDiameter, clockDiameter);
  
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
  
  stroke(255);
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(4);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);
  
  strokeWeight(2);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 30) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();
  
  var sec = second();
  var min = minute();
  var hrs = hour();
  
  var mer = hrs <= 12 ? "AM":"PM";
  sec = formatting(sec);
  min = formatting(min);
  hrs = formatting(hrs % 12);
  
  textSize(16);
  stroke(2);
  fill(255);
  
  text(hrs + ":" + min + ":" + sec +
       " " + mer, 125, 35);
}

function formatting(num){
  if(int(num) < 10) {
    return "0" + num;
  }
  return num;
}

function draw_news(){
  stroke(255);
  fill(200,400,220,75);
  rect(205,30,400,125, 20); 
  fill(0)
  textSize(18);
  textAlign(CENTER);
  text('Top News Articles for the Day',425,45);
  textSize(10);
  text('1: ' + articlename1, 200, 40, 400, 45);
  text('2: ' + articlename2, 200, 53, 400, 45);
  text('3: ' + articlename3, 200, 70, 400, 45);
  text('4: ' + articlename4, 200, 90, 400, 45);
  text('5: ' + articlename5, 200, 105, 400, 45);
}

function draw_tasks(){
  stroke(255);
  fill(75,0,180, 75);
  rect(30,300,115,115, 25); 
  fill(0)
  textSize(18);
  textAlign(CENTER);
  text('Tasks', 90, 315);
  textSize(10);
  text(''+task1, 15, 315, 120,35);
  text(''+task2, 25, 330, 120,35);
  text(''+task3, 28, 345, 120,35);
  text(''+task4, 28, 360, 120,35);
  text(''+task5, 10, 375, 120,35);
}

function draw_Sleep(){
  stroke(255);
  fill(0,250,180, 75);
  rect(200,175,50,50, 25); 
  fill(0);
  textSize(12);
  textAlign(CENTER);
  text('Sleep (HR)',225,166);
  textSize(36);
  text('6',225, 203);
  
}

function draw_light(){
  stroke(r,g,b);
  strokeWeight(40);
  fill(0, 0);
  rect(0,0,640,480);
}


function mousePressed() {
  if( mouseX > 575 && mouseY > 400 && mouseX < 575 + 50 && mouseY < 400 + 50){
    btnOn = !btnOn;
    let d = dist(640, 480, 640, 480);
    if (d < 100) {
    r = random(255);
    g = random(255);
    b = random(255);
  }
  }
  if(btnOn){
    col = color(10, 245, 90);
  } else {
    col = color(245, 40, 40);
  }
}



