// Ajustes de juego  

var titulo = ["TELCEL", 120];
var subtitulo = ["Juego 3", 80];
var intentostext = ["Oportunidades", 70];
var metatext = ["Tiempo", 80];
var tutorial1 = ["Sigue la secuencia para ganar", 50];
var tutorial2 = ["Cada vez sera mas dificil", 50];
var sigueintentado = ["Buen intento", 80];
var agradece = ["Gracias por participar", 80];
var sinintento = ["Te quedaste sin intentos =(", 60];
var proxima = ["Mucha suerte para la proxima..", 50];


var colorbackground = "003F84";                        // Color de fondo laterales hexadecimal
var intentos = 3;                                      // Cantidad de intentos
var puntosmeta = 10;                                   // Puntos a conseguir 
var tunnelWidth = 450;                                 // Ancho del tunel de juego

var turnostotales = 5;
var conteoActual = 1;
var timer;
var cuentaClick=0;


var puedeJugar = false;
var secuenciaList = [];
var seleccionados = 0;

var victorias = false;
var puntos;
var game;

var savedData;
var gameTimer = 0;   
var colorbg = "#"+colorbackground;   
var bgColors = ["0x"+colorbackground];                         
var pathArray = window.location.pathname.split('/');
var secondLevelLocation = pathArray[1];
var localStorageName = secondLevelLocation;


savedData = localStorage.getItem(localStorageName)==null?{registro: false,vidas:0, victoria:false}:JSON.parse(localStorage.getItem(localStorageName)); 

if (savedData.victoria || savedData.vidas == 0 || savedData.registro == false){

          window.location.href = '/'+ secondLevelLocation;
      
      
}


window.onload = function() {
     var width = 640;
     var height = 960;	
     var windowRatio = window.innerWidth / window.innerHeight;
     if(windowRatio < width / height){
          var height = width / windowRatio;
     }
	game = new Phaser.Game(width, height, Phaser.AUTO, "");
     game.state.add("Boot", boot);
     game.state.add("Preload", preload); 
     game.state.add("TitleScreen", titleScreen);
     game.state.add("HowToPlay", howToPlay);
     game.state.add("PlayGame", playGame);
     game.state.add("GameOverScreen", gameOverScreen);
     game.state.start("Boot");
}

var boot = function(game){};
boot.prototype = {
  	preload: function(){
          this.game.load.image("loading","../common/sprites/loading.png"); 
	},
  	create: function(){
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
          game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.state.start("Preload");
	}      
}

var preload = function(game){};
preload.prototype = {
	preload: function(){ 
          var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading");
          loadingBar.anchor.setTo(0.5);
          game.load.setPreloadSprite(loadingBar);
          // Objetos comunes 
          game.load.image("playbutton1", "../common/sprites/playbutton.png");
          game.load.image("backsplash", "../common/sprites/backsplash.png");
          game.load.image("paredes", "../common/sprites/wall.png");
          game.load.image("particulas", "../common/sprites/smoke.png");
          game.load.image("particula2", "../common/sprites/amarillo.png");
          game.load.image("bg1",   "../common/sprites/bg.png");
          game.load.image("vida", "../common/sprites/vidas.png");
          game.load.image("atras", "../common/sprites/atras.png");
          game.load.image("trofeo", "../common/sprites/trofeo.png");
          
          game.load.bitmapFont("font", "../common/fonts/font_0.png", "../common/fonts/font.fnt");
          
          game.load.audio("cuete2", ["../common/sounds/Cuete2.mp3"]);
          game.load.audio("aplausos", ["../common/sounds/aplausos.mp3"]);
          
          
          // Objetos personalizados de juego
          game.load.image("reno1", "assets/sprites/reno1.png");
          game.load.image("reno2", "assets/sprites/reno2.png");

          game.load.audio("bgmusic", ["assets/sounds/bgmusic.mp3"]);   
          game.load.audio("a1",    ["assets/sounds/a1.mp3"]);
          game.load.audio("a2",    ["assets/sounds/a2.mp3"]);
          game.load.audio("a3",    ["assets/sounds/a3.mp3"]);
          game.load.audio("a4",    ["assets/sounds/a4.mp3"]);
	},
  	create: function(){
		this.game.state.start("TitleScreen");
	}
}

var titleScreen = function(game){};
titleScreen.prototype = {  
     create: function(){  
          savedData = localStorage.getItem(localStorageName)==null?{registro: false,vidas:0, victoria:false}:JSON.parse(localStorage.getItem(localStorageName)); 
          
          var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backsplash");
          titleBG.tint = bgColors[0];
          document.body.style.background = colorbg;

          game.add.bitmapText(game.width/2,50,"font", titulo[0],titulo[1]).anchor.x = 0.5;
          game.add.bitmapText(game.width/2,230,"font", subtitulo[0],subtitulo[1]).anchor.x = 0.5;
          
          intentos = savedData.vidas;
                    var division = game.width/(savedData.vidas + 1); 
                    var divisionprevia = division;
                    for(var i = 0; i<savedData.vidas; i++){
                         game.add.image(division, game.height/2 -100 , "vida").anchor.x = 0.5;
                         division = division + divisionprevia;     
                    }
                    // Regresar seleccion nivel 
                    game.add.bitmapText(game.width / 2, game.height -400 , "font", intentostext[0], intentostext[1]).anchor.x = 0.5;
                    var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton1", this.startGame);
                    playButton.anchor.set(0.5);
                    var tween = game.add.tween(playButton).to({
                         width: 220,
                         height:220
                    }, 1500, "Linear", true, 0, -1); 
                    tween.yoyo(true);

                    var atrasButton = game.add.button(100, game.height -100, "atras", this.returnMenu);
                    atrasButton.width = "100";
                    atrasButton.height = "100";
                    atrasButton.anchor.set(0.5);
                    var tween = game.add.tween(atrasButton).to({
                         width: 90,
                         height:90
                    }, 1500, "Linear", true, 0, -1); 
                    tween.yoyo(true);

     },
     startGame: function(){          
          game.state.start("HowToPlay");                 
     },
     returnMenu: function(){
          window.location.href = '../menu';
     }
}

var howToPlay = function(game){};
howToPlay.prototype = {  
     create: function(){  
          var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backsplash");
          titleBG.tint = bgColors[0];
          document.body.style.background = colorbg;
          game.add.bitmapText(game.width / 2, 100 , "font", "Reno dice...", 70).anchor.x = 0.5;

          game.add.bitmapText(game.width / 2, 300 , "font", tutorial1[0], tutorial1[1]).anchor.x = 0.5;
          game.add.bitmapText(game.width / 2, 350 , "font", tutorial2[0], tutorial2[1]).anchor.x = 0.5;
          
          var pelotatuto = game.add.sprite(game.width / 2 - 150, 500, "reno1");
          pelotatuto.anchor.set(0.5);
          var pelotatutoTween = game.add.tween(pelotatuto).to({
               alpha: 0.5
          }, 500, "Linear", true, 0, -1); 
          pelotatutoTween.yoyo(true); 

          var enojadotuto = game.add.sprite(game.width / 2 + 150, 500, "reno2");
          enojadotuto.anchor.set(0.5);
          var enojadotutoTween = game.add.tween(enojadotuto).to({
               alpha: 0.5
          }, 500, "Linear", true, 0, -1); 
          enojadotutoTween.yoyo(true); 


          var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton1", this.startGame);
          playButton.anchor.set(0.5);
          var tween = game.add.tween(playButton).to({
               width: 220,
               height:220
          }, 1500, "Linear", true, 0, -1); 
          tween.yoyo(true);     
     },
     startGame: function(){
          game.state.start("PlayGame");            
     }
}



function botonazo(){
    if (puedeJugar){

         cuentaClick++;

          if (this.param1 != secuenciaList[cuentaClick-1]){
               intentos -= 1;
               secuenciaList.length= [];
               secuenciaList.length= 0;
               cuentaClick = 0;
               conteoActual = 1;
               puedeJugar= false;
               game.state.start("GameOverScreen");
               return;
          }

          if (this.param1 == 0){
               a.alpha = 1;
               game.add.audio("a1").play();
               setTimeout(() => {
                  a.alpha = 0.5;  
               }, 500);
          }
          
          
          if (this.param1 == 1){
               b.alpha = 1;
               game.add.audio("a2").play();
               setTimeout(() => {
                    b.alpha = 0.5;  
                 }, 500);
          }
          
          if (this.param1 == 2){
               c.alpha = 1;
               game.add.audio("a3").play();
               setTimeout(() => {
                    c.alpha = 0.5;  
                 }, 500);
          }
          
          if (this.param1 == 3){
               d.alpha = 1;
               game.add.audio("a4").play();
               setTimeout(() => {
                    d.alpha = 0.5;  
                 }, 500);
          }

        
//        alert(cuentaClick);
        if (cuentaClick == (secuenciaList.length)){


            if (cuentaClick == turnostotales){
               victorias=true;
               secuenciaList.length= [];
               secuenciaList.length= 0;
               cuentaClick = 0;
               conteoActual = 1;
               puedeJugar= false;
               game.state.start("GameOverScreen");
               return;
               //Ganaste 
          }
          puedeJugar = false;
          cuentaClick = 0;
          preparacion();
          conteoActual += 1;
          iluminar();
        }
    }
}


var playGame = function(game){};
playGame.prototype = {  
create: function(){

          savedData = localStorage.getItem(localStorageName)==null?{registro: false,vidas:0, victoria:false}:JSON.parse(localStorage.getItem(localStorageName));

          var tintColor = bgColors[0];
          document.body.style.background = colorbg;
          var fondo = game.add.image(0, 0, "bg1");
          fondo.height = game.height;
          
          var leftWallBG = game.add.tileSprite(- tunnelWidth / 2, 0, game.width / 2, game.height, "paredes");
          leftWallBG.tint = tintColor;
          var rightWallBG = game.add.tileSprite((game.width + tunnelWidth) / 2, 0, game.width / 2, game.height, "paredes");
          rightWallBG.tint = tintColor;
          rightWallBG.tileScale.x = -1;

          preparacion();
          
          a = game.add.image(game.width/2 - 100, game.height/2 - 100, "reno1");
          a.anchor.set(0.5);
          a.alpha =0.5;
          a.inputEnabled = true;
          a.events.onInputDown.add(botonazo,{param1:0});
        

          
          b = game.add.image(game.width/2 + 100, game.height/2 - 100, "reno2");
          b.anchor.set(0.5);
          b.alpha =0.5;
          b.inputEnabled = true;
          b.events.onInputDown.add(botonazo,{param1:1});
          
          
          c = game.add.image(game.width/2 - 100, game.height/2 + 100, "reno2");
          c.anchor.set(0.5);
          c.alpha =0.5;
          c.inputEnabled = true;
          c.events.onInputDown.add(botonazo,{param1:2});
          
          
          d = game.add.image(game.width/2 + 100, game.height/2 + 100, "reno1");
          d.anchor.set(0.5);
          d.alpha =0.5;
          d.inputEnabled = true;
          d.events.onInputDown.add(botonazo,{param1:3});


          this.turno = game.add.bitmapText(game.width/2,game.height/2 -400, "font", "Hola",50);
          this.turno.anchor.x = 0.5;  

          this.puntosActuales = game.add.bitmapText(game.width/2,game.height -200, "font", conteoActual.toString() + "/" + turnostotales.toString(),150);
          this.puntosActuales.anchor.x = 0.5;        
          
          iluminar();

     },
     update: function(){
          if (puedeJugar){
               this.turno.text= "Es tu turno";

          }
          else {
               this.turno.text= "Turno de Reno";
               this.puntosActuales.text = conteoActual.toString() + "/" + turnostotales.toString();
          }

     }
}




var gameOverScreen = function(game){};
gameOverScreen.prototype = {
     create: function(){    
          var lifes = intentos;
          var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backsplash");
          titleBG.tint = bgColors[0];
          document.body.style.background = colorbg;

          var aplausos = game.add.audio("aplausos");
         
          localStorage.setItem(localStorageName,JSON.stringify({
               vidas: lifes,
               victoria: victorias
     	}));

          savedData = localStorage.getItem(localStorageName)==null?{registro: false,vidas:0, victoria:false}:JSON.parse(localStorage.getItem(localStorageName));
          
          if (lifes >= 1){

               // ESCENA GANASTE
               if(savedData.victoria){   
                    game.add.bitmapText(game.width / 2, 100 , "font", titulo[0], titulo[1]).anchor.x = 0.5;
                    game.add.bitmapText(game.width / 2 -20, 220 , "font", "??FELICIDADES!" , 70).anchor.x = 0.5;
                    game.add.bitmapText(game.width / 2 -10, 300 , "font", "??Solicita tu premio! " , 60).anchor.x = 0.5;
                    game.add.bitmapText(game.width / 2, 220 , "font", " " , 70).anchor.x = 0.5;

                    var trofeo = game.add.image(game.width /2, game.height /2 + 150, "trofeo");
                    trofeo.anchor.set(0.5);
                    trofeo.angle = (-3);

                    var giraTween = game.add.tween(trofeo).to({
                         angle: 3
                    }, 2000, "Linear", true, 0, -1); 
                    giraTween.yoyo(true);
                    
                    var tween = game.add.tween(trofeo).to({
                         width: 250,
                         height:300
                    }, 2500, "Linear", true, 0, -1); 
                    tween.yoyo(true);

                    var atrasButton = game.add.button(100, game.height -100, "atras", this.returnRegistro);
                    atrasButton.width = "100";
                    atrasButton.height = "100";
                    atrasButton.anchor.set(0.5);
                    var tween = game.add.tween(atrasButton).to({
                         width: 90,
                         height: 90
                    }, 1500, "Linear", true, 0, -1); 
                    tween.yoyo(true);
                    
                    aplausos.play();
                    this.fuegosArtificiales();
                    game.time.events.loop(1000, this.fuegosArtificiales, this);

                   
               }

               //ESCENA SIGUE INTENTANDO MI NI??O!!! CONFIA EN TI MISMO <3
               else{
                    game.add.bitmapText(game.width / 2, 100 , "font", titulo[0], titulo[1]).anchor.x = 0.5;
                    game.add.bitmapText(game.width / 2, 200 , "font", sigueintentado[0], sigueintentado[1]).anchor.x = 0.5;
                    var division = game.width/(lifes + 1); 
                    var divisionprevia = division;
                    for(var i = 0; i<lifes; i++){
                         game.add.image(division, game.height/2 -100 , "vida").anchor.x = 0.5;
                         division = division + divisionprevia;
                    }
                    game.add.bitmapText(game.width / 2, game.height -400 , "font", intentostext[0], intentostext[1]).anchor.x = 0.5;
                    var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton1", this.startGame);
                    playButton.anchor.set(0.5);
                    var tween = game.add.tween(playButton).to({
                    width: 220,
                    height:220
                    }, 1500, "Linear", true, 0, -1); 
                    tween.yoyo(true);

                    var atrasButton = game.add.button(100, game.height -100, "atras", this.returnMenu);
                    atrasButton.width = "100";
                    atrasButton.height = "100";
                    atrasButton.anchor.set(0.5);
                    var tween = game.add.tween(atrasButton).to({
                         width: 90,
                         height:90
                    }, 1500, "Linear", true, 0, -1); 
                    tween.yoyo(true);
               }
          }

          //TE QUIEDASTE SIN INTENTOS
          else if (lifes <= 0){
               game.add.bitmapText(game.width / 2, 100 , "font", titulo[0], titulo[1]).anchor.x = 0.5;
               game.add.bitmapText(game.width / 2, 280 , "font", agradece[0], agradece[1]).anchor.x = 0.5;
               game.add.bitmapText(game.width / 2, 220 , "font", sinintento[0], sinintento[1]).anchor.x = 0.5;
               game.add.bitmapText(game.width / 2, game.height/2 +150 , "font", proxima[0], proxima[1]).anchor.x = 0.5;

               var atrasButton = game.add.button(game.width/2, game.height -100, "atras", this.returnRegistro);
               atrasButton.width = "100";
               atrasButton.height = "100";
               atrasButton.anchor.set(0.5);
               var tween = game.add.tween(atrasButton).to({
                    width: 200,
                    height:200
               }, 1500, "Linear", true, 0, -1); 
               tween.yoyo(true);
          }

          
     },

     startGame: function(){
          game.sound.stopAll();          
          game.state.start("HowToPlay");
     },
     returnMenu: function(){
          game.sound.stopAll();
          window.location.href = '../menu';
     },
     returnRegistro: function(){
          game.sound.stopAll();
          window.location.href = '../';
     },
     
     fuegosArtificiales: function(){

          var explosionesvec = ["particulas", "particula2"];

          var sonidoCuete = ["cuete2"];

          var explosionSound = game.add.audio(sonidoCuete[game.rnd.between(0,sonidoCuete.length-1)]);
          explosionSound.play();
          

          var explosionEmitter = game.add.emitter(game.rnd.between(200, game.width ), game.rnd.between (200, game.height-100), 100);
          explosionEmitter.makeParticles(explosionesvec[game.rnd.between(0,explosionesvec.length-1)]);
          explosionEmitter.setAlpha(0.5, 1);
          explosionEmitter.setXSpeed(400, -400);
          explosionEmitter.setYSpeed(500, -500);

          explosionEmitter.setRotation(180, 40);
          explosionEmitter.setScale(2, 0.5, 2, 0.5, 3200, Phaser.Easing.None);

          explosionEmitter.start(true, 3200, null, 100);

     }
}


function preparacion(){
    var seleccion = game.rnd.between(0,3);
    secuenciaList.push(seleccion);
    console.log(secuenciaList);

}

function iluminar(){


    setTimeout(function(){



        for (i in secuenciaList ){
            var tiempo1 = i * 1000
		  var tiempo2 = tiempo1 + 500; 
            algo = secuenciaList[i];

        if (algo == 0){
               setTimeout(function() {game.add.tween(a).to({
                    alpha:1,
                    height:170,
                    width:170
               }, 500, Phaser.Easing.Linear.None, true);
               game.add.audio("a1").play();},tiempo1);
			setTimeout(function() {game.add.tween(a).to({
                    alpha:0.5,
                    width:150,
                    height:150
               }, 250, Phaser.Easing.Linear.None, true);},tiempo2);
        }
        if (algo == 1){

               setTimeout(function() {game.add.tween(b).to({
                    alpha:1,
                    width:170,
                    height:170
               }, 500, Phaser.Easing.Linear.None, true);
               game.add.audio("a2").play();},tiempo1);
               setTimeout(function() {game.add.tween(b).to({
                    alpha:0.5,
                    width:150,
                    height:150
               }, 250, Phaser.Easing.Linear.None, true);},tiempo2);
        }
        if (algo == 2){

               setTimeout(function() {game.add.tween(c).to({
                    alpha:1,
                    width:170,
                    height:170
               }, 500, Phaser.Easing.Linear.None, true);
               game.add.audio("a3").play();},tiempo1);
               setTimeout(function() {game.add.tween(c).to({
                    alpha:0.5,
                    width:150,
                    height:150
               }, 250, Phaser.Easing.Linear.None, true);},tiempo2);
        }
        if (algo == 3){

               setTimeout(function() {game.add.tween(d).to({
                    alpha:1,
                    width:170,
                    height:170
               }, 500, Phaser.Easing.Linear.None, true);
               game.add.audio("a4").play();},tiempo1);
               setTimeout(function() {game.add.tween(d).to({
                    alpha:0.5,
                    width:150,
                    height:150
               }, 250, Phaser.Easing.Linear.None, true);},tiempo2);
        }

        
        setTimeout(function() {puedeJugar=true},((secuenciaList.length-1)* 1000)+500);
    }


    }, 1000);


}


