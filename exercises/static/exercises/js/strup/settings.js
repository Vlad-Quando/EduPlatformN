function showModeOptions() {
    let options = document.getElementById("mode-options");
    if (options.classList.contains("show")) {
        options.classList.remove("show");
        document.getElementById("mode-button").style.borderBottomRightRadius = "7px";
        document.getElementById("mode-button-icon").className = "bx bxs-down-arrow";
    } else {
        options.classList.toggle("show");
        document.getElementById("mode-button").style.borderBottomRightRadius = "0";
        document.getElementById("mode-button-icon").className = "bx bxs-up-arrow"; 
    }
}
function changeMode(element) {
    if (element.checked == true) {
        if (element.id == "check1") {
            document.getElementById("check2").checked = false;
            document.getElementById("mode-selected").innerText = "Таблица"
            document.getElementById("time").style.display = "none";
            document.getElementById("mode-options").classList.remove("show");
        } else {
            document.getElementById("check1").checked = false;
            document.getElementById("mode-selected").innerText = "Слова"
            document.getElementById("time").style.display = "grid";
            document.getElementById("mode-options").classList.remove("show");
        }
    }
}

const input = document.getElementById("quantity-input");
const max = 50;

input.addEventListener("input", function() {
    if (parseInt(input.value) > 50) {
        let value = input.value.toString();
        input.value = value.slice(0, -1);
    }
})
input.addEventListener("blur", function() {
    if (parseInt(input.value) < 10) {
        input.value = '10';
    }
})

function plus() {
    let value = parseInt(document.getElementById("quantity-input").value);
    if (value < 50) {
        value += 1;
        document.getElementById("quantity-input").value = value.toString();
    }
}

function minus() {
    let value = parseInt(document.getElementById("quantity-input").value);
    if (value > 10) {
        value -= 1;
        document.getElementById("quantity-input").value = value.toString();
    }
}

// const time_input = document.getElementById("time-input");
// const time_max = 3;

// time_input.addEventListener("time-input", function() {
//     console.log(parseFloat(time_input.value))
//     if (parseFloat(time_input.value) > 3.0) {
//         input.value = '3';
//     } else if (parseFloat(time_input.value) < 0.6) {
//         input.value = '0.5';
//     }
// })

function timePlus() {
    let value = parseFloat(document.getElementById("time-input").value);
    if (value < 3) {
        value = (value + 0.1).toFixed(1);
        document.getElementById("time-input").value = value;
    }
}

function timeMinus() {
    let value = parseFloat(document.getElementById("time-input").value);
    if (value > 0.5) {
        value = (value - 0.1).toFixed(1);
        document.getElementById("time-input").value = value;
    }
}

/*
Это мой код js:
```
function timePlus() {
    let value = parseFloat(document.getElementById("time-input").value);
    if (value < 3) {
        value += 0.1;
        value = value.toString().slice(0, 3);
        document.getElementById("time-input").value = value;
    }
}

function timeMinus() {
    let value = parseFloat(document.getElementById("time-input").value);
    if (value > 0.5) {
        value -= 0.1;
        value = value.toString().slice(0, 3);
        document.getElementById("time-input").value = value;
    }
}
```
Это мой код html:
```
<div class="time">
    <label class="time-label">Задержка:</label>
    <div class="time-input-container">
        <button class="minus-button" type="button" onclick="timeMinus()">-</button>
        <input class="time-input" type="number" id="time-input" min="0.5" max="3" value="1" step="0.1" readonly>
        <button class="plus-button" type="button" onclick="timePlus()">+</button>
    </div>
</div>
```
Помоги решить проблему, связанную с input time-input. Значение в нём меняется посредством кнопок plus-button и minus-button, но при этом возникают следующие баши: при уменьшении значения до 0.7 нажатие на кнопку plus-button не меняет значение, при уменьшении значения некоторые числа пропускаются, например: текущее значение равно 2.5, после одного нажатия на кнопку minus-button оно опускается не до 2.4, а до 2.3. Как это исправить?
*/

