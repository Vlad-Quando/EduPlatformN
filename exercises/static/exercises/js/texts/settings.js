window.addEventListener("DOMContentLoaded", function() {
    let textOptions = document.querySelectorAll(".text-option");
    textOptions[0].checked = true;
    let modeOptions = document.querySelectorAll(".mode-option");
    modeOptions[0].checked = true;

    allTexts = Array()

    options = document.querySelectorAll(".search-option");
    for (let i = 0; i < options.length; i++) {
        allTexts.push(options[i].children)
    }
});

function showTextOptions() {
    let options = document.getElementById("text-options");
    if (options.classList.contains("show")) {
        options.classList.remove("show");
        document.getElementById("search-button").style.borderBottomRightRadius = "7px";
        document.getElementById("text-label").style.borderBottomLeftRadius = "7px";
        document.getElementById("text-button-icon").className = "bx bxs-down-arrow";
        // document.getElementById("mode-button").setAttribute('onclick', 'showModeOptions()');
    } else {
        options.classList.toggle("show");
        document.getElementById("search-button").style.borderBottomRightRadius = "0";
        document.getElementById("text-label").style.borderBottomLeftRadius = "0";
        document.getElementById("text-button-icon").className = "bx bxs-up-arrow";
        // document.getElementById("mode-button").setAttribute('onclick', '');
    }
}
function showModeOptions() {
    let options = document.getElementById("mode-options");
    if (options.classList.contains("show")) {
        options.classList.remove("show");
        document.getElementById("mode-button").style.borderBottomRightRadius = "7px";
        document.getElementById("mode-label").style.borderBottomLeftRadius = "7px";
        document.getElementById("mode-button-icon").className = "bx bxs-down-arrow";
        // document.getElementById("text-button").setAttribute('onclick', 'showTextOptions()');
    } else {
        options.classList.toggle("show");
        document.getElementById("mode-button").style.borderBottomRightRadius = "0";
        document.getElementById("mode-label").style.borderBottomLeftRadius = "0";
        document.getElementById("mode-button-icon").className = "bx bxs-up-arrow";
        // document.getElementById("text-button").setAttribute('onclick', '');
    }
}

function handleChange(chbox) {
    if(chbox.checked) {
        if(chbox.name === "text") {
            changeText(chbox.value, true);
            document.getElementById("text-selected").innerHTML = chbox.value;
        } else {
            changeMode(chbox.value, true);
            document.getElementById("mode-selected").innerHTML = chbox.value;
        }
    } else {
        if(chbox.name === "text") {
            changeText(chbox.value, false);
            // document.getElementById("text-selected").innerHTML = "Текст не выбран";
        } else {
            changeMode(chbox.value, false);
            // document.getElementById("mode-selected").innerHTML = "Режим не выбран";
        }
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
    options = document.querySelectorAll("#searched-text");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
    checkAllSelected();
}

function changeMode(value, checked) {
    let options = document.querySelectorAll(".mode-option");
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
        document.getElementById("mode-selected").innerHTML = options[0].value;
    }
    checkAllSelected();
}

function checkAllSelected() {
    let options = document.querySelectorAll(".text-option");
    textChecked = false;
    modeChecked = false;
    for(let i = 0; i < options.length; i++) {
        if(options[i].checked) {
            textChecked = true;
        }
    }
    options = document.querySelectorAll(".mode-option");
    for(let i = 0; i < options.length; i++) {
        if(options[i].checked) {
            modeChecked = true;
        }
    }
    let button = document.getElementById("start-button");
    if(!textChecked || !modeChecked) {
        button.setAttribute('type', 'button');
        button.setAttribute('onclick', 'alertRequired()');
    } 
    else if(textChecked && modeChecked) {
        button.setAttribute('type', 'submit');
        button.setAttribute('onclick', '');
    }
}

function alertRequired() {
    alert("Текст или режим не выбраны!");
}

