let number = 1;
let imageNumbers = document.querySelectorAll(".image-label");
imageNumbers.forEach(num => {
    num.innerHTML = number;
    number++;
});

function preparing() {
    let images = document.querySelectorAll(".image");
    images.forEach(img => {
        img.classList.add("flip");
        img.setAttribute("onclick", "memoHandler(event)");
    });
}
let prepTime = parseInt(document.getElementById("data").dataset.preparingTime);
setTimeout(preparing, prepTime)

let passedTime = 0;
let timer = setInterval(() => {
    passedTime += 1;
}, 1000);

let cardStack = [];
let cardsQuantity = parseInt(document.getElementById("data").dataset.cardsQuantity);
switch (cardsQuantity) {
    case 6:
        document.getElementById("cards-container").style.gridTemplateColumns = "1fr 1fr 1fr";
        break;
    case 8:
        document.getElementById("cards-container").style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
        break;
    case 10:
        document.getElementById("cards-container").style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr";
        break;
    case 12:
        document.getElementById("cards-container").style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
        break;
    case 14:
        document.getElementById("cards-container").style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr";
        break;
    case 16:
        document.getElementById("cards-container").style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr 1fr";
        break;
}

let openedQuantity = 0;

function checkCards() {
    if (cardStack.length === 2) {
        let images = document.getElementsByClassName("image");

        if (cardStack[0] === cardStack[1]) {
            const successSound = new Audio("/static/sounds/success.mp3");
            successSound.volume = 0.7;
            successSound.play();
            
            for (const image of images) {
                if (image.src === cardStack[0]) {
                    image.classList.remove("closed");
                }
            }
            openedQuantity += 2;

        } else {
            const failSound = new Audio("/static/sounds/fail.mp3");
            failSound.play();

            for (const image of images) {
                image.removeAttribute('onclick');
            }
            for (const image of images) {
                if (image.classList.contains("closed")) {
                    setTimeout(() => {
                        image.classList.add("flip");
                        image.setAttribute("onclick", "memoHandler(event)");
                    }, 2000);
                }
            }
        }
        cardStack = [];
    }

    if (openedQuantity === cardsQuantity) {
        clearInterval(timer);
        document.getElementById("cards-container").style.display = "none";

        let results = document.getElementById("passed-time");
        results.innerHTML = `Вы открыли все карточки за ${passedTime} сек.`;
        document.getElementById("results").style.display = "block";
    }
}

function memoHandler(event) {
    image = event.target;
    image.classList.remove("flip");
    image.removeAttribute("onclick");

    cardStack.push(image.src);
    checkCards();
}
