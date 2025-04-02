class NoteComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.render();
      this.loadNote(); // Carregar a anotação salva
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .note {
            background: #fff;
            border: 1px solid #ddd;
            padding: 10px;
            margin: 10px;
            border-radius: 5px;
            height: 120px;
            width: 220px;
          }
          .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
          }
          button {
            cursor: pointer;
          }
        </style>
        <textarea class="note" placeholder="faça uma anotação"></textarea>
        <div class="button-container">
          <button id="saveNote">Salvar</button>
          <button id="clearNote">Limpar</button>
          <button id="startVoiceRecognition">Falar</button>
        </div>
      `;
  
      this.shadowRoot.querySelector("#saveNote").addEventListener("click", () => {
        this.saveNote();
      });
  
      this.shadowRoot.querySelector("#clearNote").addEventListener("click", () => {
        this.clearNote();
      });
  
      this.shadowRoot.querySelector("#startVoiceRecognition").addEventListener("click", () => {
        this.startVoiceRecognition();
      });
    }
  
    saveNote() {
      const noteText = this.shadowRoot.querySelector(".note").value;
      localStorage.setItem("userNote", noteText);
      alert("Anotação salva!");
    }
  
    loadNote() {
      const savedNote = localStorage.getItem("userNote"); // Carrega do localStorage
      if (savedNote) {
        this.shadowRoot.querySelector(".note").value = savedNote;
      }
    }
  
    clearNote() {
      this.shadowRoot.querySelector(".note").value = "";
      localStorage.removeItem("userNote");
      alert("Anotação apagada!");
    }
  
    startVoiceRecognition() {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "pt-BR"; 
      recognition.start();
  
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.shadowRoot.querySelector(".note").value = transcript;
      };
  
      recognition.onerror = (event) => {
        alert("Erro no reconhecimento de voz: ", event.error);
      };
    }
  }
  
  customElements.define("note-component", NoteComponent);
  