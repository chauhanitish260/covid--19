var PLAY = 1
var END  = 0 
var gameState = PLAY
var kid,kidImg,kid_collided,virus,virusImg,bg,bgImg,enemy,enemyImg;
var virusGroup,enemyGroup;
var death = 0;
var invisibleGround;

  
function preload (){
  kidImg = loadAnimation("kid_2_walking.png");
  virusImg = loadImage("virus.png");
  enemyImg = loadImage ("enemy.png");
  bgImg = loadImage ("bg.png");
  kid_collided = loadAnimation("kid_collided.png");
}




function setup() {
  createCanvas(1396,500);
  kid=createSprite(110, 390, 50, 50);
  kid.addAnimation("kid_2_walking",kidImg);
  kid.scale = 0.5;
  //kid.velocityX = 2;

  bg = createSprite(1396,0,1000,1000)
  bg.addImage("bg",bgImg);
  bg.scale=10
  

  
  invisibleGround =createSprite (100,500,2000,10);
  invisibleGround.visible = false;
  

  virusGroup =new Group ();
  enemyGroup = new Group();
 

  
  
}

function draw() {
  background(0); 
  
  if(gameState === PLAY){
    bg.velocityX = -4;


    if(bg.x<0){
      bg.x =bg.width/2
    }
    if(keyDown(RIGHT_ARROW)){
      kid.x= kid.x +2
    }
  if(keyDown(LEFT_ARROW)){
    kid.x= kid.x -2
  }
  if(keyDown(UP_ARROW) && kid.x<1000){
    kid.velocityY = -10;
  }
   kid.velocityY= kid.velocityY + 0.5
       
  }

  if(virusGroup.isTouching(kid)||enemyGroup.isTouching(kid)){
    gameState = END
   
  }
  else if(gameState=== END){
    
    kid.velocityX=0;
    virusGroup.destroyEach()
    enemyGroup.destroyEach()
    virusGroup.setLifetimeEach(-1);
    enemyGroup.setLifetimeEach(-1);
    kid.changeAnimation("collided",kid_collided)


  }
  spawnvirus();
  spawnenemy();
  kid.collide(invisibleGround)
  drawSprites();
  stroke("orange");
  fill("white");
  textSize(10);
  text("YOU DIED:" + death,1000,50);
}
function spawnvirus (){
  if(frameCount%240===0){
    var virus = createSprite(1200,120,20,20)
    virus.addImage(virusImg);
    virus.scale = 0.3;
    virus.velocityX = -2
    virus.y=Math.round(random(20,240))
    virus.lifetime = 1000;
    virusGroup.add(virus)
  }
}
function spawnenemy(){
  if(frameCount%100===0){
    var enemy = createSprite(1200,120,50,50)
    enemy.addImage(enemyImg);
    enemy.scale = 1;
    enemy.velocityY = -2
    enemy.x=Math.round(random(100,1250)) 
    enemy.y=Math.round(random(100,1000)) 
  }
}
