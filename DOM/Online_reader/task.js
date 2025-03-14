document.addEventListener("DOMContentLoaded", () => {
    const book = document.getElementById("book");
    const fontSizeControls = document.querySelectorAll(".book__control_font-size .font-size");
    const textColorControls = document.querySelectorAll(".book__control_color .color");
    const bgColorControls = document.querySelectorAll(".book__control_background .color");

    function changeClass(elements, activeClass, bookClassPrefix, newClass) {
        elements.forEach(el => el.classList.remove(activeClass));
        this.classList.add(activeClass);

        Array.from(book.classList).forEach(cls => {
            if (cls.startsWith(bookClassPrefix)) {
                book.classList.remove(cls);
            }
        });

        if (newClass) book.classList.add(newClass);
    }

    fontSizeControls.forEach(control => {
        control.addEventListener("click", function(event) {
            event.preventDefault();
            let size = this.dataset.size;
            let newClass = size === "small" ? "book_fs-small" : size === "big" ? "book_fs-big" : "";
            changeClass.call(this, fontSizeControls, "font-size_active", "book_fs-", newClass);
        });
    });

    textColorControls.forEach(control => {
        control.addEventListener("click", function(event) {
            event.preventDefault();
            let textColor = this.dataset.textColor;
            let newClass = textColor ? `book_color-${textColor}` : "";
            changeClass.call(this, textColorControls, "color_active", "book_color-", newClass);
        });
    });

    bgColorControls.forEach(control => {
        control.addEventListener("click", function(event) {
            event.preventDefault();
            let bgColor = this.dataset.bgColor;
            let newClass = bgColor ? `book_bg-${bgColor}` : "";
            changeClass.call(this, bgColorControls, "color_active", "book_bg-", newClass);
        });
    });
});
