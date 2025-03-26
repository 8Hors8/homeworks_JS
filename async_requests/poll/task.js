document.addEventListener("DOMContentLoaded", async () => {
    const pollTitle = document.getElementById("poll__title");
    const pollAnswers = document.getElementById("poll__answers");
  
    class Survey {
      constructor() {
        this.data = null;
        this.stats = null;
      }
  
      async fetchQuestion() {
        const response = await fetch("https://students.netoservices.ru/nestjs-backend/poll");
        if (!response.ok) {
          throw new Error(`Ошибка запроса HTTP! Статус: ${response.status}`);
        }
        this.data = await response.json();
      }
  
      async sendVote(answer) {
        const voteIndex = this.data.data.answers.indexOf(answer);
  
        try {
          const response = await fetch("https://students.netoservices.ru/nestjs-backend/poll", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `vote=${this.data.id}&answer=${voteIndex}`,
          });
  
          if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
          }
  
          this.stats = (await response.json()).stat;
          this.renderResults();
        } catch (error) {
          console.error("Ошибка:", error);
        }
      }
  
      renderQuestion() {
        pollTitle.textContent = this.data.data.title;
        pollAnswers.replaceChildren();
  
        this.data.data.answers.forEach((answer) => {
          const button = document.createElement("button");
          button.classList.add("poll__answer");
          button.textContent = answer;
          button.addEventListener("click", () => {
            alert("Спасибо, ваш голос засчитан!");
            this.sendVote(answer);
          });
          pollAnswers.appendChild(button);
        });
      }
  
      renderResults() {
        pollAnswers.replaceChildren();
  
        this.stats.forEach((stat) => {
          const result = document.createElement("div");
          result.classList.add("poll__result");
          result.textContent = `${stat.answer}: ${stat.votes}%`;
          pollAnswers.appendChild(result);
        });
      }
  
      async init() {
        await this.fetchQuestion();
        this.renderQuestion();
      }
    }
  
    const survey = new Survey();
    survey.init();
  });
  