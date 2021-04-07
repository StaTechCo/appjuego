
var titulo = ["TELCEL", 120];
var subtitulo = ["Juego 1", 80];
var intentostext = ["Oportunidades", 70];
var metatext = ["Sobrevive", 80];
var tutorial1 = ["Presiona la pantalla o da click", 60];
var tutorial2 = ["para moverte izquierda/derecha", 55];
var sigueintentado = ["Buen intento", 80];
var agradece = ["Gracias por participar", 80];
var sinintento = ["Te quedaste sin intentos =(", 60];
var proxima = ["Mucha suerte para la proxima..", 50];
var colorbackground = "003F84"; // Color de fondo laterales hexadecimal
var intentos = 3;
var tiempojuego = 5; 
var tunnelWidth = 400;                                 // Ancho del tunel de juego
var shipHorizontalSpeed = 100;                         // Velocidad jugador de manera horizontal, mientras mas grande valor mas lento 
var shipMoveDelay = 0;                                 // Retardo para volver a mover al jugador 
var barrierSpeed = 550;                                // Velocidad inicial de obstaculos 
var barrierGap = 370;                                  // Distancia entre obstaculos 
var barrierIncreaseSpeed = 1.1;                        // Incremento de velocidad  obstaculos
var velocitybg = [1.5, 0.75, 1.25, 1.5];               // Velocidad decoracion de fondo  VALOR MAXIMO 2


var victorias = false;
var game;
var tiempo;
var savedData;
var gameTimer = 0;   
var colorbg = "#"+colorbackground;   
var bgColors = ["0x"+colorbackground];                
var pathArray = window.location.pathname.split('/');
var secondLevelLocation = pathArray[1];
var localStorageName = secondLevelLocation;


savedData = localStorage.getItem(localStorageName)==null?{registro: false,vidas:0, victoria:false}:JSON.parse(localStorage.getItem(localStorageName)); 
if (savedData.victoria || savedData.vidas == 0 || savedData.registro == false ){

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
          game.load.image("bg2",   "../common/sprites/bg.png");
          game.load.image("vida", "../common/sprites/vidas.png");
          game.load.image("atras", "../common/sprites/atras.png");
          game.load.bitmapFont("font", "../common/fonts/font_0.png", "../common/fonts/font.fnt");
          game.load.audio("cuete1", ["../common/sounds/Cuete1.mp3"]);
          game.load.audio("cuete2", ["../common/sounds/Cuete2.mp3"]);
          game.load.audio("aplausos", ["../common/sounds/aplausos.mp3"]);

          // Objetos personalizados de juego
          game.load.image("player", "assets/sprites/player.png");
          game.load.image("decorafondo", "assets/sprites/objetofondo.png");
          game.load.image("obstaculo", "assets/sprites/obstaculo.png");
          game.load.audio("bgmusic", ["assets/sounds/bgmusic.mp3"]);   

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
               division = division + divisionprevia;}
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
          game.add.bitmapText(game.width / 2, 50 , "font", metatext[0], metatext[1] ).anchor.x = 0.5;
          game.add.bitmapText(game.width/2, 150, "font", tiempojuego.toString() + " s", 80).anchor.x = 0.5;

          game.add.bitmapText(game.width / 2, 320 , "font", tutorial1[0], tutorial1[1]).anchor.x = 0.5;
          game.add.bitmapText(game.width / 2, 420 , "font", tutorial2[0], tutorial2[1]).anchor.x = 0.5;
          var horizontalShip = game.add.sprite(game.width / 2 - 100, 600, "player");
          horizontalShip.anchor.set(0.5);
          horizontalShip.scale.set(1);
          var horizontalShipTween = game.add.tween(horizontalShip).to({
               x: game.width / 2 + 100
          }, 500, "Linear", true, 0, -1); 
          horizontalShipTween.yoyo(true); 
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

          this.saveBarrierSpeed = barrierSpeed;
          this.bgMusic = game.add.audio("bgmusic");
          this.bgMusic.loopFull(1);

          tiempo = tiempojuego;
          savedData = localStorage.getItem(localStorageName)==null?{registro: false,vidas:0, victoria:false}:JSON.parse(localStorage.getItem(localStorageName));

          var tintColor = bgColors[0];
          document.body.style.background = colorbg;
          var fondo = game.add.image(0, 0, "bg2");
          fondo.height = game.height;

          this.cloud = game.add.image(50,game.rnd.between(100,game.height - 10),"decorafondo");
          this.cloud.anchor.set(0.5,0,5);
          this.cloud.height = 100;
          this.cloud.width = 100;
          this.cloud.alpha = 0.5;

          this.cloud2 = game.add.image(50,game.rnd.between(100,game.height - 10),"decorafondo");
          this.cloud2.anchor.set(0.5,0,5);
          this.cloud2.height = 75;
          this.cloud2.width = 75;
          this.cloud2.alpha = 0.3;

          this.cloud3 = game.add.image(50,game.rnd.between(100,game.height - 10),"decorafondo");
          this.cloud3.anchor.set(0.5,0,5);
          this.cloud3.height = 300;
          this.cloud3.width = 300;
          this.cloud3.alpha = 0.7;

          this.cloud4 = game.add.image(50,game.rnd.between(100,game.height - 10),"decorafondo");
          this.cloud4.anchor.set(0.5,0,5);
          this.cloud4.height = 150;
          this.cloud4.width = 150;
          this.cloud4.alpha = 0.3;



          var leftWallBG = game.add.tileSprite(- tunnelWidth / 2, 0, game.width / 2, game.height, "paredes");
          leftWallBG.tint = tintColor;
          var rightWallBG = game.add.tileSprite((game.width + tunnelWidth) / 2, 0, game.width / 2, game.height, "paredes");
          rightWallBG.tint = tintColor;
          rightWallBG.tileScale.x = -1;


          this.tiempoText = game.add.bitmapText(game.width / 2,100,"font",metatext[0],metatext[1]).anchor.x = 0.5;
          this.tiemporestante = game.add.bitmapText(game.width/2,180,"font",tiempojuego.toString(),180);
          this.tiemporestante.anchor.x = 0.5;

          this.barrierGroup = game.add.group(); 
          this.addBarrier(this.barrierGroup, tintColor);
          this.shipPositions = [(game.width - tunnelWidth) / 2 + 50, (game.width + tunnelWidth) / 2 - 50];
          this.ship = game.add.sprite(this.shipPositions[0], 660, "player");
          this.ship.side = 0;
          this.ship.destroyed = false;
          this.ship.canMove = true;
          this.ship.canSwipe = false;
          this.ship.anchor.set(0.5);

          game.physics.enable(this.ship, Phaser.Physics.ARCADE);
          game.input.onDown.add(this.moveShip, this);
          game.input.onUp.add(function(){this.ship.canSwipe = false;}, this);
          
          this.smokeEmitter = game.add.emitter(this.ship.x, this.ship.y + 70, 20);

          this.smokeEmitter.makeParticles("particulas");
          this.smokeEmitter.setXSpeed(-15, 15);
          this.smokeEmitter.setYSpeed(50, 150);
          this.smokeEmitter.setAlpha(0.5, 1);
          this.smokeEmitter.start(false, 1000, 40);

          game.time.events.loop(1000, this.updateTiempo,  this);
          this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
          this.spacebar.onDown.add(this.moveShip, this);  
          
     },
     moveShip: function(e){
          var isKeyboard = e instanceof Phaser.Key;   
          if(this.ship.canMove && !this.ship.destroyed){
               this.ship.canMove = false;
               this.ship.side = 1 - this.ship.side;
               var horizontalTween = game.add.tween(this.ship).to({ 
                    x: this.shipPositions[this.ship.side]
               }, shipHorizontalSpeed, Phaser.Easing.Linear.None, true);
               horizontalTween.onComplete.add(function(){
                    game.time.events.add(shipMoveDelay, function(){
                         this.ship.canMove = true;
                    }, this);
               }, this);

               var ghostShip = game.add.sprite(this.ship.x, this.ship.y, "player");
               ghostShip.alpha = 0.5;
               ghostShip.anchor.set(0.5);
               var ghostTween = game.add.tween(ghostShip).to({
                    alpha: 0
               }, 350, Phaser.Easing.Linear.None, true);
               ghostTween.onComplete.add(function(){
                    ghostShip.destroy();
               });
          }         
     },
     update: function(){

          this.cloud.x  += velocitybg[0];
          this.cloud2.x += velocitybg[1];
          this.cloud3.x += velocitybg[2];
          this.cloud4.x += velocitybg[3];

          gameTimer = gameTimer + 1;

       if (gameTimer >= 600){
               barrierSpeed *= barrierIncreaseSpeed;
               gameTimer = 0;
          }

          if (this.cloud.x >= game.width + 100){
               this.cloud.x = -100;
               this.cloud.y = game.rnd.between(100,game.height - 100);
               velocitybg[0]=Math.floor(Math.random() * 2) + 0.5;
               this.cloud.height = Math.floor(Math.random() * 300) + 75;
               this.cloud.width = this.cloud.height;
          }
          if (this.cloud2.x >= game.width + 100){
               this.cloud2.x = -100;
               this.cloud2.y = game.rnd.between(100,game.height - 100);
               velocitybg[1]=Math.floor(Math.random() * 2) + 0.5;
               this.cloud2.height = Math.floor(Math.random() * 300) + 75;
               this.cloud2.width = this.cloud2.height;
          }
          if (this.cloud3.x >= game.width + 100){
               this.cloud3.x = -100;
               this.cloud3.y = game.rnd.between(100,game.height - 100);
               velocitybg[2]=Math.floor(Math.random() * 2) + 0.5;
               this.cloud3.height = Math.floor(Math.random() * 300) + 75;
               this.cloud3.width = this.cloud3.height;
          }
          if (this.cloud4.x >= game.width + 100){
               this.cloud4.x = -100;
               this.cloud4.y = game.rnd.between(100,game.height - 100);
               velocitybg[3]=Math.floor(Math.random() * 2) + 0.5;
               this.cloud4.height = Math.floor(Math.random() * 300) + 75;
               this.cloud4.width = this.cloud4.height;

          }
          this.smokeEmitter.x = this.ship.x;
          this.smokeEmitter.y = this.ship.y+70;

          if(!this.ship.destroyed && this.ship.alpha == 1){
               game.physics.arcade.collide(this.ship, this.barrierGroup, null, function(s, b){  
                    if(!b.friendly){
                         intentos = intentos -1;
                         this.ship.destroyed = true;                         
                         this.smokeEmitter.destroy();
                         var destroyTween = game.add.tween(this.ship).to({
                              x: this.ship.x + game.rnd.between(-100, 100),
                              y: this.ship.y - 100,
                              rotation: 10
                         }, 1000, Phaser.Easing.Linear.None, true);
                         destroyTween.onComplete.add(function(){
                              this.bgMusic.stop();

                              this.ship.destroy();
                              game.time.events.add(Phaser.Timer.SECOND * 0.01, function(){
                                   barrierSpeed = this.saveBarrierSpeed;
                                   game.state.start("GameOverScreen");
                              }, this);
                         }, this);
                    }
               }, this)
          }
          if (tiempo <= 0){
               this.ship.destroyed = true;
               this.bgMusic.stop();
               this.ship.destroy();
               barrierSpeed = this.saveBarrierSpeed;
               game.state.start("GameOverScreen");
          }


     },
     updateTiempo: function(){
          tiempo -= 1;
          this.tiemporestante.text = tiempo.toString();
          if (tiempo <= 0){
               victorias = true;
          }
     },


     addBarrier: function(group, tintColor){              
          var barrier = new Barrier(game, barrierSpeed, tintColor);
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

         
          localStorage.setItem(localStorageName,JSON.stringify({
               vidas: lifes,
               victoria: victorias
     	}));

          savedData = localStorage.getItem(localStorageName)==null?{registro: false,vidas:0, victoria:false}:JSON.parse(localStorage.getItem(localStorageName));
          
          if (lifes >= 1){
               // Escena ganaste
               if(savedData.victoria){
                    game.add.bitmapText(game.width / 2, 100 , "font", titulo[0], titulo[1]).anchor.x = 0.5;
                    game.add.bitmapText(game.width / 2, 220 , "font", "FELICIDADES!!! " , 70).anchor.x = 0.5;
                    game.add.bitmapText(game.width / 2, 300 , "font", "Reclama tu premio!!! " , 60).anchor.x = 0.5;
                    game.add.bitmapText(game.width / 2, 220 , "font", " " , 70).anchor.x = 0.5;
                    var aplausos = game.add.audio("aplausos");
                    aplausos.play();
                    this.fuegosArtificiales();
                    game.time.events.loop(1000, this.fuegosArtificiales, this);
               }
               // ESCENA SIGUE INTENTANDO
               else{
                    game.add.bitmapText(game.width / 2, 100 , "font", titulo[0], titulo[1]).anchor.x = 0.5;
                    game.add.bitmapText(game.width / 2, 270 , "font", sigueintentado[0], sigueintentado[1]).anchor.x = 0.5;

                    var division = game.width/(lifes + 1); 
                    var divisionprevia = division;
                    for(var i = 0; i<lifes; i++){
                         game.add.image(division, game.height/2 -100 , "vida").anchor.x = 0.5;
                         division = division + divisionprevia;
                    }                 
                    game.add.bitmapText(game.width / 2, game.height -400 , "font", intentostext[0],intentostext[1]).anchor.x = 0.5;
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
          // ESCENA SIN INTENTOS
          else if (lifes <= 0){
               game.add.bitmapText(game.width / 2, 100 , "font", titulo[0], titulo[1]).anchor.x = 0.5;
               game.add.bitmapText(game.width / 2, 280 , "font", agradece[0],agradece[1]).anchor.x = 0.5;
               game.add.bitmapText(game.width / 2, 220 , "font", sinintento[0], sinintento[1]).anchor.x = 0.5;
               game.add.bitmapText(game.width / 2, game.height/2 +150 , "font", proxima[0], proxima[1] ).anchor.x = 0.5;   
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


     }    
}

Barrier = function (game, speed, tintColor) {
     var positions = [(game.width - tunnelWidth) / 2, (game.width + tunnelWidth) / 2];
     var position = game.rnd.between(0, 1);
	Phaser.Sprite.call(this, game, positions[position], -100, "obstaculo");
     var cropRect = new Phaser.Rectangle(0, 0, tunnelWidth / 2, 100);
     this.crop(cropRect);
	game.physics.enable(this, Phaser.Physics.ARCADE);
     this.anchor.set(position, 0.5);
     this.body.immovable = true;
     this.body.velocity.y = speed;
     this.placeBarrier = true;
};

Barrier.prototype = Object.create(Phaser.Sprite.prototype);
Barrier.prototype.constructor = Barrier;

Barrier.prototype.update = function(){
     if(this.placeBarrier && this.y > barrierGap){
          this.placeBarrier = false;
          playGame.prototype.addBarrier(this.parent, this.levelTint);
     }   
     if(this.y > game.height){
          this.destroy();
     }
}