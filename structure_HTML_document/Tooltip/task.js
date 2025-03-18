document.addEventListener("DOMContentLoaded", () => {
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  document.body.appendChild(tooltip);

  const links = document.querySelectorAll(".has-tooltip");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      tooltip.textContent = event.target.getAttribute("title");
      const position = event.target.getAttribute("data-position") || "top";
      const rect = event.target.getBoundingClientRect();      

      let left, top;

      switch (position) {
        case "top":
          top = rect.top - 30;
          left = rect.left;
          break;
        case "bottom":
          left = rect.left;
          top = rect.top + 30;
          break;
        case "left":
          left = rect.left - 180;
          top = rect.top;
          break;
        case "right":
          left = rect.right + 10;
          top = rect.top;
          break;
        default:
          left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2;
          top = rect.top - tooltip.offsetHeight - 5;
      }      

      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;

      tooltip.classList.add("tooltip_active");

      const handleMouseUp = () => {
        tooltip.classList.remove("tooltip_active");
        document.removeEventListener("mouseup", handleMouseUp);
      };
      document.addEventListener("mouseup", handleMouseUp);
    });
  });
});
