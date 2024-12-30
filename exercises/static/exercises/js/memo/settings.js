const quantityMax = 18;
const quantityMin = 6;
const timeMax = 10;
const timeMin = 3;


function quantityPlus() {
    let value = parseInt(document.getElementById("quantity-input").value);
    if (value < quantityMax) {
        value += 2;
        document.getElementById("quantity-input").value = value.toString();
    }
}

function quantityMinus() {
    let value = parseInt(document.getElementById("quantity-input").value);
    if (value > quantityMin) {
        value -= 2;
        document.getElementById("quantity-input").value = value.toString();
    }
}

function timePlus() {
    let value = parseInt(document.getElementById("time-input").value);
    if (value < timeMax) {
        value += 1;
        document.getElementById("time-input").value = value.toString();
    }
}

function timeMinus() {
    let value = parseInt(document.getElementById("time-input").value);
    if (value > timeMin) {
        value -= 1;
        document.getElementById("time-input").value = value.toString();
    }
}