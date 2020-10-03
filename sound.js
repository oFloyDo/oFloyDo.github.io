var sounds = {};
function loadSound(name, src) {
  sounds[name] = new Audio('sound/'+src);
}
function playSound(name) {
  sounds[name].play();
}
