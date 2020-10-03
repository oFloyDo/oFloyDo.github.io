const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
c.imageSmoothingEnabled = false;
var sprites = new Array();

function loadSprite(name, src) {
  if (!(name in sprites)) {
    sprites[name] = new Image();
    sprites[name].src = 'tex/'+src;
  }
  else console.warn(`Cannot create sprite with name ${name} because sprite already exists`);
}
function drawSprite(name,x,y) {
  if ((name in sprites)) {
    if ((x >= -sprites[name].width*3 && x <= width && y >= 0-sprites[name].height && y <= height)) c.drawImage(sprites[name],x,y,sprites[name].width,sprites[name].height);
  }
  else console.warn(`Cannot draw sprite with name ${name} because sprite doesn't exists`);
}

function fill(color) {
  c.fillStyle = color;
  c.fillRect(0,0,width,height);
}
