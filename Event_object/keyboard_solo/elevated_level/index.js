class KeyboardGame {
    constructor() {
        this.words = ["Кот", "Hello", "Привет", "JavaScript", "Мир"];
        this.wins = 0;
        this.losses = 0;
        this.maxWins = 10;
        this.maxLosses = 3;
        this.timer = 10;
        this.timerId = null;

        this.wordContainer = document.querySelector(".word-container");
        this.winsEl = document.getElementById("wins");
        this.lossesEl = document.getElementById("losses");
        this.timerEl = document.getElementById("timer");

        this.newWord();
        this.registerEvents();
    }

    newWord() {
        this.word = this.words[Math.floor(Math.random() * this.words.length)];
        this.wordContainer.innerHTML = "";
        this.word.split("").forEach(letter => {
            let span = document.createElement("span");
            span.classList.add("symbol");
            span.textContent = letter;
            this.wordContainer.appendChild(span);
        });
        this.currentIndex = 0;
        this.updateTimer();
    }

    registerEvents() {
        document.addEventListener("keydown", (event) => {
            // Исключаем служебные клавиши
            const forbiddenKeys = ["Shift", "Alt", "Control", "CapsLock", "Tab", "Escape"];
            if (forbiddenKeys.includes(event.key) || (event.shiftKey && event.altKey)) {
                return;
            }

            const currentSymbol = this.wordContainer.children[this.currentIndex];
            if (!currentSymbol) return;

            if (event.key.toLowerCase() === currentSymbol.textContent.toLowerCase()) {
                currentSymbol.classList.add("correct");
                this.currentIndex++;

                if (this.currentIndex === this.word.length) {
                    this.success();
                }
            } else {
                this.fail();
            }
        });
    }

    success() {
        this.wins++;
        this.winsEl.textContent = this.wins;
        if (this.wins === this.maxWins) {
            alert("Поздравляем! Вы победили!");
            this.resetGame();
            return;
        }
        this.newWord();
    }

    fail() {
        this.losses++;
        this.lossesEl.textContent = this.losses;
        if (this.losses === this.maxLosses) {
            alert("Игра окончена. Попробуйте снова!");
            this.resetGame();
            return;
        }
        this.newWord();
    }

    updateTimer() {
        clearInterval(this.timerId);
        this.timer = 10;
        this.timerEl.textContent = this.timer;

        this.timerId = setInterval(() => {
            this.timer--;
            this.timerEl.textContent = this.timer;

            if (this.timer === 0) {
                clearInterval(this.timerId);
                this.fail();
            }
        }, 1000);
    }

    resetGame() {
        this.wins = 0;
        this.losses = 0;
        this.winsEl.textContent = this.wins;
        this.lossesEl.textContent = this.losses;
        this.newWord();
    }
}

document.addEventListener("DOMContentLoaded", () => new KeyboardGame());
