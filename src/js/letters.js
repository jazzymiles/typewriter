var lettersArray = [];
var boxs = [];
var sources = {
  a: 'src/img/l.jpeg',
  b: 'src/img/l.jpeg',
  c: 'src/img/l.jpeg',
  d: 'src/img/l.jpeg',
  e: 'src/img/l.jpeg',
  f: 'src/img/l.jpeg',
  g: 'src/img/l.jpeg',
  h: 'src/img/l.jpeg',
  i: 'src/img/l.jpeg',
  j: 'src/img/l.jpeg',
  k: 'src/img/l.jpeg',
  l: 'src/img/l.jpeg',
  m: 'src/img/l.jpeg',
  n: 'src/img/l.jpeg',
  o: 'src/img/l.jpeg',
  p: 'src/img/l.jpeg',
  q: 'src/img/l.jpeg',
  r: 'src/img/l.jpeg',
  s: 'src/img/l.jpeg',
  t: 'src/img/l.jpeg',
  u: 'src/img/l.jpeg',
  v: 'src/img/l.jpeg',
  w: 'src/img/l.jpeg',
  x: 'src/img/l.jpeg',
  y: 'src/img/l.jpeg',
  z: 'src/img/l.jpeg',
  space: 'src/img/l.jpeg',
  dot: 'src/img/l.jpeg',
  coma: 'src/img/l.jpeg'
};
var stage;
var layer;
var i=0;
var xrow=0;
var yrow=0;
var time=0;
var anim;
var images = {};

window.onload = function() {
        stage = new Kinetic.Stage({
          container: 'container',
          width: window.innerWidth,
          height: window.innerHeight
        });
        layer = new Kinetic.Layer();
        layer.on('mouseover', function(evt) {
          var shape = evt.shape;
          document.body.style.cursor = 'pointer'; 
          layer.draw();
        });
        layer.on('mouseout', function(evt) {
          var shape = evt.shape;
          document.body.style.cursor = 'default';  
          layer.draw();
        });
        anim = new Kinetic.Animation(aFunction, layer);
        anim.start();
        stage.add(layer);

        loadImages(sources, readyToPrint);
        layer.draw();

        document.getElementById('ShowVideo').onclick=function(){showVideo();}
};
function aFunction(){
  if(boxs.length>0){
    for (var i = boxs.length - 1; i >= 0; i--) {
      var box=boxs[i];
      var _x=box.getX()+(box._x-box.getX())/20;
      var _y=box.getY()+(box._y-box.getY())/20;
      box.setX(_x);
      box.setY(_y);
    }
  }
}       	
window.onresize=function(){
			stage.setWidth(window.innerWidth);
			stage.setHeight(window.innerHeight);
}
window.onkeypress = function(event) {
		var char = getChar(event || window.event).toLowerCase();
    var link = sources[char];
    //console.log(sources[char]);
    if(link){
      
    }else{
      char='space';
    }
    initImg(char)
		layer.draw();
}
function loadImages(sources, callback) {
        
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
          numImages++; 
        }
        for(var src in sources) {
          images[src] = new Image();
          //console.log('src='+src);
          images[src].onload = function() {
            if(++loadedImages >= numImages) {
              callback();
            }
          };
          images[src].src = sources[src];
          images[src].name = src;
        }
}
function readyToPrint(){
    console.log('ready')
}
function initImg(letter) {
  if(boxs.length<44){
        var boxImg = new Kinetic.Image({
          image: images[letter],
          x: getRandomInt(0, 600),
          y: getRandomInt(0, 400),
          width: 140,
          height: 108,
          draggable: true,
          strokeEnabled: false
        });
        boxImg._x=xrow*140;
        boxImg._name=letter;
        boxImg._y=yrow*108;
        boxs.push(boxImg);
        layer.add(boxImg);
        layer.draw();

        xrow++;
        if (xrow>10) {
          yrow++;
          xrow=0;
        };
  }
}      
function showVideo(){
  console.log('show video')
}
function getChar(event) {
		  if (event.which == null) {
		    return String.fromCharCode(event.keyCode) // IE
		  } else if (event.which!=0 && event.charCode!=0) {
		    return String.fromCharCode(event.which)   // the rest
		  } else {
		    return null // special key
		  }
}

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
