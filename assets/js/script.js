// Declaring Variables

var timerEl = document.getElementById('countdown');
var click = document.getElementById('start');
var askQuestions = document.getElementById('title')
var options = document.getElementById('text')
var btnGone = document.getElementById('start')
var checkAns = document.getElementById("checkAnswers")
var timeLeft = 40;
var questionIndex = 0;
var correctAnswers = 0;
var targetMain = document.getElementById('main');
var form = document.getElementById('form');
var highScores= [];

/* 
When page is opened, looks if there are any high scores in local storage and store it in a vairable,
if not then 'noStorage' will just appear in console, and code will proceed.
*/
if (JSON.parse(localStorage.getItem("highscores")) == null) {
    console.log("noStorage");
} else {
    highScores = JSON.parse(localStorage.getItem("highscores"))
}

// Variable to store array of questions, answers, and if true/false
var questions = [
    {
     question:"Commonly used data types DO NOT include:",
     answers: [
         {
             answer: "a. strings",
             correct: false
         },
         {
            answer: "b. boolean",
            correct: false
         },
         {
            answer: "c. alert",
            correct: true
         },
         {
            answer: "d. numbers",
            correct: false
         }
     ],
    },
    {
     question: "The condition in an if/else statement is enclosed within ___.", 
     answers: [
        {
            answer: "a. quotes",
            correct: false
        },
        {
           answer: "b. curly brackets",
           correct: false
        },
        {
           answer: "c. parentheses",
           correct: true
        },
        {
           answer: "d. square brackets",
           correct: false
        }
    ],
    },
    {
     question: "Arrays in Javascript can be used to store ___.",
     answers: [
        {
            answer: "a. numbers and strings",
            correct: false
        },
        {
           answer: "b. other arrays",
           correct: false
        },
        {
           answer: "c. booleans",
           correct: false
        },
        {
           answer: "d. all of the above",
           correct: true
        }
    ], 
    },
    {
     question: "String values must be enclosed within ___ when being assigned to variables.",
     answers: [
        {
            answer: "a. commas",
            correct: false
        },
        {
           answer: "b. curly brackets",
           correct: false
        },
        {
           answer: "c. quotes",
           correct: true
        },
        {
           answer: "d. parentheses",
           correct: false
        }
    ], 
    },
    {
     question: "A very useful tool to debug arrays is:",
     answers: [
        {
            answer: "a. Javascript",
            correct: false
        },
        {
           answer: "b. Terminal/bash",
           correct: false
        },
        {
           answer: "c. For loops",
           correct: false
        },
        {
           answer: "d. Console.log",
           correct: true
        }
    ],
    }
];

// Dynamically making text for when quiz is over. Will tell user what their score is
function finalText() {
    var done = document.getElementById("allDone");
    var doneAll = document.createElement("h1");
    doneAll.innerHTML= "ALL DONE!";
    var finalScore = document.createElement("p");
    finalScore.innerHTML = "Your final score is " + correctAnswers;
    allDone.appendChild(doneAll);
    allDone.appendChild(finalScore);
}

/* 
Starting timer. after each question, there is a counter (questionIndex) that increases by 1.
When that counter equals the # of questions then quiz is over. Unless time reaches 0 or less first.
*/
function timerStart() {
    var countdown = setInterval(function() {
        if (timeLeft >= 0){
            timerEl.textContent = "Time: " + timeLeft + " seconds";
            timeLeft--
        } 

        if ((questionIndex == questions.length) || (timeLeft===0) || (timeLeft < 0)) {
            timerEl.textContent=""
            alert("End of Quiz");
            targetMain.classList.add("hidden")
            form.classList.remove("hidden")
            finalText()
            clearInterval(countdown)
        }
    }, 1000);
};


// This function clears out the beginning screen when the button "Start Quiz" is clicked
function clearScreen() {
    askQuestions.innerHTML = "";
    options.innerHTML="";
    btnGone.remove();
};

// The first question and options appears dynamically.
function questionStart() {
    askQuestions.innerHTML = questions[questionIndex].question;
    for (i =0; i < 4; i++) {
        var btn = document.createElement("button");
        btn.className =  "optionClass";
        btn.innerText = questions[questionIndex].answers[i].answer;
        btn.value= questions[questionIndex].answers[i].correct;
        options.appendChild(btn);
        btn.addEventListener("click", nextQuestion);
    }
};

/* 
After the first question is answered, the rest of questions and options 
are dynamically made here. The if/else if conditions will tell user if 
their answer is wrong or correct by changing the text accordingly
*/

function nextQuestion(event) {
    questionIndex++
    console.log(questionIndex)
    console.log(event.target.innerText)
    console.log(event.target.value)
    if (event.target.value == "true") {
        correctAnswers++
        console.log(correctAnswers)
        varifyOption.classList.remove("hidden")
        varifyOption.innerHTML= "Correct"
    }
    
    else if (event.target.value == "false") { 
        varifyOption.classList.remove("hidden")
        varifyOption.innerHTML = "False";
        timeLeft -= 10;
    }

    askQuestions.innerHTML = questions[questionIndex].question;
    options.innerHTML = "";
    for (i =0; i < 4; i++) {
        var btn = document.createElement("button");
        btn.className =  "optionClass";
        btn.innerText = questions[questionIndex].answers[i].answer;
        btn.value= questions[questionIndex].answers[i].correct;
        options.appendChild(btn)
       
        btn.addEventListener("click", nextQuestion);
    }
}

// Save data to a variable, and stored in local.storage as a string
function saveScore() {
    var data = {
        initials: document.getElementById("initials").value,
        score: correctAnswers 
    }
    console.log(highScores)
    highScores.push(data)
    localStorage.setItem("highscores", JSON.stringify(highScores))
}

/* 
At the beginning, when the 'Start Quiz' button is pressed. The timer will start,
screen will clear, and first question/options will show up

*/
function buttonStart() {
    timerStart()
    clearScreen()
    questionStart()
};

// When clicked the function will occur
click.addEventListener("click", buttonStart)
document.getElementById("save").addEventListener("click", saveScore)

