var playing={};
function playSound(src) {
  var a,b;
  b=new Date();
  a=b.getTime();
  playing[a]=new Audio('sound/'+src);
  playing[a].onended=function(){delete playing[a]};
  playing[a].play();
}
