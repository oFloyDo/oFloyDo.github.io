var mouse = {
  x: 0,
  y: 0
}
addEventListener('mousemove', function(e) {
  if (e.target == canvas) mouse = {
    x: e.layerX,
    y: e.layerY
  };
});
addEventListener('mousedown', function(e) {
  if (e.target == canvas && status == 'game') mouseClick(e);
});
