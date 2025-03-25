document.addEventListener("DOMContentLoaded", async () => {
  const loaderElement = document.getElementById("loader");
  loaderElement.classList.remove("loader_active");

  class ExchangeRate {
    constructor() {
      this.cache = JSON.parse(localStorage.getItem("cache")) || {};
      this.response = null;
    }

    async getRate() {
      this.response = await fetch(
        "https://students.netoservices.ru/nestjs-backend/slow-get-courses"
      );
      if (!this.response.ok) {
        throw new Error(`HTTP error! Status: ${this.response.status}`);
      }
    }

    async cacheRate() {
      if (!this.cache.rate) {
        this.cache.rate = await this.response.json();
        localStorage.setItem("cache", JSON.stringify(this.cache));
      }
    }

    async displeyValute(valuteData) {
      const itemsContainer = document.getElementById("items");

      while (itemsContainer.firstChild) {
        itemsContainer.removeChild(itemsContainer.firstChild);
      }

      let listTags = "";

      for (const key in valuteData) {
        listTags += `
          <div class="item">
            <div class="item__code">${valuteData[key]["CharCode"]}</div>
            <div class="item__value">${valuteData[key]["Value"]}</div>
            <div class="item__currency">руб.</div>
          </div>
        `;
      }

      // Добавляем новый HTML-код внутрь #items
      itemsContainer.insertAdjacentHTML("beforeend", listTags);
    }

    async requestListener() {
      const cardElements = document.querySelectorAll(".card");

      cardElements.forEach((elCard) => {
        elCard.addEventListener("click", async () => {
          loaderElement.classList.add("loader_active");

          if (!this.cache.rate) {
            await exchangeRate.getRate();
            await exchangeRate.cacheRate();
          }
          const valuteData = this.cache.rate.response.Valute;

          await this.displeyValute(valuteData);
          loaderElement.classList.remove("loader_active");
        });
      });
    }
  }

  const exchangeRate = new ExchangeRate();
  await exchangeRate.requestListener();
});
