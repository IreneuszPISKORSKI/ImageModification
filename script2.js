var s = 600; // taille du canvas
var img; 
var slider; // mon slider qui va gérer la quantité de rouge à mettre dans l'image
let selectType;
let buttonInversion = 0;

function preload() { // fonction qui permet de pré charger l'image
  img = loadImage("fractal.jpg");
}

function setup(){

    createCanvas(s,s);
    slider = createSlider(0, 100, 20); // création du slider avec valeur min, max, et valeur initiale
    textSize(18);
    slider.position(20, 490);
    slider.style('width', '200px'); 
    sel = createSelect();
    sel.position(20, 570);
    sel.option('Standard');
    sel.option('Niveau de gris');
    sel.option('Sepia');
    sel.selected('Standard');
    pixelDensity(1); 
    button = createButton('Inverse colors');
    button.position(20, 530);
    button.mousePressed(inverseColors);
}

function draw(){ //
  background(128);
  text('Brightness', 75, 475); 
  img.resize(s,s-150);
  let facteur =  slider.value();
  loadPixels();
  img.loadPixels(); 
  
  for (var ligne = 0; ligne < s-150; ligne++) { 
    for (var col = 0; col < s; col++) {
        let index = (s * ligne + col)*4;
        selectType = sel.value();
        
        pixels[index + 0] = img.pixels[index + 0]; 
        pixels[index + 1] = img.pixels[index + 1]; 
        pixels[index + 2] = img.pixels[index + 2];

        if (buttonInversion){
          pixels[index + 0] = 255-pixels[index + 0];
          pixels[index + 1] = 255-pixels[index + 1];
          pixels[index + 2] = 255-pixels[index + 2];
        }

        if (selectType=='Standard'){
        } else if(selectType=='Niveau de gris'){
            let moyenne = (pixels[index + 0]+pixels[index + 1]+pixels[index + 2])/3;
            pixels[index + 0] = moyenne;
            pixels[index + 1] = moyenne; 
            pixels[index + 2] = moyenne;
        }else if(selectType=='Sepia'){
            var sepR = pixels[index + 0]* 0.393 + 0.769 * pixels[index + 1] + 0.189 * pixels[index + 2];
            var sepG = pixels[index + 0]* 0.349 + 0.686 * pixels[index + 1] + 0.168 * pixels[index + 2];
            var sepB = pixels[index + 0]* 0.272 + 0.534 * pixels[index + 1] + 0.131 * pixels[index + 2];
            pixels[index + 0] = sepR; 
            pixels[index + 1] = sepG; 
            pixels[index + 2] = sepB; 
        }
        
        pixels[index + 0] = (facteur/20) * pixels[index + 0]
        pixels[index + 1] = (facteur/20) * pixels[index + 1]
        pixels[index + 2] = (facteur/20) * pixels[index + 2]
      }
      
  }
  updatePixels(); 
}

function inverseColors() {
    if(buttonInversion == true){
        buttonInversion = false;
    }
    else{
        buttonInversion = true;
    }
  }