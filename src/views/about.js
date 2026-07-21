export function renderAbout(app) {
  app.innerHTML = `
    <div class="about-container">

      <h1>Sobre este proyecto</h1>

      <div class="about-card">
        <h2><i class="ti ti-info-circle"></i> ¿Qué es esto?</h2>

        <p>
          Una aplicación web de chat interactivo desarrollada
          como proyecto del Módulo 3.

          Permite simular conversaciones con distintos personajes
          de manera dinámica.
        </p>
      </div>

      <div class="about-card">
        <h2><i class="ti ti-users"></i> Los personajes</h2>

        <div class="about-character-list">
          <div class="about-character-item char-hermione">
            <i class="ti ti-book-2"></i>
            <strong>Hermione Granger</strong>
          </div>
          <div class="about-character-item char-dobby">
            <i class="ti ti-shoe"></i>
            <strong>Dobby</strong>
          </div>
          <div class="about-character-item char-homero">
            <i class="ti ti-cookie"></i>
            <strong>Homero Simpson</strong>
          </div>
          <div class="about-character-item char-lisa">
            <i class="ti ti-music"></i>
            <strong>Lisa Simpson</strong>
          </div>
        </div>
      </div>

      <div class="about-card">
        <h2><i class="ti ti-code"></i> Tecnologías</h2>

        <div class="about-tech-list">
          <span class="about-tech-item"><i class="ti ti-brand-html5"></i> HTML</span>
          <span class="about-tech-item"><i class="ti ti-brand-css3"></i> CSS</span>
          <span class="about-tech-item"><i class="ti ti-brand-javascript"></i> JavaScript</span>
          <span class="about-tech-item"><i class="ti ti-route"></i> SPA Routing</span>
          <span class="about-tech-item"><i class="ti ti-server-2"></i> Vercel Functions</span>
          <span class="about-tech-item"><i class="ti ti-sparkles"></i> Google Gemini API</span>
        </div>
      </div>

      <div class="about-card">
        <h2><i class="ti ti-user-circle"></i> Desarrollado por</h2>

        <p>
          Nadia Starna — FT73 — 2026
        </p>
      </div>
    </div>
  `;
}