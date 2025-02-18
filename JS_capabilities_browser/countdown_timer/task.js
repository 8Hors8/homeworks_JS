let time = Number(document.getElementById("timer").textContent);
//console.log(time)

function formatTime(seconds) {
  let hh = Math.floor(seconds / 3600);
  let mm = Math.floor((seconds % 3600) / 60);
  let ss = seconds % 60;

  return `${hh.toString().padStart(2, "0")}:${mm
    .toString()
    .padStart(2, "0")}:${ss.toString().padStart(2, "0")}`;
}

function downloadFile() {
  let link = document.createElement("a");
  link.href = "./file-to-download.rar";
  link.download = "file-to-download.rar";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function CountdownTimer(time) {
  let timerContent = document.getElementById("timer");

  let interval = setInterval(() => {
    if (time >= 0) {
      timerContent.textContent = formatTime(time);
      time--;
    } else {
      downloadFile();
      alert("Вы победили в конкурсе");
      clearInterval(interval);
    }
  }, 1000);
}

CountdownTimer(time);
