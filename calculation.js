function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function lerp(start, end, amt){
  return (1 - amt) * start + amt * end;
}
