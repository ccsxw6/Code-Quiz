var clearBtn = document.querySelector("#clearBtn");

clearBtn.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

var scoresTotal = localStorage.getItem("scoresTotal");
scoresTotal = JSON.parse(scoresTotal);

var highScore = document.querySelector("#highScore"); 

if (scoresTotal !== null) {
    
    for (var i = 0; i < scoresTotal.length; i++) {
        
        var createLi = document.createElement("li");
        createLi.textContent = scoresTotal[i].initials + " " + scoresTotal[i].score;
        highScore.appendChild(createLi); 
        
    }
}

var backBtn = document.querySelector("#backBtn");

backBtn.addEventListener("click", function () {
    window.location.replace("index.html");
});