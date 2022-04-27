var bg, bgImg
var bottomGround,topGround,leftWall,rightWall;
var topObs, topObs1, topObs2;
var bottomObs, botObs1, botObs2, botObs3;
var balloon, balloonImg;
var jump,life,gameState,touchedL,score;

function preload(){
bgImg = loadImage("assets/bg.png")

jump = loadSound("assets/jump.mp3")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

topObs1 = loadImage("assets/obsTop1.png")
topObs2 = loadImage("assets/obsTop2.png")

botObs1 = loadImage("assets/obsBottom1.png")
botObs2 = loadImage("assets/obsBottom2.png")
botObs3 = loadImage("assets/obsBottom3.png")
}

function setup(){

createCanvas(windowWidth,windowHeight)

topObs = createGroup();
bottomObs = createGroup();

//Crear bases superiores e inferiores
bottomGround = createSprite(width/2,height,width,20);
bottomGround.visible = false;

topGround = createSprite(width/2,0,width,20);
topGround.visible = false;

leftWall = createSprite(0,height/2,70,height);
rightWall = createSprite(width,height/2,70,height);
      
//Crear globo      
balloon = createSprite(100,height-100,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.5;

life = 1000;
gameState = 0;
touchedL = false;
score = 0;

}

function draw() {

  background(bgImg);

  if(gameState == 0){
    fill("black");
    textSize(30)
    text("Presiona Enter para iniciar",width/2-150,height/2);
    if(keyDown("enter")){
      reset();
      gameState = 1;
    }
  }else if(gameState == 1){

    if(frameCount % 100 == 0){
      var option = Math.round(random(1,2));
      if(option == 1){
        topSpawn()
      }else{
        bottomSpawn();
      }
    }
          
    if(keyDown("space")) {
    balloon.velocityY= -2;     
    }else{
      balloon.velocityY = 2;
    }

    if(balloon.isTouching(topObs)||balloon.isTouching(bottomObs)){
      life -= 10;
      if(life <= 0){
        gameState = 2;
      }

    }

    if(balloon.isTouching(leftWall)){
      touchedL = true;
      balloon.velocityX = 4;
      topObs.setVelocityXEach = -3;
      bottomObs.setVelocityXEach = -3;
    }else if(balloon.isTouching(rightWall)){
      touchedL = false;
      balloon.velocityX = -4;
      topObs.setVelocityXEach = 3;
      bottomObs.setVelocityXEach = 3;
    }

    
  } else if(gameState == 2){
    fill("black");
    textSize(30)
    text("Perdiste, presiona Enter para volver a intentarlo",width/2-150,height/2)
    if(keyDown("enter")){
      reset();
      gameState = 1;
    }
  }

  Score();

  balloon.collide(bottomGround);
  balloon.collide(topGround);
   
  drawSprites();
  
}

function topSpawn(){
  var y = random(130,height/2-75)
  var img = Math.round(random(1,2))
  var obs = createSprite(width+60,y)

  obs.setCollider("rectangle");
  obs.depth = balloon.depth-1;
  obs.lifetime = width/2;

  if(touchedL == true){
    obs.velocityX = -3
    if(img == 1){
      obs.addImage(topObs1)
      obs.scale = .3;
    }else{
      obs.addImage(topObs2)
      obs.scale = .2
    }
  }else{
    obs.velocityX = 3
    obs.x = -60
    obs.addImage(topObs1)
    obs.scale = .3;
  }

  topObs.add(obs);
}

function bottomSpawn(){
  var y = 0
  var img = Math.round(random(1,3))
  var obs = createSprite(width+60,y)

  obs.setCollider("rectangle")
  obs.depth = balloon.depth-1;
  obs.lifetime = width/2;

  if(touchedL == true){
    obs.velocityX = -3
  }else{
    obs.velocityX = 3
    obs.x = -60
  }

  if(img == 1){
    obs.addImage(botObs1)
    obs.scale = .2;
    obs.y = height-170;
    
  }else if(img == 2){
    obs.addImage(botObs2)
    obs.scale = .1;
    obs.y = height-75;
  }else{
    obs.addImage(botObs3)
    obs.scale = .2
    obs.y = height-180;
  }

  bottomObs.add(obs);
}

function reset(){
  life = 1000;
  score = 0
  balloon.x = 100;
  balloon.y = height-100;
  bottomObs.destroyEach();
  topObs.destroyEach();
}

function Score(){
  if(gameState == 1){
      if(balloon.isTouching(leftWall)||balloon.isTouching(rightWall)){
      score += 1;
    }
  }
  

  textFont("algerian");
  textSize(30);
  fill("yellow");
  text("Puntuación: "+score,width-300,height/8)
}