const assetPathPrefix = `${import.meta.env.BASE_URL}assets`
function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  )
}

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    path: "M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.31h.04c.39-.74 1.36-1.52 2.79-1.52 2.98 0 3.58 1.96 3.58 4.51v5.25Z",
  },
  {
    name: "GitHub",
    href: "https://github.com/",
    path: "M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.24c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.32c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z",
  },
  {
    name: "X",
    href: "https://x.com/",
    path: "M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.43L5.55 22H2.4l8.2-9.38L.8 2h6.4l4.44 6.77L18.9 2ZM17.8 20h1.73L6.25 4H4.4L17.8 20Z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.25.2 2.25.2v2.46h-1.27c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z",
  },
]

export function ComponentShowcase() {
  return (
    <section id="componentes">
      <div className="section-heading">
        <div className="eyebrow">
          <span>05</span> Componentes
        </div>
        <p>
          Piezas simples y accesibles que mantienen el lenguaje del sistema en
          cada interacción.
        </p>
      </div>
      <div className="component-board">
        <div className="component-group">
          <span className="component-label">Botones</span>
          <div className="button-row">
            <button className="btn primary">
              Acción principal <ArrowIcon />
            </button>
            <button className="btn secondary">Acción secundaria</button>
            <button className="btn text">
              Botón de texto <ArrowIcon />
            </button>
            <button className="btn secondary" disabled>
              Desactivado
            </button>
          </div>
          <p className="component-note">Botones varios · Redes sociales</p>
          <div className="social-buttons">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                aria-label={`${social.name} (abre en una pestaña nueva)`}
                title={social.name}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        <div className="component-group">
          <span className="component-label">Campos</span>
          <div className="field-row">
            <label>
              <span>Correo electrónico</span>
              <input placeholder="nombre@ejemplo.com" />
            </label>
            <label>
              <span>Mensaje</span>
              <input defaultValue="Todo listo para empezar" />
            </label>
          </div>
        </div>
        <div className="component-group">
          <span className="component-label">Componentes de búsqueda</span>
          <p className="component-note">
            Controles de ejemplo para filtrar busquedas
          </p>
          <div className="search-demo">
            <label className="demo-field">
              Buscar oportunidades
              <input
                type="search"
                placeholder="Puesto, empresa o tecnología…"
              />
            </label>
            <fieldset className="demo-options">
              <legend>Modalidad de trabajo</legend>
              {["Remoto", "Híbrido", "Presencial"].map((mode, index) => (
                <label key={mode}>
                  <input
                    type="radio"
                    name="demo-work-mode"
                    value={mode}
                    defaultChecked={index === 0}
                  />
                  {mode}
                </label>
              ))}
            </fieldset>
            <label className="demo-check">
              <input type="checkbox" /> Solo ofertas con salario publicado
            </label>
            <label className="demo-field">
              Nivel de experiencia
              <select defaultValue="">
                <option value="" disabled>
                  Selecciona un nivel
                </option>
                <option>Junior</option>
                <option>Intermedio</option>
                <option>Senior</option>
              </select>
            </label>
          </div>
        </div>
        <div className="component-group">
          <span className="component-label">Estados · Disponibilidad</span>
          <div className="availability-list">
            <span className="availability available">
              <i />
              Disponible
            </span>
            <span className="availability considering">
              <i />
              Abierto a propuestas
            </span>
            <span className="availability unavailable">
              <i />
              No disponible
            </span>
          </div>
        </div>
        <div className="component-group">
          <span className="component-label">Mensajes</span>
          <div className="message-list">
            <div className="demo-message available">
              <span aria-hidden="true">✓</span>
              <div>
                <strong>Perfil actualizado</strong>
                <p>Los cambios se han guardado correctamente.</p>
              </div>
            </div>
            <div className="demo-message unavailable">
              <span aria-hidden="true">!</span>
              <div>
                <strong>Revisa los datos</strong>
                <p>Completa los campos obligatorios antes de continuar.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="component-group">
          <span className="component-label">Etiquetas · Tecnologías</span>
          <p className="component-note">
            Identifican las habilidades de un perfil o los requisitos de una
            oferta.
          </p>
          <div className="technology-tags">
            {[
              ["SQL", "azuresqldatabase"],
              ["Java", "java"],
              ["JavaScript", "javascript"],
              ["TypeScript", "typescript"],
              ["Python", "python"],
              ["React", "react"],
              ["Node.js", "nodejs"],
              ["HTML", "html5"],
              ["CSS", "css3"],
              ["Docker", "docker"],
            ].map(([technology, icon]) => (
              <span
                className="technology-tag"
                data-technology={icon}
                key={technology}
              >
                <img src={`${assetPathPrefix}/technologies/${icon}.svg`} alt="" aria-hidden="true" />
                {technology}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
