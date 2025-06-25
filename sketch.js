// ---------------------------------------------------------------------------
// Global Variables
// ---------------------------------------------------------------------------


let state = 0;
let question_input;
let user_answer;
let RANquestion;
let RANobject

let cannonU
let cannonR
let cannonL

let RANasteroidY;
let RANasteroidX;

// Value configeration
let numStars = 100;
let shotLife = 100
let bullet_speed = 20
let bullets_add = 30
let asteroid_speedL = 0.3
let asteroid_speedH = 3
let asteroid_rate = 80;

// Counters
let bullets = bullets_add
let asteroid_timer = 0;
let shoot_timer = 40;
let score = 0
let life = 3

// Lists
let stars = [];
let asteroid_spawn = [];
let asteroid_store = [];
let bullet_store = [];
let asteroid_type = [];


// ---------------------------------------------------------------------------
// Pre-defined Functions
// ---------------------------------------------------------------------------

// ------------- User interaction functions -------------------------------

function rotate_ship() {
  if (kb.pressing(LEFT_ARROW)) {
    PirateShip.rotation -= 3;
  }
  if (kb.pressing(RIGHT_ARROW)) {
    PirateShip.rotation += 3
  }
}

function shooting() {
  
if (shoot_timer >= 30) {
  if (kb.released(UP_ARROW)) {
    if (bullets <= 0) {
      bullets = 0;
      return;
    }
    Xcannon = cos(PirateShip.rotation);
    Ycannon = sin(PirateShip.rotation);

    cannonU = createSprite(
      PirateShip.position.x, 
      PirateShip.position.y
    );
    cannonU.layer = "0";
    cannonU.color = "white";
    cannonU.direction = PirateShip.rotation - 90;
    cannonU.speed = bullet_speed;
    cannonU.diameter = 11;
    cannonU.life = shotLife;

    bullets -= 1;
    ShootSound.setVolume(0.3);
    ShootSound.play();
    shoot_timer = 0
  }

    if (kb.released("space")) {
      if (bullets <= 0) {
        bullets = 0;
        return;
      }
      Xcannon = cos(PirateShip.rotation);
      Ycannon = sin(PirateShip.rotation);

      // Right cannon
      cannonR = createSprite(
        PirateShip.position.x + Xcannon * 30,
        PirateShip.position.y + Ycannon * 30
      );
      cannonR.color = "white";
      cannonR.direction = PirateShip.rotation;
      cannonR.speed = bullet_speed;
      cannonR.diameter = 11;
      cannonR.life = shotLife;

      // Left cannon
      cannonL = createSprite(
        PirateShip.position.x - Xcannon * 30,
        PirateShip.position.y - Ycannon * 30
      );
      cannonL.color = "white";
      cannonL.direction = PirateShip.rotation - 180;
      cannonL.speed = bullet_speed;
      cannonL.diameter = 11;
      cannonL.life = shotLife;

      bullets -= 2;
      shoot_timer = 0;
      ShootSound.setVolume(0.3);
      ShootSound.play();
    }
  }
  shoot_timer += 1;
}



function reload(){
  if (kb.released("R")){
    questions()
  }
}
  
  
// ------------- General game functions -------------------------------

function stars_move(){
    background(0); 
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    fill(255);
    noStroke();
    ellipse(star.x, star.y, 2, 2); 
    star.y += star.speed;

    if (star.y > height) {
      star.y = 0;
      star.x = random(width); 
    }
  }
}
  
function asteroids(){
 
  if (asteroid_timer >= asteroid_rate){
    asteroid_spawn = [
      [RANasteroidX,0],
      [RANasteroidX,height],
      [0,RANasteroidY],
      [width, RANasteroidY]
    ]
    asteroid_type = [Asteroid, Asteroid, Asteroid, 
                     Asteroid, Asteroid, Asteroid, 
                     Asteroid, Asteroid, Asteroid, 
                     Asteroid, Asteroid, Asteroid, 
                     Asteroid, Asteroid, Astronaut,
                     Alien, FlyingSaucer]
    
    RANobject = int(random(asteroid_type.length))
  
    RANasteroidX = random(width)
    RANasteroidY = random(height)
    RANindex = int(random(3))
    asteroidX = asteroid_spawn[RANindex][0]
    asteroidY = asteroid_spawn[RANindex][1]

    asteroid = createSprite(asteroidX,asteroidY)
    asteroid.image = asteroid_type[RANobject]
    
    if (asteroid.image == Asteroid){
      asteroid.scale = random(0.5,1.5)
    }
    else {
      asteroid.scale = 0.6
    }
    asteroid.rotationSpeed = random(0,2)
    asteroidG.add(asteroid)
    
    if (asteroidY == 0) {
      asteroid.vel.y = random(asteroid_speedL, asteroid_speedH)
      asteroid.vel.x = random(-1,1)
    } 
    else if(asteroidY == height){
      asteroid.vel.y = random(-asteroid_speedL, -asteroid_speedH)
      asteroid.vel.x = random(-1,1)     
    }
    else if (asteroidX == 0){
      asteroid.vel.y = random(-1,1)
      asteroid.vel.x = random(asteroid_speedL, asteroid_speedH)     
    }
    else if (asteroidX == height){
      asteroid.vel.y = random(-1,1)
      asteroid.vel.x = random(-asteroid_speedL, -asteroid_speedH)
    }
    asteroid_timer = 0
  }
  asteroid_timer += 1
}

function DecideScore(ast){
      if (asteroidG[ast].image == Asteroid){
        score += 100
      }
      else if (asteroidG[ast].image == Astronaut){
        score -= 400
      }
      else {
        score += 200
      }
      asteroidG[ast].remove()
}

function collision_detect() {
    for (let ast = 0; ast < asteroidG.length; ast++){
      if (cannonR.overlap(asteroidG[ast])){
        DecideScore(ast)
        cannonR.remove()
      } 
      else if (cannonL.overlap(asteroidG[ast])){
        DecideScore(ast)
        cannonL.remove()
      }
      else if (cannonU.overlap(asteroidG[ast])){
        DecideScore(ast)
        cannonU.remove()
      }
      else if (PirateShip.overlaps(asteroidG[ast])) {
        window.alert("You've been hit! -1 life")
        life -= 1
        bullets = 30
        asteroidG.removeAll()
      }
  } 
}

function level(){
  if (frameCount == 1800){
    asteroid_rate = 60
    asteroid_speedL = 0.8
    asteroid_speedH = 3.5
  }
  else if (frameCount == 3600){
    asteroid_rate = 40
    asteroid_speedL = 1.8
    asteroid_speedH = 4.5
  }
  else if (frameCount == 5400){
    asteroid_rate = 20
    asteroid_speedL = 2.3
    asteroid_speedH = 5
  }
}
  
// ------------- Menu buttons/text functions -------------------------------

function main_menu_text(){
  menuText = new Sprite(400,130,300,120,'k')
  menuText.layer = "1"
  menuText.color.setAlpha(0)
  menuText.textColor = ('white')
  menuText.textStroke = 100
  menuText.text = "Space's First Pirate"
  menuText.textSize = 100
  textFont("Blackadder ITC")
}

function play_game_button(){
  startButton = new Sprite(400,290,300,120,'k')
  startButton.layer = "1"
  startButton.color.setAlpha(0)
  startButton.textColor = ('white')
  startButton.textStroke = 100
  startButton.text = "Play Game"
  startButton.textSize = 70
  textFont("Blackadder ITC")
}

function rules_button(){
  rulesButton = new Sprite(400,430,300,120,'k')
  rulesButton.layer = "1"
  rulesButton.color.setAlpha(0)
  rulesButton.textColor = ('white')
  rulesButton.textStroke = 100
  rulesButton.text = "Rules"
  rulesButton.textSize = 70
  textFont("Blackadder ITC")
}
  
function rules(){
  rule = new Sprite(400,300,400,300)
  rule.layer = "2"
  rule.image = (Rules)
  rule.scale = 0.8
  rule.static = false
  ruleG.add(rule)
  if (ruleG.length > 1){
    ruleG[0].remove()
  }
}
  
function menu_back(){
  Back = new Sprite(100,40,300,120,'k')
  Back.layer = "2"
  Back.color.setAlpha(0)
  Back.textColor = ('black')
  Back.textStroke = 100
  Back.text = "M to go back"
  Back.textSize = 30
  textFont("Blackadder ITC")
  BackG.add(Back)
  if (BackG.length > 1){
    BackG[0].remove()
  }
}

// ---------------------------------------------------------------------------
// Pre-defined Functions
// ---------------------------------------------------------------------------

function preload() {
  PirateShip = loadImage("Assets/Pirate Ship.png");
  PirateShipArrows = loadImage("Assets/Pirate Ship Arrows.png")
  Asteroid = loadImage("Assets/asteroid.svg");
  Rules = loadImage("Assets/Rules.png");
  Astronaut = loadImage("Assets/Astronaut.svg")
  Alien = loadImage("Assets/Alien.svg")
  FlyingSaucer = loadImage("Assets/FlyingSaucer.svg")
  
  ShootSound = loadSound("Assets/sound_shooting.wav")
  BackgroundMusic = loadSound("Assets/sound_music.wav")
  ClickSound = loadSound("Assets/sound_click.wav")
}

// ------------- Main Menu ---------------------------------------

// Main menu setup()
function setup(){
  createCanvas(800,600);
  
  // Sound configuration
  BackgroundMusic.setVolume(1)
  ClickSound.setVolume(1)
  BackgroundMusic.play()
  BackgroundMusic.loop();
  
  // Defining sprites
  asteroidG = new Group()
  ruleG = new Group()
  BackG = new Group()
  
  cannonU = new Sprite(-500,-50)
  cannonR = new Sprite(-500,-50)
  cannonL = new Sprite(-500,-50)
  asteroid = new Sprite(-500,-50)

  // Main menu buttons/texts
  play_game_button()
  rules_button()
  main_menu_text()

  
  // Initialize stars with random positions
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      speed: random(0.1, 2) // Random speed for variation
    });
  }
}

// ------------- Starting of game ---------------------------------------

function draw(){
  stars_move()
  
  if(state == 0){
    // Menu/ Game Setup()
    if(startButton.mouse.pressed()){
      ClickSound.play()
      
      // Create PirateShip sprite
      PirateShip = createSprite(width / 2, height / 2);
      PirateShip.image = "Assets/Pirate Ship Arrows.png";
      PirateShip.scale = 0.7;
      PirateShip.collider = 'static'
      PirateShip.addSensor(1, 4, 28, 100)
      // PirateShip.debug = true
      
      // Start game once button is pressed
      startButton.remove()
      rulesButton.remove()
      menuText.remove()
      state = 1 
    }
    else if (rulesButton.mouse.pressed()){
      ClickSound.play()
      state = 2
    }
  }
  
  else if (state == 2){
    rules()
    menu_back()
    if(kb.pressed("M")){
      ClickSound.play()
      rule.remove()
      Back.remove()
      state = 0
    }
  }
  else if(state == 1){
  
    // Game draw()
    stars_move()
    rotate_ship()
    shooting()
    asteroids()
    collision_detect()
    level()
    
  
    
    if (life <= 0){
      window.alert("GAME OVER\n\nYou've lost all lives😔\nYou survived for "+round(frameCount/60)+" seconds!\nYou got a score of: "+score+"\n\nPress 'Ok' to play again!")
        life = 3
        location.reload()
    }
    
    // Reload text if no bullets
    if (bullets <= 0){
      bullets = 0
      text("Click R to reload",275,150)
      reload()
    }
    // Screen counters
    noStroke();
    fill(255); //fill set to white
    textSize(40);
    text("Bullets: "+bullets, 30,50);
    text("Score: "+score, 330,50);
    text("Lives: "+life,630,50);
  }
}
