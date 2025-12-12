 var buttonColors = ["red", "blue","green","yellow"];

 var gamePattern = [];

 var userClickedPattern = [];

 var started = false;
 var level = 0;

 jQuery(document).on("keydown touchstart",function() {
    if(!started) {
        jQuery("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
 });

 jQuery(".btn").click(function() {
    var userChosenColor = jQuery(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animationPress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
           setTimeout(function () {
              nextSequence();
           }, 1000); 
        }
    } else { 
    playSound("wrong");

    jQuery("body").addClass("game-over");
    jQuery("#level-title").text("Game over, press any key to start");


    setTimeout(function(){
    jQuery("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    jQuery("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
jQuery("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animationPress(currentColor) {
jQuery("#"+ currentColor).addClass("pressed");
setTimeout (function () {
jQuery("#"+ currentColor).removeClass("pressed");
} ,100);
}
  function startOver() {
   level = 0;
   gamePattern = [];
   started = false;

  }

