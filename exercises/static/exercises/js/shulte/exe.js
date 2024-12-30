window.addEventListener("DOMContentLoaded", function() {
    this.document.getElementById("time-passed").style.display = "none";
})

let data = document.getElementById("data").dataset;
let angle = parseInt(data.angle);

document.querySelectorAll(".label").forEach(label => {
    
    label.style.transform = `rotate(${angle}deg)`;
})

let i = 0;
document.querySelectorAll(".cell").forEach(cell => {
    cell.id = i;
    i++;
});


let size = parseInt(data.size);
let columns = '';
for (let i = 0; i < parseInt(data.size); i++) {
    columns = columns + '1fr ';
}
document.getElementById("table").style.gridTemplateColumns = columns;

if (size === 3) {
    document.getElementById("4").style.backgroundColor = "rgb(255, 151, 151)";
} 
else if (size === 5) {
    document.getElementById("12").style.backgroundColor = "rgb(255, 151, 151)";
}
else if (size === 7) {
    document.getElementById("24").style.backgroundColor = "rgb(255, 151, 151)";
} 
if (size % 2 !== 0) {
    document.getElementById("center").style.display = "none";
}

let orderedArray = [];
document.querySelectorAll(".hidden-cell").forEach(letter => {
    orderedArray.push(letter.firstElementChild.innerHTML);
});
let currentLetter = document.getElementById("current-letter");
currentLetter.innerHTML = orderedArray.pop();

let isFinalLetter = false;

function shulteGame(event) {
    clickedLetter = event.target.textContent.trim();
    if (clickedLetter === currentLetter.innerText && orderedArray.length > 0) {
        currentLetter.innerHTML = orderedArray.pop()
    }
    if (orderedArray.length === 0) {
        if (isFinalLetter) {
            currentLetter.innerHTML = "Молодец!";
            timePassedLabel = document.getElementById("time-passed");
            timePassedLabel.style.display = "block";
            timePassedLabel.innerHTML = getTimeResult(timePassed);
        } else {
            isFinalLetter = true;
        }
        
    }
    
}

function getTimeResult(timePassed) {
    if (timePassed >= 59) {
        minutes = (Math.floor(timePassed / 60)).toString();
        seconds = (timePassed % 60).toString();

        return minutes + " мин. " + seconds + " сек."
    }
    return timePassed.toString() + " сек."
}

let timePassed = 0;
timer = setInterval(() => {
    timePassed += 1;
}, 1000)