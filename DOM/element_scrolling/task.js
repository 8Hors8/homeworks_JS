document.addEventListener("scroll", () => {
    const revealBlocks = document.querySelectorAll(".reveal");

    revealBlocks.forEach(block => {
        const { top, bottom } = block.getBoundingClientRect();
        const isVisible = top < window.innerHeight && bottom > 0;

        if (isVisible) {
            block.classList.add("reveal_active");
        } else {
            block.classList.remove("reveal_active");
        }
    });
});