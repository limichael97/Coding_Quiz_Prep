var timerEl = document.getElementById('countdown');
var click = document.getElementById('start');
var askQuestions = document.getElementById('title')
var options = document.getElementById('text')
var btnGone = document.getElementById('start')
var timeLeft = 75;
var questionIndex = 0;
var correctAnswers = 0;
var targetMain = document.getElementById('main');
var form = document.getElementById('form');
var highScores= [];
if (JSON.parse(localStorage.getItem("highscores")) == null) {
    console.log("noStorage");
} else {
    highScores = JSON.parse(localStorage.getItem("highscores"))
}


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

function timerStart() {
    var countdown = setInterval(function() {
        if (timeLeft >= 0){
            timerEl.textContent = "Time: " + timeLeft + " seconds";
            timeLeft--
        } else {
            timerEl.textContent=""
            targetMain.classList.add("hidden")
            form.classList.remove("hidden")
            clearInterval(countdown)
            return;
        }
    }, 1000);
};

function clearScreen() {
    askQuestions.innerHTML = "";
    options.innerHTML="";
    btnGone.remove();
};

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

function nextQuestion(event) {
    questionIndex++
    console.log(questionIndex)
    if (questionIndex == questions.length) {
        timeLeft= 0;
        alert("End of Quiz");
        targetMain.classList.add("hidden")
        form.classList.remove("hidden")
        return;
    }
    console.log(event.target.innerText)
    console.log(event.target.value)
    if (event.target.value == "true") {
        correctAnswers++
        console.log(correctAnswers)
    } else { 
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


function saveScore() {
    // capture Results 
    // capture user input
    // create object using the users input and score
    // stringify
    // save to local storage
    var data = {
        initials: document.getElementById("initials").value,
        score: correctAnswers 
    }
    console.log(highScores)
    highScores.push(data)
    localStorage.setItem("highscores", JSON.stringify(highScores))
}

function buttonStart() {
    timerStart()
    clearScreen()
    questionStart()
};

click.addEventListener("click", buttonStart)
document.getElementById("save").addEventListener("click", saveScore)

