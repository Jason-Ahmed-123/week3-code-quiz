// Variables for the quiz questions and answers:    
var questions = [{
    title: "Who determines the Web standards?",
    choices: ["Mozilla", "Microsoft", "www Consortium", "Google"],
    answer: "www Consortium"
},
{
    title: "Choose the correct HTML element to define important text?",
    choices: ["&lt;strong&gt;", "&lt;b&gt;", "&lt;important&gt;", "&lt;i&gt;"],
    answer: "&lt;strong&gt;"
},
{
    title: "In which section in an HTML document is the correct place to refer to a CSS style sheet?",
    choices: ["&lt;head&gt;", "&lt;body&gt;", "at the end", "None of the above"],
    answer: "&lt;head&gt;"
},
{
    title: "Which CSS property is used to change the text color of an element?",
    choices: ["fgcolor", "color", "text-color", "chColor"],
    answer: "color"
},
{
    title: "Which JavaScript event occurs when the user clicks on an HTML element?",
    choices: ["onchange", "onmouseover", "onclick", "onmouseclick"],
    answer: "onclick"
}
]

// Variables for the functions, scores and timers:
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// Starts the countdown timer once user clicks the 'start' button:
function start() {

// Used ".innerHTML" to dynamically change orignal HTML:
timeLeft = 60;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    // Go to the endGame function when timer reaches below 0:
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

// Stop the timer to end the game:
function endGame() {
clearInterval(timer);

// Displays "game over" and score info:
var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

// Store the scores in local storage:
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}

// Click to clear score and play again:
function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s score is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button>
<button onclick="resetGame()">Play Again!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

// Clears the score name and value in the local storage if the user selects 'clear score':
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

// Reset the game: 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

// To play again:
var quizContent = `
<h1>Code Quiz!</h1>
<h4>Try to answer the following questions within the 60 second time limit.<br>Incorrect answers will penalize your score/time by 15 seconds!</h4>
<h3>Click to play!</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

// Subtract 15 seconds from the timer if user chooses an incorrect answer:
function incorrect() {
timeLeft -= 15; 
next();
}

// Increases the score by 20 points if the user chooses the correct answer:
function correct() {
score += 20;
next();
}

// Loops through the questions:
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}