var timerEl = document.getElementById('countdown');
var timeLeft = 75;

var countdown = setInterval(function() {
    if (timeLeft >= 0){
        timerEl.textContent = "Time: " + timeLeft + " seconds";
        timeLeft--
    } else {
        timerEl.textContent=""
        clearInterval(countdown)
        // startTime()
    }

}, 1000);

/*function startTime() {
    var zero = 0;

    var timeInterval = setInterval(function() {
        if (wordCount === undefined) {
            // Use `clearInterval()` to stop the timer
            clearInterval(msgInterval);
        } 
    },1000)
}
*/

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
