window.addEventListener("DOMContentLoaded", function() {
    let textOptions = document.querySelectorAll(".text-option");
    textOptions[0].checked = true;

    allTexts = Array()

    options = document.querySelectorAll(".search-option");
    for (let i = 0; i < options.length; i++) {
        allTexts.push(options[i].children)
    }
})

function showTextOptions() {
    let options = document.getElementById("text-options");
    if (options.classList.contains("show")) {
        options.classList.remove("show");
        document.getElementById("text-label").style.borderBottomLeftRadius = "7px";
        document.getElementById("text-button-icon").className = "bx bxs-down-arrow";
    } else {
        options.classList.toggle("show");
        document.getElementById("text-label").style.borderBottomLeftRadius = "0";
        document.getElementById("text-button-icon").className = "bx bxs-up-arrow";
    }
}

function handleChange(chbox) {
    if(chbox.checked) {
        changeText(chbox.value, true);
        document.getElementById("text-selected").innerHTML = chbox.value;
    } else {
        changeText(chbox.value, false);
    }
}

function changeText(value, checked) {
    let options = document.querySelectorAll(".text-option");
    if(checked) {
        for(let i = 0; i < options.length; i++) {
            if(options[i].value !== value) {
                options[i].checked = false;
            }
        }
    } else {
        for(let i = 0; i < options.length; i++) {
            options[i].checked = false;
        }
        options[0].checked = true;
        document.getElementById("text-selected").innerHTML = options[0].value;
    }
    checkAllSelected();
}

function checkAllSelected() {
    let options = document.querySelectorAll(".text-option");
    textChecked = false;
    for(let i = 0; i < options.length; i++) {
        if(options[i].checked) {
            textChecked = true;
        }
    }
    let button = document.getElementById("start-button");
    if(!textChecked) {
        button.setAttribute('type', 'button');
        button.setAttribute('onclick', 'alertRequired()');
    } 
    else if(textChecked) {
        button.setAttribute('type', 'submit');
        button.setAttribute('onclick', '');
    }
}

function alertRequired() {
    alert("Текст или время чтения не выбраны!");
}

const input = document.getElementById("quantity-input");
const max = 90;

function plus() {
    let value = parseInt(document.getElementById("time-input").value);
    if (value < max) {
        value += 5;
        document.getElementById("time-input").value = value.toString();
    }
}

function minus() {
    let value = parseInt(document.getElementById("time-input").value);
    if (value > 10) {
        value -= 5;
        document.getElementById("time-input").value = value.toString();
    }
}
