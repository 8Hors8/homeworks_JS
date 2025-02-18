

function clickerGame() {
  let counter = Number(
    document.getElementById("clicker__counter").textContent
  );
  let counterContent = document.getElementById("clicker__counter");
  const img = document.getElementById("cookie");

  const statusDiv = document.querySelector(".clicker__status");
  const speedText = document.createElement("p");
  speedText.id = "clicker__speed";
  speedText.textContent = "Скорость клика: 0 кликов/сек";
  statusDiv.appendChild(speedText);

  let lastClickTime = Date.now();

  img.addEventListener("click", function () {
    counter++;
    counterContent.textContent = counter;

    let currentTime = Date.now();
    let timeDiff = (currentTime - lastClickTime) / 1000;
    lastClickTime = currentTime;
    let clickSpeed = (1 / timeDiff).toFixed(2);

    speedText.textContent = (counter > 1) ? `Скорость клика: ${clickSpeed} кликов/сек` : speedText.textContent;
    

    img.style.width = counter % 2 !== 0 ? "240px" : "200px";
  });
}

clickerGame();
