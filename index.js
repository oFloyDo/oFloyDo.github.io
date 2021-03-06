var delta;
var lastCalledTime = performance.now();
var fpsLimit = 0; // 0 - no limit

var left;
var numbers = [];
var current = [];
var number = 0;

var status = 'game';
var counter = 0;
var offsetY = 0;

var timerTime = 0;
var timer = false;
var best;

function generate() {
  left = [1,2,3,4,5,6,7,8,9,10]
  for (let i = 0; i < 10; i++) {
    random = left[randomInt(0,left.length-1)];
    left.splice(left.indexOf(random),1);
    numbers[i] = random;
    current[i] = 0;
  }
}
function formatTimer(number) {

  str = number.toFixed(2).toString().replace('.',':');
  return str;
}


function init() {
  generate();
  loadSprite('bg', 'bg.png');
  loadSprite('main', 'main.png');
  loadSprite('overlay', 'overlay.png');
  for (let i = 0; i < 10; i++) {
    loadSprite('number/'+(i+1), 'number/'+(i+1)+'.png');
    loadSound('click/'+i,'click/'+i+'.wav')
  }
  for (let i = 0; i < 3; i++) {
    loadSprite('button/'+i, 'button/'+i+'.png');
  }
  for (let i = 0; i < 2; i++) {
    loadSound('fail/'+i,'fail/'+i+'.wav')
  }
  loadSound('open','open.wav')

  main();
}

function main() {
  delta = (performance.now() - lastCalledTime)/1000;
  lastCalledTime = performance.now();
  if (timer) timerTime += delta;
  // ------------------ Draw ------------------ //
  fill('#fff');
  drawSprite('bg', 0, 0)
  drawSprite('main', 0, offsetY)
  switch (status) {
    case "fail":
      counter += delta;
      if (counter > 0 && counter < 0.25 || counter > 0.5 && counter < 0.75) {
        for (let i = 0; i < 10; i++) {
          current[i] = 1;
        }
      } else {
        for (let i = 0; i < 10; i++) {
          current[i] = 0;
        }
      }
      if (counter > 1) {
        status = 'game';
        counter = 0;
      }
      break;
    case "open":
      if (counter == 0) {
        left = [1,2,3,4,5,6,7,8,9,10]
        for (let i = 0; i < 10; i++) {
          random = left[randomInt(0,left.length-1)];
          left.splice(left.indexOf(random),1);
          numbers[i] = random;
          current[i] = 0;
        }
        playSound('open');
      }
      counter += delta;
      if (offsetY > 0.5) {
        offsetY = lerp(offsetY, 0, 0.05);
      } else {
        offsetY = 0;
        counter = 0;
        status = 'game';
      }
      break;
    case "close":
      counter += delta;
      if (counter > 0.7) {
        if (offsetY < 899.99) {
          offsetY = lerp(offsetY, 900, 0.05);
        } else {
          offsetY = 900;
          status = 'open';
          counter = 0;
        }
      }
      break;
  }
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 5; j++) {
      drawSprite('button/'+current[j+(i*5)], 575+(j*154), 388+(i*154)+offsetY);
      drawSprite('number/'+numbers[j+(i*5)], 575+(j*154)+25, 388+(i*154)+25+offsetY);

    }
  }
  drawSprite('overlay', 0, offsetY)
  drawText(formatTimer(timerTime),canvas.width/2,100,"50px Roboto", '#fff',"center")
  if (best != null) drawText("Best: " + formatTimer(best),canvas.width/2,50,"50px Roboto", '#fff',"center")

  //Debug
  setTimeout(main, 1000/fpsLimit);
}
init();
