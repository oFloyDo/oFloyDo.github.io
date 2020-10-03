var delta;
var lastCalledTime = performance.now();
var fpsLimit = 0; // 0 - no limit
var left = [1,2,3,4,5,6,7,8,9,10]
var numbers = [];
var current = [];
var number = 0;
var status = 'game';
var counter = 0;
var offsetY = 0;
function init() {
  for (let i = 0; i < 10; i++) {
    random = left[randomInt(0,left.length-1)];
    left.splice(left.indexOf(random),1);
    numbers[i] = random;
    current[i] = 0;
  }
  loadSprite('bg', 'bg.png');
  loadSprite('main', 'main.png');
  loadSprite('overlay', 'overlay.png');
  for (let i = 0; i < 10; i++) {
    loadSprite('number/'+(i+1), 'number/'+(i+1)+'.png');
  }
  for (let i = 0; i < 3; i++) {
    loadSprite('button/'+i, 'button/'+i+'.png');
  }

  main();
}

function main() {
  delta = (performance.now() - lastCalledTime)/1000;
  lastCalledTime = performance.now();
  // ------------------ Draw ------------------ //
  fill('#fff');
  drawSprite('bg', 0, 0)
  drawSprite('main', 0, offsetY)
  if (status == 'fail') {
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
  } else if (status == 'open') {
    if (counter == 0) {
      left = [1,2,3,4,5,6,7,8,9,10]
      for (let i = 0; i < 10; i++) {
        random = left[randomInt(0,left.length-1)];
        left.splice(left.indexOf(random),1);
        numbers[i] = random;
        current[i] = 0;
      }
      playSound('open.wav');
    }
    counter += delta;
    if (offsetY > 0.5) {
      offsetY = lerp(offsetY, 0, 0.05);
    } else {
      offsetY = 0;
      counter = 0;
      status = 'game';
    }
  } else if (status == 'close') {
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
  }
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 5; j++) {
      drawSprite('button/'+current[j+(i*5)], 575+(j*154), 388+(i*154)+offsetY);
      drawSprite('number/'+numbers[j+(i*5)], 575+(j*154)+25, 388+(i*154)+25+offsetY);

    }
  }
  drawSprite('overlay', 0, offsetY)
  //Debug
  setTimeout(main, 1000/fpsLimit);
}
init();
