document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
        const valueElement = dropdown.querySelector(".dropdown__value");
        const ulList = dropdown.querySelector(".dropdown__list");
        const dropdownItems = dropdown.querySelectorAll(".dropdown__item");

        
        valueElement.addEventListener("click", () => {
            ulList.classList.toggle("dropdown__list_active");
        });

        
        dropdownItems.forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                valueElement.textContent = e.target.textContent;
                ulList.classList.remove("dropdown__list_active");
            });
        });

        
        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target)) {
                ulList.classList.remove("dropdown__list_active");
            }
        });
    });
});
