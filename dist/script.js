var file = null;
var image = null;
var canvas = document.getElementById("can");

var red_image = null;
var blue_image = null;
var green_image = null;
var gray_image = null;
var winered_image = null;
var window_image = null;
var shark_image = null;

function upload(){
  file = document.getElementById("finput");
  image = new SimpleImage(file);
  image.drawTo(canvas);
  red_image = null;
  blue_image = null;
  green_image = null;
  gray_image = null;
  winered_image = null;
  window_image = null;
  shark_image = null;
}

function clearCanvas(){
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}

function reset(){
  clearCanvas();
  if(imageIsLoaded(image)){
    image.drawTo(canvas);
  }
}

function imageIsLoaded(image){
  if(image === null || !image.complete()){
    alert("The Image is not ready!")
    return false;
  }
  return true;
}


function redFilter(){
  if(!imageIsLoaded(image)){
    alert("Please upload your image!");
    return;
  }
  clearCanvas();
  if(red_image === null){
    red_image = new SimpleImage(image.getWidth(), image.getHeight()); 
    for(var pixel of image.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      var new_pixel = red_image.getPixel(x, y);
      new_pixel.setRed(255);
      new_pixel.setBlue(pixel.getBlue());
      new_pixel.setGreen(pixel.getGreen());
    }
  }
  if(imageIsLoaded(red_image)) {     
    red_image.drawTo(canvas);
  }
}



function blueFilter(){
  if(!imageIsLoaded(image)){
    alert("Please upload your image!");
    return;
  }
  clearCanvas();
  if(blue_image === null){
    blue_image = new SimpleImage(image.getWidth(), image.getHeight()); 
    for(var pixel of image.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      var new_pixel = blue_image.getPixel(x, y);
      new_pixel.setRed(pixel.getRed());
      new_pixel.setBlue(255);
      new_pixel.setGreen(pixel.getGreen());
    }
  }
  if(imageIsLoaded(blue_image)) {     
    blue_image.drawTo(canvas);
  }
}




function greenFilter(){
  if(!imageIsLoaded(image)){
    alert("Please upload your image!");
    return;
  }
  clearCanvas();
  if(green_image === null){
    green_image = new SimpleImage(image.getWidth(), image.getHeight()); 
    for(var pixel of image.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      var new_pixel = green_image.getPixel(x, y);
      new_pixel.setRed(pixel.getRed());
      new_pixel.setBlue(pixel.getBlue());
      new_pixel.setGreen(255);
    }
  }
  if(imageIsLoaded(green_image)) {     
    green_image.drawTo(canvas);
  }
}




function grayscaleFilter(){
  if(!imageIsLoaded(image)){
    alert("Please upload your image!");
    return;
  }
  clearCanvas();
  if(gray_image === null){
    gray_image = new SimpleImage(image.getWidth(), image.getHeight()); 
    for(var pixel of image.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      var new_pixel = gray_image.getPixel(x, y);
      var avg = (pixel.getRed() + pixel.getBlue() + pixel.getGreen()) / 3;
      new_pixel.setRed(avg);
      new_pixel.setBlue(avg);
      new_pixel.setGreen(avg);
    }
  }
  if(imageIsLoaded(gray_image)) {     
    gray_image.drawTo(canvas);
  }
}




function wineredFilter(){
  if(!imageIsLoaded(image)){
    alert("Please upload your image!");
    return;
  }
  clearCanvas();
  if(winered_image === null){
    winered_image = new SimpleImage(image.getWidth(), image.getHeight()); 
    for(var pixel of image.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      var new_pixel = winered_image.getPixel(x, y);
      var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      if(avg < 128) {
        new_pixel.setRed(2 * avg);
        new_pixel.setGreen(0);
        new_pixel.setBlue(0);
      }
      else{
        new_pixel.setRed(255);
        new_pixel.setBlue(2*avg-255);
        new_pixel.setGreen(2*avg-255);
      }
    }
  }
  if(imageIsLoaded(winered_image)) {     
    winered_image.drawTo(canvas);
  }
}


function windowFilter(){
  if(!imageIsLoaded(image)){
    alert("Please upload your image!");
    return;
  }
  clearCanvas();
  if(window_image === null){
    window_image = new SimpleImage(image.getWidth(), image.getHeight()); 
    for(var pixel of image.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      var new_pixel = window_image.getPixel(x, y);
      if(isWindow(image, x, y)){//window range
        new_pixel.setRed(218);
        new_pixel.setGreen(165);
        new_pixel.setBlue(32);
      }
      else{
        new_pixel.setRed(pixel.getRed());
        new_pixel.setGreen(pixel.getGreen());
        new_pixel.setBlue(pixel.getBlue());
      }
    }
  }
  if(imageIsLoaded(window_image)) {     
    window_image.drawTo(canvas);
  }
}

function isWindow(image, x, y){
  var width = image.getWidth();
  var height = image.getHeight();
  var largeBorder = width * 0.03;
  var smallBorder = width * 0.01;
  var smallWidth = (width - 2 * largeBorder - 3 * smallBorder) / 4;
  var b1 = 0.5 * width - smallBorder - smallWidth;
  var b2 = 0.5 * width + smallBorder + smallWidth;
  
  if(x <= largeBorder || x >= width - largeBorder
    || y <= largeBorder || y >= height - largeBorder) {
    return true;
  }
  else if(y >= 0.5 * height - 0.5 * smallBorder && y <= 0.5 * height + 0.5 * smallBorder){
    return true;
  }
  else if(x >= 0.5 * width - 0.5 * smallBorder && x <= 0.5 * width + 0.5 * smallBorder){
    return true;
  }
  else if(x >= b1 - 0.5 * smallBorder && x <= b1 + 0.5 * smallBorder){
    return true;
  }
  else if(x >= b2 - 0.5 * smallBorder && x <= b2 + 0.5 * smallBorder){
    return true;
  }
  
  return false;
}



function sharkFilter(){
  if(!imageIsLoaded(image)){
    alert("Please upload your image!");
    return;
  }
  clearCanvas();
  if(shark_image === null){
    shark_image = new SimpleImage(image.getWidth(), image.getHeight()); 
    for(var pixel of image.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      var new_pixel = shark_image.getPixel(x, y);
      if(isShark(image, x, y)){//shark range
        new_pixel.setRed(128);
        new_pixel.setGreen(128);
        new_pixel.setBlue(128);
      }
      else{
        new_pixel.setRed(pixel.getRed());
        new_pixel.setGreen(pixel.getGreen());
        new_pixel.setBlue(250);
      }
    }
  }
  if(imageIsLoaded(shark_image)) {     
    shark_image.drawTo(canvas);
  }
}

function isShark(image, x, y){
  if(y <= (Math.sin(x * 5 * Math.PI / image.getWidth()) + 1.4 ) * 0.15 * image.getHeight()){
    return true;
  }
  else if(y >= image.getHeight() - (Math.sin(x * 5 * Math.PI / image.getWidth() + Math.PI) + 1.4 ) * 0.15 * image.getHeight()) {
    return true;
  }
  return false;
}