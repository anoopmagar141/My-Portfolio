var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfDrumButtons; i++) {  // Removed semicolon here
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);  // Corrected function call
  });
}

document.addEventListener("keypress", function(event) {
  makeSound(event.key);
  buttonAnimation(event.key);
});

function makeSound(key){
    switch(key){
        case "w":
        var tis=new Audio("sound/tis.mp3");
        tis.play();
        break;

        case "a":
        var crashwav=new Audio("sound/crashwav.mp3");
        crashwav.play();
        break;

        case "s":
        var kick=new Audio("sound/kick.mp3");
        kick.play();
        break;

        case "d":
        var snare=new Audio("sound/snare.mp3");
        snare.play();
        break;

        case "j":
        var joke=new Audio("sound/joke.mp3");
        joke.play();
        break;

        case "z":
        var woosh=new Audio("sound/woosh.mp3");
        woosh.play();
        break;

        default:
            console.log(key);

    }
}

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    if (activeButton) {  // Check if the element exists to avoid errors
      activeButton.classList.add("pressed");
      
      setTimeout(function() {
        activeButton.classList.remove("pressed");
      }, 100);
    }
  }