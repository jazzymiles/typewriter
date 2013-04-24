var lettersArray = new Array();
var boxs = new Array();
var sources = {
  a: 'src/img/a.png',
  b: 'src/img/b.png',
  c: 'src/img/c.png',
  d: 'src/img/d.png',
  e: 'src/img/e.png',
  f: 'src/img/f.png',
  g: 'src/img/g.png',
  h: 'src/img/h.png',
  i: 'src/img/i.png',
  j: 'src/img/j.png',
  k: 'src/img/k.png',
  l: 'src/img/l.png',
  m: 'src/img/m.png',
  n: 'src/img/n.png',
  o: 'src/img/o.png',
  p: 'src/img/p.png',
  q: 'src/img/q.png',
  r: 'src/img/r.png',
  s: 'src/img/s.png',
  t: 'src/img/t.png',
  u: 'src/img/u.png',
  v: 'src/img/v.png',
  w: 'src/img/w.png',
  x: 'src/img/x.png',
  y: 'src/img/y.png',
  z: 'src/img/z.png',
  space: 'src/img/space.png',
  dot: 'src/img/space.png',
  coma: 'src/img/space.png'
};
// var sources = {
//   a: 'src/img/l.jpeg',
//   b: 'src/img/l.jpeg',
//   c: 'src/img/l.jpeg',
//   d: 'src/img/l.jpeg',
//   e: 'src/img/l.jpeg',
//   f: 'src/img/l.jpeg',
//   g: 'src/img/l.jpeg',
//   h: 'src/img/l.jpeg',
//   i: 'src/img/l.jpeg',
//   j: 'src/img/l.jpeg',
//   k: 'src/img/l.jpeg',
//   l: 'src/img/l.jpeg',
//   m: 'src/img/l.jpeg',
//   n: 'src/img/l.jpeg',
//   o: 'src/img/l.jpeg',
//   p: 'src/img/l.jpeg',
//   q: 'src/img/l.jpeg',
//   r: 'src/img/l.jpeg',
//   s: 'src/img/l.jpeg',
//   t: 'src/img/l.jpeg',
//   u: 'src/img/l.jpeg',
//   v: 'src/img/l.jpeg',
//   w: 'src/img/l.jpeg',
//   x: 'src/img/l.jpeg',
//   y: 'src/img/l.jpeg',
//   z: 'src/img/l.jpeg',
//   space: 'src/img/space.png',
//   dot: 'src/img/space.png',
//   coma: 'src/img/space.png'
// };
var stage;
var layer;
var i=0;
var xrow=0;
var yrow=0;
var xline=0;
var yline=0;
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
  xline=0;
  yline=0;
  for (var i = 0; i < boxs.length; i++) {
    if(i!=0){
      xline+=boxs[i-1]._width;
      if ((xline+boxs[i]._width)>window.innerWidth){
        xline=0;
        yline+=280;
      }
      boxs[i]._x=xline;
      boxs[i]._y=yline;
    }else{
      //xline=boxs[i]._width;
      boxs[i]._x=0;
      boxs[i]._y=0;
    }
  };
}

window.onkeypress = function(event) {
	var char = getChar(event || window.event).toLowerCase();
  var link = sources[char];
  
  if (char != 'back'){
    initImg(char);
  }else if (char == 'back'){
    deleteLetter();
  }
	layer.draw();
}

function loadImages(sources, callback) {    
  var loadedImages = 0;
  var numImages = 0;
        
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
  console.log('ready');
}

function initImg(letter) {
  if(boxs.length<44){
    var boxImg = new Kinetic.Image({
      image: images[letter],
      x: getRandomInt(0, 600),
      y: getRandomInt(0, 400),
      // width: 140,
      // height: 108,
      draggable: true,
      strokeEnabled: false
    });
    boxImg._x=xline;
    boxImg._y=yline;
    boxImg._width=images[letter].width;
    boxImg._name='img_'+boxs.length;
    boxImg._letter=letter;
    
    boxs.push(boxImg);
    layer.add(boxImg);
    layer.draw();

    xline+=(images[letter].width+10);
    if ((xline+images[letter].width)>window.innerWidth){
      yline+=280;
      xline=0;
    }
  }
}    

function deleteLetter(){
  if (boxs.length>0) {
    xline-=boxs[boxs.length-1]._width;
    if(xline<0){
      xline=boxs[boxs.length-2]._x+boxs[boxs.length-2]._width;
      yline-=280;
    }
    boxs[boxs.length-1].destroy();
    boxs.pop();
  };
  //layer.draw();
}

function showVideo(){
    var vid = document.createElement('video');
    vid.src = 'src/mov/1.mov';
    vid.setAttribute('autoplay',true);
    document.getElementsByTagName('body')[0].appendChild(vid);
  console.log('show video');
}

function getChar(event) {
	if (event.which == null) {
		return String.fromCharCode(event.keyCode) // IE
	} else if (event.which!=0 && event.charCode!=0 && event.keyCode != 46 && event.keyCode != 8) {
		return String.fromCharCode(event.which)   // the rest
  }else if (event.keyCode == 8 || event.keyCode == 46){
    return 'back';
  } else {        
		return null // 
	}
}

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
