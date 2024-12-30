const maxTime = 2;
const minTime = 0.5;
const maxSize = 9;
const minSize = 3;
const minSteps = 3;
const maxSteps = 10;

function plusSize() {
    let value = parseInt(document.getElementById("size-input").value);
    if (value < maxSize) {
        value += 2;
        document.getElementById("size-input").value = value.toString();
    }
}

function minusSize() {
    let value = parseInt(document.getElementById("size-input").value);
    if (value > minSize) {
        value -= 2;
        document.getElementById("size-input").value = value.toString();
    }
}

function plusTime() {
    let value = parseFloat(document.getElementById("time-input").value);
    if (value < maxTime) {
        value += 0.1;
        document.getElementById("time-input").value = value.toFixed(1).toString();
    }
}

function minusTime() {
    let value = parseFloat(document.getElementById("time-input").value);
    if (value > minTime) {
        value -= 0.1;
        document.getElementById("time-input").value = value.toFixed(1).toString();
    }
}

function plusSteps() {
    let value = parseFloat(document.getElementById("steps-input").value);
    if (value < maxSteps) {
        value += 1;
        document.getElementById("steps-input").value = value.toString();
    }
}

function minusSteps() {
    let value = parseFloat(document.getElementById("steps-input").value);
    if (value > minSteps) {
        value -= 1;
        document.getElementById("steps-input").value = value.toString();
    }
}
