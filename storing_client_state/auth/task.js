document.addEventListener("DOMContentLoaded", () => {
    const signinForm = document.getElementById("signin__form");
    const signinBlock = document.getElementById("signin");
    const welcomeBlock = document.getElementById("welcome");
    const userIdSpan = document.getElementById("user_id");
    
    
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
        showWelcome(storedUserId);
    }
    
    signinForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const formData = new FormData(signinForm);
        
        fetch("https://students.netoservices.ru/nestjs-backend/auth", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem("user_id", data.user_id);
                showWelcome(data.user_id);
            } else {
                alert("Неверный логин/пароль");
            }
        })
        .catch(error => console.error("Ошибка запроса:", error));
    });
    
    function showWelcome(userId) {
        userIdSpan.textContent = userId;
        signinBlock.classList.remove("signin_active");
        welcomeBlock.classList.add("welcome_active");
        addLogoutButton();
    }
    
    function addLogoutButton() {
        let logoutButton = document.getElementById("logout_btn");
        if (!logoutButton) {
            logoutButton = document.createElement("button");
            logoutButton.id = "logout_btn";
            logoutButton.classList.add("btn");
            logoutButton.textContent = "Выйти";
            welcomeBlock.appendChild(logoutButton);
        }
        logoutButton.addEventListener("click", logout);
    }
    
    function logout() {
        localStorage.removeItem("user_id");
        welcomeBlock.classList.remove("welcome_active");
        signinBlock.classList.add("signin_active");
        signinForm.reset();
    }
});