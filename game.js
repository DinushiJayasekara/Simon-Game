var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = 0;


$(document).on("keydown",function(){
  started += 1;
  if (started === 1) {
    nextSequence();
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    var gameOver = new Audio("sounds/wrong.mp3");
    gameOver.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key To Restart");
    startOver();
  }
}

function nextSequence() {

  userClickedPattern = [];
  $("h1").text("Level " + level);
  level += 1;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(120).fadeIn(120);

  playSound(randomChosenColour);

}

function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = 0;
}
