if (JSON.parse(localStorage.getItem("highscores")) == null) {
    console.log("noStorage");
} else {
    highScores = JSON.parse(localStorage.getItem("highscores"))
}

highScores.sort(function(a,b) {
    return parseFloat(b.score) -parseFloat(a.score);
}); 

function setScore() {
    for (i =0; i<highScores.length; i++) {
        initial = highScores[i].initials;
        score = highScores[i].score;
        if (initial === null) {
            console.log("noStorage");
        } else {
        var oList = document.getElementById('rank');
        var list = document.createElement('li');
        highScores.sort(function(a,b) {
            return a - b;
        }); 
        list.innerHTML = highScores[i].initials + " - " + highScores[i].score;
        oList.appendChild(list);
        }
    }
}

setScore()

var clearScore = document.getElementById("clear");

function scoreClear() {
    localStorage.clear();
    location.reload();
}


clearScore.addEventListener("click", scoreClear)