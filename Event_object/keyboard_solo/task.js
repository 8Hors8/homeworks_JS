class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector(".word");
    this.winsElement = container.querySelector(".status__wins");
    this.lossElement = container.querySelector(".status__loss");
    this.timerElement = container.querySelector(".countdown"); // Новый элемент таймера

    this.timer = null;
    this.timeLeft = 0;

    this.reset();
    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener("keyup", (e) => {
      const targetKey = this.currentSymbol?.textContent?.toLowerCase();
      if (!targetKey) return;

      if (targetKey === e.key.toLowerCase()) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  success() {
    this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add("symbol_correct");
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    // Если слово завершено
    if (!this.currentSymbol) {
      if (++this.winsElement.textContent === 10) {
        alert("Победа!");
        this.reset();
      }
      this.setNewWord();
      return;
    }

    this.currentSymbol.classList.add("symbol_current");
  }

  fail() {
    this.clearTimer();
    if (++this.lossElement.textContent === 5) {
      alert("Вы проиграли!");
      this.reset();
      return;
    }
    this.setNewWord();
  }

  setNewWord() {
    this.clearTimer();
    const word = this.getWord();
    this.timeLeft = word.length;
    this.updateTimerDisplay();
    this.renderWord(word);
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();

      if (this.timeLeft <= 0) {
        this.gameOver();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    this.timerElement.textContent = this.timeLeft;
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  gameOver() {
    this.clearTimer();
    alert("Время вышло!");
    this.reset();
  }

  getWord() {
    const words = [
        "bob",
        "awesome",
        "netology",
        "hello",
        "kitty",
        "rock",
        "youtube",
        "popcorn",
        "cinema",
        "love",
        "javascript",
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? "symbol_current" : ""}">${s}</span>`
      )
      .join("");
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector(".symbol_current");
  }
}

new Game(document.getElementById("game"));
