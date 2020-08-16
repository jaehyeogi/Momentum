const body = document.querySelector("body");

const IMG_NB = 6;

function paintBG(imgNumber){
  body.style.background = `url(src/images/${imgNumber + 1}.jpg)`;
  body.style.backgroundSize="100%";
  body.style.backgroundRepeat="fixed";
}

function genRandom(){
  const number = Math.floor(Math.random()* IMG_NB);
  return number;
}

function init(){
  const randomnumber = genRandom();
  paintBG(randomnumber);
}
init();
