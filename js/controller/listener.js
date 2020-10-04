var mouse = {
  x: 0,
  y: 0
}
canvas.addEventListener('mousemove', function(e) {
  if (e.target == canvas) mouse = {
    x: e.layerX,
    y: e.layerY
  };
});
canvas.addEventListener('mousedown', function(e) {
  if (e.target == canvas && status == 'game') mouseClick(e);
});
