document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("subscribe-modal");
    const closeModal = document.querySelector(".modal__close");

    
    function getCookie(name) {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    
    if (!getCookie("modalClosed")) {
        modal.classList.add("modal_active"); 
    }

    closeModal.addEventListener("click", () => {
        modal.classList.remove("modal_active"); 
        document.cookie = "modalClosed=true; path=/; max-age=31536000"; 
    });
});
