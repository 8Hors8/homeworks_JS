document.addEventListener("DOMContentLoaded", () => {
    const editorElement = document.getElementById("editor");
    const clearButton = document.querySelector(".clear");
    
    class SaveText {
      constructor() {
        this.text = null;
        this.updateButtonVisibility(); 
      }
  
      
      updateButtonVisibility() {
        const textExists = editorElement.value.length > 0;
        clearButton.classList.toggle("clear_active", textExists);
      }
  
      listenerEditor() {
        editorElement.addEventListener("input", (e) => {
          this.text = e.target.value;
          localStorage.setItem("textEditor", this.text);
          this.updateButtonVisibility(); 
        });
      }
  
      clearButtonListener() {
        clearButton.addEventListener("click", () => {
          editorElement.value = "";
          localStorage.removeItem("textEditor");
          this.updateButtonVisibility(); 
        });
      }
  
      initProcess() {
        editorElement.value = localStorage.getItem("textEditor") || "";
        this.listenerEditor();
        this.clearButtonListener();
        this.updateButtonVisibility(); 
      }
    }
  
    const saveText = new SaveText();
    saveText.initProcess();
  });
  