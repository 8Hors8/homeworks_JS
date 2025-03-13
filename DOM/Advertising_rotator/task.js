document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".rotator__case");
  let currentIndex = 0;

  function activateElement(index) {
    elements.forEach((element) => {
      element.classList.remove("rotator__case_active");
    });

    const currentElement = elements[index];

    currentElement.style.color = currentElement.dataset.color;

    currentElement.classList.add("rotator__case_active");

    const speed = parseInt(currentElement.dataset.speed, 10);

    setTimeout(() => {
      currentIndex = (index + 1) % elements.length; //
      activateElement(currentIndex);
    }, speed);
  }

  activateElement(0);
});
