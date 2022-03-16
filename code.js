var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["88dbcf5c-8312-4b7e-a1a7-783f7fc8a0a2","2c1543ba-06d0-4056-a2f6-38bf5e70855e","38bcc018-6625-4ac7-bbae-c5619646d541","7e009ea7-f71c-48dd-a9ce-ec959a02c481"],"propsByKey":{"88dbcf5c-8312-4b7e-a1a7-783f7fc8a0a2":{"name":"bola_s","sourceUrl":"assets/api/v1/animation-library/gamelab/pwucKp9Jx5Ksr1oGABFcKnFJjewfORMI/category_sports/soccer_blue.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"pwucKp9Jx5Ksr1oGABFcKnFJjewfORMI","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/pwucKp9Jx5Ksr1oGABFcKnFJjewfORMI/category_sports/soccer_blue.png"},"2c1543ba-06d0-4056-a2f6-38bf5e70855e":{"name":"raqueteP","sourceUrl":null,"frameSize":{"x":67,"y":93},"frameCount":1,"looping":true,"frameDelay":12,"version":"93dOq0Pkl4YOcqyvRzOzMW..4opm6MBO","categories":["fantasy"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":67,"y":93},"rootRelativePath":"assets/2c1543ba-06d0-4056-a2f6-38bf5e70855e.png"},"38bcc018-6625-4ac7-bbae-c5619646d541":{"name":"raqueteC","sourceUrl":null,"frameSize":{"x":72,"y":88},"frameCount":1,"looping":true,"frameDelay":12,"version":"fU0JYjJP6rZdquEkl6XzTmjISgwlbzcg","categories":["fantasy"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":72,"y":88},"rootRelativePath":"assets/38bcc018-6625-4ac7-bbae-c5619646d541.png"},"7e009ea7-f71c-48dd-a9ce-ec959a02c481":{"name":"sports_scoccer_1","sourceUrl":null,"frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":12,"version":"0hGvUOYKEJgs0nSWG9Fu7n6smWDX5DJG","categories":["backgrounds"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/7e009ea7-f71c-48dd-a9ce-ec959a02c481.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//crie a bola, raqueteJogador e raqueteComputador como objetos de sprite
var fundo = createSprite(200, 200);
fundo.setAnimation("sports_scoccer_1");
var bola = createSprite(200,200,20,20);
var raqueteJogador = createSprite(380,200,10,70);
var raqueteComputador = createSprite(10,200,10,70);

//b
bola.setAnimation("bola_s");
bola.scale = 0.05;
raqueteJogador.setAnimation("raqueteP");
raqueteJogador.scale = 0.7;
raqueteComputador.setAnimation("raqueteC");
raqueteComputador.scale = 0.7;



//placar pontos
var placarJ = 0;
var placarC = 0;

function draw() {
  
  if(bola.isTouching(raqueteJogador) || bola.isTouching(raqueteComputador)){
  
  playSound("assets/default.mp3");
  
}

if(bola.x > 400){
  
  playSound("assets/category_alerts/vibrant_game_correct_answer_hit.mp3")
  
}

if(bola.x < 0){
  
  playSound("assets/category_alerts/vibrant_game_correct_answer_hit.mp3", false);
  
  
}
  
  //criar o fundo
  background("white");
  line(200, 0, 200, 10);
  line(200, 20, 200, 30);
  line(200, 40, 200, 50);
  //faça com que a raquete do jogador se mova com a posição y do mouse
  raqueteJogador.y = World.mouseY;
  
  //placar
  textSize(20);
  fill("blue");
  text("J: " + placarJ, 215, 20);
  text("C: " + placarC, 155, 20);
  
  if(bola.x > 400){
    
    placarC = placarC + 1;
  }
  
  if(bola.x < 1){
    
    placarJ = placarJ + 1;
    
  }
  
  //IA para a raquete do computador
  //faça-o se mover com a posição y da bola
  raqueteComputador.y = bola.y;
  
  //criar limites
  //faça a bola quicar com as bordas superior e inferior
  createEdgeSprites();
  bola.bounceOff(topEdge);
  bola.bounceOff(bottomEdge);
  
  //faça a bola quicar nas raquetes
  bola.bounceOff(raqueteJogador);
  bola.bounceOff(raqueteComputador);
  
  //sacar a bola quando o espaço é pressionado
  if (keyDown("space")) {
    bola.velocityY = 3;
    bola.velocityX = 4;
  }
  
  //redefina a bola no centro apos passar a tela
  if(bola.x > 400 || bola.x < 0){
    
    bola.x = 200;
    bola.y = 200;
    bola.velocityX = 0;
    bola.velocityY = 0;
  }
  
 linha();
  //redefina a bola para o centro se ela cruzar a tela
  
  //desenhe os sprites na tela
  drawSprites();
}
function linha(){
  for(var num = 0; num < 400; num = num + 20){
  line(200, num, 200, num+10);
    
  }
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
