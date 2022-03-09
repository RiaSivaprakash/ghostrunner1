var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
 

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
  climbersGroup=createGroup()
  doorsGroup=createGroup()
  invisibleBlockGroup=createGroup()
}

function spawnDoors()
{
  if (frameCount%150===0)
  {
    door=createSprite(random(150,450),5)
    door.addImage("door",doorImg);
    door.velocityY = 2;

    climber=createSprite(door.x,door.y+70);
    climber.addImage("climber",climberImg);
    climber.velocityY = 2;

    invisibleBlock=createSprite(door.x,door.y+80,140,20);
    invisibleBlock.velocityY = 2;
    invisibleBlock.visible = false;
    
    climbersGroup.add(climber)
    doorsGroup.add(door)
    invisibleBlockGroup.add(invisibleBlock)

  }
}

function draw() {
  background(200);
  
  if(gameState==="play")
  {
    if(keyDown("UP_ARROW"))
  {
    ghost.y=ghost.y-3
  }
  
  if(keyDown("DOWN_ARROW"))
  {
    ghost.y=ghost.y+3
  }

  if(keyDown("RIGHT_ARROW"))
  {
    ghost.x=ghost.x+3
  }

  if(keyDown("LEFT_ARROW"))
  {
    ghost.x=ghost.x-3
  }
 
  if(keyDown("space"))
  {
    ghost.velocityY=-10
  }

  ghost.velocityY=ghost.velocityY+0.5

    spawnDoors()
  if(tower.y > 400){
      tower.y = 300
    }
  }

  if(ghost.isTouching(invisibleBlockGroup))
  {
    gameState = "GAMEOVER"
  }

  drawSprites()
  
  if(gameState==="GAMEOVER")
  {
    background("black");
    text("GAME OVER",300,300)
  }
}
