document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const fileInput = document.getElementById("file");
    const progress = document.getElementById("progress");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        if (!fileInput.files.length) {
            alert("Выберите файл для загрузки!");
            return;
        }

        const file = fileInput.files[0]; 
        const formData = new FormData(); 
        formData.append("file", file); 

        const xhr = new XMLHttpRequest(); 
        xhr.open("POST", form.action, true); 

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = event.loaded / event.total; // 
                progress.value = percentComplete; 
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                alert("Файл успешно загружен!");
                progress.value = 0; 
            } else {
                alert("Ошибка при загрузке файла!");
            }
        };

        xhr.onerror = () => {
            alert("Ошибка соединения!");
        };

        xhr.send(formData); 
    });
});
