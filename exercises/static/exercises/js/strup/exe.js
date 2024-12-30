function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
let startButton = document.getElementById("start");
let wordIndex = 1;

colors = new Map(
    [["red", "red"],
    ["brown", "brown"], 
    ["yellow", "#edcb09"], 
    ["blue", "blue"],
    ["black", "black"], 
    ["pink", "#fc03ca"], 
    ["orange", "orange"], 
    ["green", "green"],
    ["violet", "#6b0aab"],]
)
colors_keys = Array.from(colors.keys())

let mode = document.getElementById("mode").dataset.mode;
if (mode === "table") {
    document.getElementById("words").style.display = "none";
    startButton.style.display = "none";

    let words = document.querySelectorAll(".table-word");
    for (let i = 0; i < words.length; i++) {
        let random_index = Math.floor(Math.random() * colors_keys.length)
        let color = colors_keys[random_index];
        if (color === words[i].id) {
            color = colors_keys[random_index + 1 % colors_keys.length]
        }
        words[i].style.color = color;
    }
} 

else if (mode === "words") {
    document.getElementById("table").style.display = "none";
    let time = parseFloat(document.getElementById("time").dataset.time);
    let container = document.getElementById("words");
    let stopButton = document.getElementById("stop");
    stopButton.style.display = "none";

    // Получаем значение атрибута data-words
    let wordsData = document.getElementById("words-data").dataset.words;

    // Используем регулярное выражение для извлечения всех тегов <p>
    let parser = new DOMParser();
    let doc = parser.parseFromString(wordsData, 'text/html');
    let words = doc.querySelectorAll('p');

    // Преобразуем NodeList в массив
    let wordsArray = Array.from(words);

    for (let i = 0; i < wordsArray.length; i++) {
        let random_index = Math.floor(Math.random() * colors_keys.length)
        let color = colors_keys[random_index];
        if (color === words[i].id) {
            color = colors_keys[random_index + 1 % colors_keys.length]
        }
        wordsArray[i].style.color = color;
    }

    startButton.addEventListener("click", () => {
        stopButton.style.display = "block";
        startButton.style.display = "none";
        timer = setInterval(() => {
            if (wordIndex < wordsArray.length) {
                container.replaceChildren(wordsArray[wordIndex]);
                wordIndex++;
            } else {
                clearInterval(timer);
            }
        }, time * 1000);
    });
}