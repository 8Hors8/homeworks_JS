document.addEventListener("DOMContentLoaded", () => {
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  document.body.appendChild(tooltip);

  const links = document.querySelectorAll(".has-tooltip");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();     

      tooltip.textContent = event.target.getAttribute("title");
      tooltip.style.left = event.clientX  + 10 + "px";
      tooltip.style.top = event.clientY  + 10 + "px";
      tooltip.classList.add("tooltip_active");      

      const handleMouseUp = () => {
        tooltip.classList.remove("tooltip_active");
        document.removeEventListener("mouseup", handleMouseUp);
      };
      document.addEventListener("mouseup", handleMouseUp);      
    });
  });
});
