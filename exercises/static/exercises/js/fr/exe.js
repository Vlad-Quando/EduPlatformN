let text = document.getElementById("text");

let timeData = document.getElementById('time-data');
let timerTime = document.getElementById("timer");
let time = parseInt(timeData.dataset.time);
let passedTime = -2;

let timer;

function startTimer() {
    text.style.filter = "none";
    timer = setInterval(() => {
        if (time >= 60) {
            secs = time - 60;
            if (secs >= 10) {
                timerTime.innerHTML = '01:' + secs;
            } else {
                timerTime.innerHTML = '01:0' + secs;
            }
        } else if (time < 60 && time >= 10) {
            timerTime.innerHTML = '00:' + time;
        } else if (time < 10 && time >= 0) {
            timerTime.innerHTML = '00:0' + time;
        } else {
            clearInterval(timer);
            timerTime.innerHTML = 'Время вышло!';
        }
        time--;
        passedTime++;
    }, 1000)
}
    
function stopTimer() {
    clearInterval(timer);
    timerTime.innerHTML = 'Таймер остановлен!';
    let but = document.getElementById("stop-timer");
    but.innerHTML = 'Продолжить';
}

// Shows results block, stops timer and make timer buttons unavilable
function showResults(event) {
    if (passedTime === 60) {
        document.getElementById("time-passed").innerHTML = "Минута прошла!";
    } else {
        if (passedTime < 60) {
            document.getElementById("time-passed").innerHTML = `${passedTime} секунд прошло!`;
        } else if (passedTime > 60) {
            document.getElementById("time-passed").innerHTML = `Чтение заняло 1 минуту и ${passedTime - 60} секунд!`;
        }
    }
    wordsRead = event.target.parentElement.id;
    document.getElementById("words-read").innerHTML = `${wordsRead} слов было прочитано!`;

    document.getElementById("text").style.display = "none";
    document.getElementById("results").style.display = "grid";

    document.getElementById("stop-timer").removeAttribute("onclick");
    document.getElementById("stop-timer-but").removeAttribute("onclick");
    clearInterval(timer);
    timerTime.innerHTML = 'Таймер остановлен!';
}