class NoteCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const template = createElement("template");

    template.innerHTML = `
      <style>
       
      </style>
      <div >
        
      </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("note-card", NoteCard);
