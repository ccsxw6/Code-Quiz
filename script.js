var startBtn = document.querySelector("#startBtn");
var timeEl = document.querySelector("#time");

startBtn.addEventListener('click', setTime)


var secondsLeft = 10;

function setTime() {
    question()
    var timerInterval = setInterval(function() { 
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left.";
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval); 
        sendMessage();
      }
  
    }, 1000);
  } 

  function sendMessage() {
      alert("You're time is up sucka")
  }


  //got this alert to happen in the setTime function, but doesn't happen simultaneously as timer
  function question() {
      alert("Commonly used data types do NOT include: ")
  }



  //Maybe just create one page first? 
  //Do I need to make an html page for each question? 