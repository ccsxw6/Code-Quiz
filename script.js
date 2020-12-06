var userQuestions = [
  {
    title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: "console log"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Arrays in Javascript can be used to store ____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
  },
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes"
  },
];

var currentTime = document.querySelector("#currentTime");
var wrapper = document.querySelector("#wrapper");
var startBtn = document.querySelector("#startBtn");
var questionsDiv = document.querySelector("#questionsDiv");


var secondsLeft = 76;
var startInterval = 0;
var score = 0;

startBtn.addEventListener("click", function () {
  if (startInterval === 0) {
      startInterval = setInterval(function () {
          secondsLeft--;
          currentTime.textContent = "Time: " + secondsLeft;

          if (secondsLeft <= 0) {
              clearInterval(startInterval);
              final();
              currentTime.textContent = "Time's up!";
          }
      }, 1000);
  }
  make(questionIndex);
});

var questionIndex = 0;
var newUl = document.createElement("ul");

function make(questionIndex) {
  newUl.innerHTML = ""; 
  questionsDiv.innerHTML = "";
  for (var i = 0; i < userQuestions.length; i++) {
      var userQuestion = userQuestions[questionIndex].title; 
      var userChoices = userQuestions[questionIndex].choices;
      questionsDiv.textContent = userQuestion;
  }

  userChoices.forEach(function (newItem) { 
      var listItem = document.createElement("li"); 
      listItem.textContent = newItem; 
      questionsDiv.appendChild(newUl);
      newUl.appendChild(listItem); 
      listItem.addEventListener("click", (checkMatch)); 
  })
}

var penalty = 10;

function checkMatch(event) {
  var checkElement = event.target;

  if (checkElement.matches("li")) { 

      var newDiv = document.createElement("div"); 
      newDiv.setAttribute("id", "newDiv");
      if (checkElement.textContent == userQuestions[questionIndex].answer) { 
          score++;
          newDiv.textContent = "Correct! The answer is:  " + userQuestions[questionIndex].answer;
         
      } else {
          secondsLeft = secondsLeft - penalty; 
          newDiv.textContent = "Incorrect. The correct answer is:  " + userQuestions[questionIndex].answer;
      }

  }
  questionIndex++;

  if (questionIndex >= userQuestions.length) {
      final();
      newDiv.textContent = "End of quiz!" + " " + "You recieved  " + score + "/" + userQuestions.length + " Correct!";
  } else {
      make(questionIndex);
  }
  questionsDiv.appendChild(newDiv);

}
function final() {
  currentTime.innerHTML = "";
  questionsDiv.innerHTML = "";

  var newH1 = document.createElement("h1");
  newH1.setAttribute("id", "newH1");
  newH1.textContent = "All Done!"
  questionsDiv.appendChild(newH1);


  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");
  questionsDiv.appendChild(createP);

  
  if (secondsLeft >= 0) {
      var timeLeft = secondsLeft;
      var anotherP = document.createElement("p");
      clearInterval(startInterval);
      createP.textContent = "Your final score is: " + timeLeft;
      questionsDiv.appendChild(anotherP);
  }

 
  var newLabel = document.createElement("label");
  newLabel.setAttribute("id", "newLabel");
  newLabel.textContent = "Enter your initials: ";
  questionsDiv.appendChild(newLabel);

  var newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("id", "initials");
  newInput.textContent = "";
  questionsDiv.appendChild(newInput);

  var submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("id", "submit");
  submitButton.textContent = "Submit";
  questionsDiv.appendChild(submitButton);

  submitButton.addEventListener("click", function () { 
      var initials = newInput.value;

      if (initials === null) {
          console.log("No initial submitted");
      } 
      
      else {
          var finalScore = { 
              initials: initials,
              score: timeLeft 
          }
          console.log(finalScore);

          var scoresTotal = localStorage.getItem("scoresTotal");
          if (scoresTotal === null) {
              scoresTotal = []; 
          } else {
              scoresTotal = JSON.parse(scoresTotal);
          }
          scoresTotal.push(finalScore); 
          var newScore = JSON.stringify(scoresTotal);
          localStorage.setItem("scoresTotal", newScore);
          window.location.replace("highscores.html");
      }
  });

}