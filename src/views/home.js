import { renderChat } from "../chat.js";

export function renderHome(app) {
  app.innerHTML = `
    <div class="home-container">
      <h1>Chateá con tu <span>personaje favorito</span></h1>

      <p>
        Elegí un personaje y empezá una conversación.
        Cada uno tiene su propia personalidad.
      </p>

      <div class="character-grid">

        <div class="character-card card-hermione" data-char="hermione">
          <i class="ti ti-book-2 icon-tabler"></i>
          <h3>Hermione</h3>
          <p>Inteligente y lógica</p>
        </div>

        <div class="character-card card-dobby" data-char="dobby">
          <i class="ti ti-shoe icon-tabler"></i>
          <h3>Dobby</h3>
          <p>Habla en tercera persona</p>
        </div>

        <div class="character-card card-homero" data-char="homero">
          <i class="ti ti-cookie icon-tabler"></i>
          <h3>Homero</h3>
          <p>Torpe y gracioso</p>
        </div>

        <div class="character-card card-lisa" data-char="lisa">
          <i class="ti ti-music icon-tabler"></i>
          <h3>Lisa</h3>
          <p>Inteligente y reflexiva</p>
        </div>

      </div>

      <button class="btn-primary" id="btn-ir-chat">
        Ir al chat →
      </button>
    </div>
  `;

  document.querySelectorAll(".character-card").forEach((card) => {
    card.addEventListener("click", () => {
      history.pushState({}, "", "/chat");
      document.querySelector('nav a[href="/chat"]')?.classList.add("active");
      document.querySelector('nav a[href="/home"]')?.classList.remove("active");
      renderChat(card.dataset.char);
    });
  });

  document
    .querySelector("#btn-ir-chat")
    .addEventListener("click", () => {
      history.pushState({}, "", "/chat");
      document.querySelector('nav a[href="/chat"]')?.classList.add("active");
      document.querySelector('nav a[href="/home"]')?.classList.remove("active");
      renderChat();
    });
}