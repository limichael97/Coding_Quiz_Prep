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
             answer: "a",
             correct: false
         },
         {
            answer: "b",
            correct: false
         },
         {
            answer: "c",
            correct: false
         },
         {
            answer: "d",
            correct: true
         }
     ],
    },
    {
     question: "The condition in an if/else statement is enclosed within ___.", 
     answers: [
        {
            answer: "e",
            correct: false
        },
        {
           answer: "f",
           correct: false
        },
        {
           answer: "g",
           correct: true
        },
        {
           answer: "h",
           correct: false
        }
    ],
    },
    {
     question: "Arrays in Javascript can be used to store ___.",
     answers: [
        {
            answer: "i",
            correct: true
        },
        {
           answer: "j",
           correct: false
        },
        {
           answer: "k",
           correct: false
        },
        {
           answer: "l",
           correct: false
        }
    ], 
    },
    {
     question: "String values must be enclosed within ___ when being assigned to variables.",
     answers: [
        {
            answer: "m",
            correct: false
        },
        {
           answer: "n",
           correct: false
        },
        {
           answer: "o",
           correct: false
        },
        {
           answer: "p",
           correct: true
        }
    ], 
    },
    {
     question: "A very useful tool to debug arrays is:",
     answers: [
        {
            answer: "a",
            correct: false
        },
        {
           answer: "b",
           correct: false
        },
        {
           answer: "c",
           correct: false
        },
        {
           answer: "d",
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
            alert("End of Quiz");
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
        timeLeft -= 5;
    }
    askQuestions.innerHTML = questions[questionIndex].question;
    options.innerHTML = "";
    for (i =0; i < 4; i++) {
        var btn = document.createElement("button");
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


/*Commonly used data tyoes DO NOT include: 
1. strings
2. booleans 
3. alert
4. numbers

The condition in an if/else statement is enclosed within ___.
1. quotes
2. curly brackets
3. parentheses
4. square brackets

Arrays in Javascript can be used to store ___.
1. numbers and strings
2. other arrays
3. booleans
4. all of the above

String values must be enclosed within ___ when being assigned to variables.
1. commas
2. curly brackets
3. quotes
4. parentheses

A very useful tool to debug arrays is:
1. Javascript
Terminal/bash
For loops
Console.log
*/
