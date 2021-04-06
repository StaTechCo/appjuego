// Settings 
// Ajustes de juego  
var titulo = "TELCEL";
var subtitulo = "Presiona Game";
var colorbackground = "003F84";                        // Color de fondo laterales hexadecimal
var intentos = 3;

var tiempojuego = 10; 
var tunnelWidth = 450;                                 // Ancho del tunel de juego

var acabadeGanar = false;
var vmin = 500;
var vmax = 1250;
var victorias = 0;

var repAplausos = false;
var puntos;
var puntosmeta = 5;
var game;
var tiempo;
var savedData;
var gameTimer = 0;   

var colorbg = "#"+colorbackground;   
var bgColors = ["0x"+colorbackground];                         

var pathArray = window.location.pathname.split('/');
var secondLevelLocation = pathArray[1];
var localStorageName = secondLevelLocation + "game2";


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
          game.load.image("playbutton1", "../common/sprites/playbutton.png");
          game.load.image("backsplash", "../common/sprites/backsplash.png");
          game.load.image("paredes", "../common/sprites/wall.png");
          game.load.image("particulas", "../common/sprites/smoke.png");
          game.load.image("particula2", "../common/sprites/amarillo.png");
          game.load.image("bg",   "../common/sprites/bg.png");
          game.load.image("vida", "../common/sprites/vidas.png");
          game.load.image("atras", "../common/sprites/atras.png");
          game.load.bitmapFont("font", "../common/fonts/font_0.png", "../common/fonts/font.fnt");
          game.load.audio("cuete1", ["../common/sounds/Cuete1.mp3"]);
          game.load.audio("cuete2", ["../common/sounds/Cuete2.mp3"]);
          game.load.audio("aplausos", ["../common/sounds/aplausos.mp3"]);

          game.load.image("pelota", "assets/sprites/pelota.png");
          game.load.image("freddy", "assets/sprites/freddy.png");
          

          game.load.audio("bgmusic", ["assets/sounds/smilin and vibin.mp3"]);   
          game.load.audio("explosion", ["assets/sounds/explosion.mp3", "assets/sounds/explosion.ogg"]);
          game.load.audio("winpunto", ["assets/sounds/winpunto.mp3"]);
	},
  	create: function(){
		this.game.state.start("TitleScreen");
	}
}

var titleScreen = function(game){};
titleScreen.prototype = {  
     create: function(){  
          savedData = localStorage.getItem(localStorageName)==null?{vidas:intentos, victoria:0}:JSON.parse(localStorage.getItem(localStorageName)); 
          
          var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backsplash");
          titleBG.tint = bgColors[0];
          document.body.style.background = colorbg;

          game.add.bitmapText(game.width/2,50,"font", titulo,200).anchor.x = 0.5;
          game.add.bitmapText(game.width/2,230,"font", subtitulo,80).anchor.x = 0.5;
          
        
          victorias = savedData.victoria;
          intentos = savedData.vidas;

          if (savedData.vidas >= 1){    
               if(savedData.victoria > 0){
                    game.state.start("GameOverScreen");
               } 
               else{
                    var division = game.width/(savedData.vidas + 1); 
                    var divisionprevia = division;
                    for(var i = 0; i<savedData.vidas; i++){
                         game.add.image(division, game.height/2 -100 , "vida").anchor.x = 0.5;
                         division = division + divisionprevia;     
                    }
                    // Regresar seleccion nivel 
                    game.add.bitmapText(game.width / 2, game.height -400 , "font", "Intentos restantes", 70).anchor.x = 0.5;
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
          else if (savedData.vidas <= 0) {
              game.state.start("GameOverScreen");
          }

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
          game.add.bitmapText(game.width / 2, 100 , "font", "Consigue " + puntosmeta.toString() + " puntos en", 70).anchor.x = 0.5;
          game.add.bitmapText(game.width/2, 200, "font", tiempojuego.toString() + " s", 80).anchor.x = 0.5;

          game.add.bitmapText(game.width / 2, 300 , "font", "Presiona Pelotas para hacer puntos!", 50).anchor.x = 0.5;
          game.add.bitmapText(game.width / 2, 350 , "font", "Evita los emojis enojados!", 50).anchor.x = 0.5;
          
          var pelotatuto = game.add.sprite(game.width / 2 - 150, 500, "pelota");
          pelotatuto.anchor.set(0.5);
          pelotatuto.scale.set(0.2);
          var pelotatutoTween = game.add.tween(pelotatuto).to({
               y: game.height / 2 + 100
          }, 500, "Linear", true, 0, -1); 
          pelotatutoTween.yoyo(true); 

          var enojadotuto = game.add.sprite(game.width / 2 + 150, 500, "freddy");
          enojadotuto.anchor.set(0.5);
          enojadotuto.scale.set(0.2);
          var enojadotutoTween = game.add.tween(enojadotuto).to({
               y: game.height / 2 + 100
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

var playGame = function(game){};
playGame.prototype = {  
     create: function(){

//          this.bgMusic = game.add.audio("bgmusic");
//          this.bgMusic.loopFull(1);

          tiempo = tiempojuego;
          puntos = 0;
          savedData = localStorage.getItem(localStorageName)==null?{vidas:intentos, victoria: 0}:JSON.parse(localStorage.getItem(localStorageName));

          var tintColor = bgColors[0];
          document.body.style.background = colorbg;
          var tunnelBG = game.add.tileSprite(0, 0, game.width, game.height, "bg");
          
          this.barrierGroup = game.add.group(); 
          this.addBarrier(this.barrierGroup, tintColor);

          var leftWallBG = game.add.tileSprite(- tunnelWidth / 2, 0, game.width / 2, game.height, "paredes");
          leftWallBG.tint = tintColor;
          var rightWallBG = game.add.tileSprite((game.width + tunnelWidth) / 2, 0, game.width / 2, game.height, "paredes");
          rightWallBG.tint = tintColor;
          rightWallBG.tileScale.x = -1;

          this.tiempoText = game.add.bitmapText(game.width / 2,100,"font","Tiempo Restante",60).anchor.x = 0.5;
          this.tiemporestante = game.add.bitmapText(game.width/2,180,"font",tiempojuego.toString(),120);
          this.tiemporestante.anchor.x = 0.5;

          this.puntosActuales = game.add.bitmapText(game.width/2,game.height -200, "font", puntos.toString() + "/" + puntosmeta.toString(),100);
          this.puntosActuales.anchor.x = 0.5;

          game.time.events.loop(1000, this.updateTiempo,  this);
          
     },




     update: function(){

          gameTimer = gameTimer + 1;
          this.puntosActuales.text = puntos.toString() + "/" + puntosmeta.toString();







          if (tiempo <= 0 && puntos < puntosmeta){
               intentos -= 1;
  //             this.bgMusic.stop();
               game.state.start("GameOverScreen");
          }
          if ( puntos >= puntosmeta){
               victorias+=1;
               acabadeGanar = true;
               game.state.start("GameOverScreen");

          }


     },
     updateTiempo: function(){
          tiempo -= 1;
          this.tiemporestante.text = tiempo.toString();

     },


     addBarrier: function(group, tintColor){              
          var barrier = new Barrier(game, game.rnd.between(vmin,vmax));
          game.add.existing(barrier);
          group.add(barrier); 
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

          savedData = localStorage.getItem(localStorageName)==null?{vidas:intentos, victoria: 0}:JSON.parse(localStorage.getItem(localStorageName));
          
          if (lifes >= 1){
               if(savedData.victoria > 0){
                   
                    game.add.bitmapText(game.width / 2, 100 , "font", "TELCEL", 120).anchor.x = 0.5;
                    game.add.bitmapText(game.width / 2, 220 , "font", "VICTORIAS: " + savedData.victoria.toString(), 70).anchor.x = 0.5;
                    // Regresar seleccion nivel 
                    game.add.bitmapText(game.width / 2, game.height/2 + 100, "font", "Juegos disponibles", 70).anchor.x = 0.5;
                    var division = game.width/(lifes + 1); 
                    var divisionprevia = division;
                    for(var i = 0; i<lifes; i++){
                         game.add.image(division, game.height/2 -100 , "vida").anchor.x = 0.5;
                         division = division + divisionprevia;
                    }
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


                    // AQUI ACABAMOS DE GANAR ------------------------------------------------------------------------

                    if (acabadeGanar == true) {
                         
                         repAplausos = true;
                         aplausos.play();


                         this.fuegosArtificiales();
                         game.time.events.loop(1000, this.fuegosArtificiales, this);

                    }
                    
                    
               }
               else{
                    game.add.bitmapText(game.width / 2, 100 , "font", "TELCEL", 120).anchor.x = 0.5;
                    game.add.bitmapText(game.width / 2, 200 , "font", "Buen intento!!", 80).anchor.x = 0.5;
                    var division = game.width/(lifes + 1); 
                    var divisionprevia = division;
                    for(var i = 0; i<lifes; i++){
                         game.add.image(division, game.height/2 -100 , "vida").anchor.x = 0.5;
                         division = division + divisionprevia;
                    }
                    game.add.bitmapText(game.width / 2, game.height -400 , "font", "Intentos restantes", 70).anchor.x = 0.5;
                    var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton1", this.startGame);
                    playButton.anchor.set(0.5);
                    var tween = game.add.tween(playButton).to({
                    width: 220,
                    height:220
                    }, 1500, "Linear", true, 0, -1); 
                    tween.yoyo(true);
               }
          }
          else if (lifes <= 0){
               game.add.bitmapText(game.width / 2, 100 , "font", "TELCEL", 120).anchor.x = 0.5;
               game.add.bitmapText(game.width / 2, 280 , "font", "Gracias por participar!!", 80).anchor.x = 0.5;
               game.add.bitmapText(game.width / 2, 220 , "font", "Te quedaste sin intentos :C ", 60).anchor.x = 0.5;
               game.add.bitmapText(game.width / 2, game.height/2 +150 , "font", "Mucha suerte para la proxima!!!", 50).anchor.x = 0.5;
               var atrasButton = game.add.button(game.width / 2, game.height - 150, "atras", this.returnMenu);
               atrasButton.anchor.set(0.5);
               var tween = game.add.tween(atrasButton).to({
                    width: 220,
                    height:220
               }, 1500, "Linear", true, 0, -1); 
               tween.yoyo(true);
          }
     },

     startGame: function(){
          game.sound.stopAll();          

          game.state.start("HowToPlay");

          acabadeGanar = false;
     },
     returnMenu: function(){
          game.sound.stopAll();

          window.location.href = '../menu';
     },
     
     fuegosArtificiales: function(){

          var explosionesvec = ["particulas", "particula2"];

          var sonidoCuete = ["cuete1", "cuete2"];

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
          console.log(explosionesvec.length);


     }
}

function botonazo(){
     if (this.tipoboton == 0){
          puntos += 1;
          var winsound = game.add.audio("winpunto");
          winsound.play();
     }
     
     else {
          puntos-=1;
          var explosionSound = game.add.audio("explosion");
          explosionSound.play();
     }
     this.destroy();

}


Barrier = function (game, speed) {
     position = game.rnd.between((game.width - tunnelWidth) / 2 + 50, (game.width + tunnelWidth) / 2 - 50);
     boton = ["pelota","freddy"];
     botonaleatorio = game.rnd.between(0,1);


	Phaser.Sprite.call(this, game, position, -100, boton[botonaleatorio]);
	game.physics.enable(this, Phaser.Physics.ARCADE);

     this.tipoboton = botonaleatorio;

     this.anchor.set(0.5);
     //this.levelTint = tintColor;
     this.width = game.rnd.between(100,200);
     this.height = this.width;
     this.body.immovable = true;
     this.body.velocity.y = speed;
     this.placeBarrier = true;
     this.inputEnabled = true;
     this.events.onInputDown.add(botonazo,this);
};


Barrier.prototype = Object.create(Phaser.Sprite.prototype);
Barrier.prototype.constructor = Barrier;

Barrier.prototype.update = function(){
     if(this.placeBarrier && this.y > game.rnd.between(50,100)){
          this.placeBarrier = false;
          playGame.prototype.addBarrier(this.parent, this.levelTint);
     }   
     if(this.y > game.height){
          this.destroy();
     }
}