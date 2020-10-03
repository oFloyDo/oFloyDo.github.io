function mouseClick(e) {
  let x = e.layerX;
  let y = e.layerY;
  switch (e.button) {
    case 0:
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 5; j++) {
          if (y > 388 + (i*154) && y < 388 + (i*154) + 151 && x > 575 + (j * 154) && x < 575 + (j * 154) + 151)
            if (number + 1 == numbers[j+(5*i)]) {
              playSound(`click/${number}`);
              current[j+(5*i)] = 2;
              if (number == 9) {
                status = 'close';
                number = 0;
              } else {
                number++;
              }
            } else {
              playSound(`fail/${randomInt(0,1)}`);
              number = 0;
              status = 'fail';
            }
        }
      }
      break;
  }
}
