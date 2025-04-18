import { showFeedback } from "../public/js/helpers/functions.js";

class VoiceNoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
        <style>
          .card {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1rem;
            width: 90%;
            max-width: 500px;
            margin: 0 auto;
            box-sizing: border-box;
          }

          h2 {
            margin: 0;
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
            text-align: center;
          }

          textarea {
            width: 100%;
            height: 120px;
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 1rem;
            resize: vertical;
            box-sizing: border-box;
          }

          .buttons {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          button {
            padding: 0.75rem;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.3s;
            width: 100%;
          }

          button.record { background-color: #4f46e5; color: white; }
          button.save   { background-color: #10b981; color: white; }
          button.load   { background-color: #6b7280; color: white; }

          button:hover {
            opacity: 0.9;
          }

          @media (min-width: 480px) {
            .buttons {
              flex-direction: row;
              justify-content: center;
            }

            button {
              width: auto;
              min-width: 120px;
            }
          }
        </style>

        <div class="card">
          <h2>Anotações por Voz</h2>
          <textarea id="noteArea" placeholder="Fale algo..."></textarea>
          <div class="buttons">
            <button class="record" id="recordBtn">🎤 Gravar</button>
            <button class="save" id="saveBtn">💾 Salvar</button>
            <button class="load" id="loadBtn">📂 Carregar</button>
          </div>
        </div>
      `;
  }

  connectedCallback() {
    const recordBtn = this.shadowRoot.getElementById("recordBtn");
    const saveBtn = this.shadowRoot.getElementById("saveBtn");
    const loadBtn = this.shadowRoot.getElementById("loadBtn");
    const noteArea = this.shadowRoot.getElementById("noteArea");

    // Reconhecimento de voz
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showFeedback(
        "API de reconhecimento de voz não suportada neste navegador.",
        "info"
      );

      //   alert("API de reconhecimento de voz não suportada neste navegador.");
      recordBtn.disabled = true;
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recordBtn.addEventListener("click", () => {
      recognition.start();
      recordBtn.textContent = "🎤 Gravando...";
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      noteArea.value += transcript + "\n";
      recordBtn.textContent = "🎤 Gravar";
    };

    recognition.onerror = (event) => {
      showFeedback(`Erro no reconhecimento de voz:", ${event.error}`, "error");
      console.error("Erro no reconhecimento de voz:", event.error);
      recordBtn.textContent = "🎤 Gravar";
    };

    // Salvar

    saveBtn.addEventListener("click", () => {
      localStorage.setItem("voiceNote", noteArea.value);

      showFeedback(`Anotação salva com sucesso!`, "success");
    });

    // Carregar
    loadBtn.addEventListener("click", () => {
      const savedNote = localStorage.getItem("voiceNote");

      if (!savedNote) {
        showFeedback(`Nenhuma anotação salva anteriormente!`, "info");
        return;
      }

      noteArea.value = savedNote;
    });
  }
}

customElements.define("voice-note-card", VoiceNoteCard);
