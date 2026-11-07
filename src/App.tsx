import { useState } from "react"
import { BrandIcon, useProfileFavicon } from "./components/BrandIcon"
import { ComponentShowcase } from "./components/ComponentShowcase"
import { navItems, palettes, profiles } from "./data/style-guide"

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.3 15.7A9 9 0 0 1 8.3 3.7a9 9 0 1 0 12 12Z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export default function App() {
  const [dark, setDark] = useState(false)
  const [copied, setCopied] = useState("")
  const [profile, setProfile] = useState("admin")

  useProfileFavicon(profile)

  const copyColor = async (value: string) => {
    await navigator.clipboard?.writeText(value)
    setCopied(value)
    window.setTimeout(() => setCopied(""), 1200)
  }

  return (
    <div className={dark ? "app dark" : "app"} data-profile={profile}>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Talento.Dev, inicio">
          <BrandIcon role={profile} />
          <span className="brand-name">Talento.Dev</span>
          <span className="brand-divider" />
          <span className="brand-meta">Guía de estilo&nbsp;&nbsp;</span>
        </a>
        <div className="top-actions">
          <div
            className="profile-switch"
            role="group"
            aria-label="Perfil activo"
          >
            {profiles.map((p) => (
              <button
                key={p.id}
                className={profile === p.id ? "on" : ""}
                onClick={() => setProfile(p.id)}
              >
                <BrandIcon role={p.id} className="tab-icon" />
                {p.name.split(" ")[0]}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="pdf-button"
            onClick={async () => {
              await document.fonts.ready
              window.print()
            }}
            title="Abre el diálogo de impresión: selecciona Guardar como PDF"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v12m-4-4 4 4 4-4M5 16v5h14v-5" />
            </svg>
            <span>Descargar PDF</span>
          </button>
          <button
            className="icon-button"
            onClick={() => setDark(!dark)}
            aria-label="Cambiar tema"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      <aside className="sidebar">
        <nav aria-label="Secciones de la guía">
          {navItems.map(([number, label], index) => (
            <a
              href={`#${label.toLowerCase().replaceAll(" ", "-")}`}
              className={index === 0 ? "active" : ""}
              key={label}
            >
              <span>{number}</span>
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <main id="top">
        <section className="hero" id="fundamentos">
          <div className="eyebrow">
            <span>01</span> Fundamentos
          </div>
          <div className="hero-grid hero-intro">
            <div>
              <h1 className="hero-title">
                <strong>Talento.Dev</strong>
              </h1>
              <p className="hero-copy">
                <strong>Diseño funcional e interfaz</strong>
              </p>
              <p className="hero-copy">
                Esta guía reúne el estilo y elementos que dan forma a nuestro proyecto.
              </p>
            </div>
          </div>
          <div className="project-details">
            <h2>Datos académicos y participantes</h2>
            <div className="identity-table-wrap">
              <table className="identity-table" aria-label="Datos académicos del proyecto">
                <tbody>
                  {[
                    ["Centro", "IES Albarregas"],
                    ["Ciclo", "CFGS Desarrollo de Aplicaciones Web (DAW)"],
                    ["Curso", "2.º"],
                    ["Módulo", "Proyecto Intermodular de Desarrollo de Aplicaciones Web (0616)"],
                    ["Fase", "Fase 2 · Diseño y planificación del proyecto"],
                    ["Proyecto ", "Talento.Dev"],
                    ["Continuidad", "Actividades 1 y 2\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"],
                  ].map(([label, value]) => (
                    <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>
                  ))}
                  <tr>
                    <th scope="row">Participantes</th>
                    <td>
                      <ul className="participant-list">
                        <li>Lira Acedo Gijon</li>
                        <li>José Fernando Villar Bueno</li>
                        <li>Daniel González Jiménez</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="identity-block">
            <h2>1.1 Nombre definitivo del proyecto</h2>
            <div className="identity-table-wrap">
              <table className="identity-table">
                <thead>
                  <tr>
                    <th scope="col">Nombre provisional</th>
                    <th scope="col">Nombre definitivo</th>
                    <th scope="col">Motivo del cambio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TalentoDev</td>
                    <td>
                      <span className="fg-inline-bold font-bold">Talento.Dev</span>
                    </td>
                    <td>
                      El nombre inicial coincidía con el de otras marcas. Se
                      incorporó el punto para diferenciar la identidad del
                      proyecto y reforzar su vínculo con el desarrollo de
                      software y el empleo tecnológico.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="identity-block">
            <h2>1.2 Logotipo y variantes</h2>
            <p className="identity-description">
              El símbolo combina un pingüino, un birrete y el signo de código
              «&lt;/&gt;». El birrete representa el aprendizaje y la preparación
              profesional; el código sitúa la marca en el ámbito del desarrollo.
              Junto al nombre Talento.Dev, expresa la conexión entre formación,
              talento y oportunidades laborales.
            </p>
            <figure className="identity-logo">
              <div className="identity-lockup">
                <BrandIcon role={profile} className="identity-icon" />
                <span>Talento.Dev</span>
              </div>
              <figcaption>
                Logotipo principal ·{" "}
                {profiles.find((p) => p.id === profile)?.name}
              </figcaption>
            </figure>
            <div className="identity-table-wrap">
              <table className="identity-table identity-variants">
                <thead>
                  <tr>
                    <th scope="col">Variante</th>
                    <th scope="col">Ejemplo</th>
                    <th scope="col">Cuándo se utiliza</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Reducida / icono</th>
                    <td>
                      <BrandIcon
                        role={profile}
                        className="identity-small-icon"
                      />
                    </td>
                    <td>
                      Favicon, icono de la aplicación y espacios donde el nombre
                      completo no cabe.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Fondo oscuro</th>
                    <td>
                      <div className="identity-lockup identity-inverse">
                        <BrandIcon
                          role={profile}
                          className="identity-small-icon"
                        />
                        <span>Talento.Dev</span>
                      </div>
                    </td>
                    <td>
                      Cabeceras y pies de página. El nombre se presenta en
                      blanco y el símbolo mantiene sus colores.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Por perfil</th>
                    <td>
                      <div className="identity-role-icons">
                        {profiles.map((p) => (
                          <span key={p.id}>
                            <BrandIcon
                              role={p.id}
                              className="identity-small-icon"
                            />
                            <small>{p.name}</small>
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      Dependiendo del perfil iniciado el logo se mostrara de un color u otro.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="color">
          <div className="section-heading">
            <div className="eyebrow">
              <span>02</span> Color
            </div>
            <p>
              Una paleta breve y reconocible. El color guía, jerarquiza y aporta
              carácter.
            </p>
          </div>
          {palettes[profile].map((group) => (
            <div className="color-group" key={group.group}>
              <span className="component-label">{group.group}</span>
              <div
                className="color-grid"
                style={{
                  gridTemplateColumns: `repeat(${group.colors.length}, minmax(0, 1fr))`,
                }}
              >
                {group.colors.map((color) => (
                  <button
                    className="color-card"
                    key={color.use}
                    onClick={() => copyColor(color.value)}
                  >
                    <span
                      className="swatch"
                      style={{ background: color.value }}
                    >
                      <span>
                        {copied === color.value ? "Copiado" : "Copiar"}
                      </span>
                    </span>
                    <span className="color-info">
                      <strong>{color.use}</strong>
                      <small>{color.value}</small>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="color-rule">
            <span className="rule-index">80%</span>
            <p>
              <strong>La regla del 80/20</strong>Usa los tonos neutros como base
              y reserva los acentos para acciones y momentos clave.
            </p>
            <div className="ratio-bar">
              <i />
              <b />
            </div>
          </div>
        </section>

        <section id="tipografía">
          <div className="section-heading">
            <div className="eyebrow">
              <span>03</span> Tipografía
            </div>
            <p>
              Playfair Display aporta presencia editorial en títulos y
              encabezados; Inter garantiza lectura clara en textos, párrafos e
              interfaz.
            </p>
          </div>
          <div className="type-families">
            <div className="type-family">
              <span>Títulos · Serif</span>
              <h2>Playfair Display</h2>
              <p>Para H1–H4 y encabezados destacados.</p>
              <div className="type-specimen">Aa Bb Cc Dd Ee 0123456789</div>
            </div>
            <div className="type-family sans">
              <span>Textos y párrafos · Sans serif</span>
              <h2>Inter</h2>
              <p>Para párrafos, enlaces, etiquetas y controles.</p>
              <div className="type-specimen">Aa Bb Cc Dd Ee 0123456789</div>
            </div>
          </div>
          <div className="type-scale">
            <div className="type-head">
              <span>Nivel</span>
              <span>Muestra</span>
              <span>Especificación</span>
            </div>
            {[
              {
                level: "H1",
                sample: "Título",
                font: "Playfair Display",
                serif: true,
                weight: "Bold",
                fw: 700,
                size: 48,
                line: 56,
              },
              {
                level: "H2",
                sample: "Subtítulo",
                font: "Playfair Display",
                serif: true,
                weight: "SemiBold",
                fw: 600,
                size: 32,
                line: 40,
              },
              {
                level: "H3",
                sample: "Título bloque",
                font: "Playfair Display",
                serif: true,
                weight: "SemiBold",
                fw: 600,
                size: 24,
                line: 32,
              },
              {
                level: "H4",
                sample: "Título tarjeta",
                font: "Playfair Display",
                serif: true,
                weight: "Medium",
                fw: 500,
                size: 20,
                line: 28,
              },
              {
                level: "Párrafo",
                sample: "Párrafo",
                font: "Inter",
                serif: false,
                weight: "Regular",
                fw: 400,
                size: 16,
                line: 24,
              },
              {
                level: "Texto secundario",
                sample: "Texto secundario",
                font: "Inter",
                serif: false,
                weight: "Regular",
                fw: 400,
                size: 14,
                line: 20,
              },
              {
                level: "Enlace",
                sample: "Enlace",
                font: "Inter",
                serif: false,
                weight: "Medium",
                fw: 500,
                size: 16,
                line: 24,
              },
              {
                level: "Texto pequeño",
                sample: "Texto pequeño",
                font: "Inter",
                serif: false,
                weight: "Regular",
                fw: 400,
                size: 12,
                line: 16,
              },
              {
                level: "Etiqueta",
                sample: "Etiqueta",
                font: "Inter",
                serif: false,
                weight: "Regular",
                fw: 400,
                size: 12,
                line: 16,
              },
            ].map((t) => (
              <div key={t.level}>
                <span>{t.level}</span>
                <strong
                  className={`${t.serif ? "font-serif-sample" : "font-sans-sample"
                    } ${t.level === "Enlace"
                      ? "type-link"
                      : t.level === "Texto secundario"
                        ? "type-muted"
                        : ""
                    }`}
                  style={{
                    fontSize: t.size,
                    lineHeight: `${t.line}px`,
                    fontWeight: t.fw,
                  }}
                >
                  {t.sample}
                </strong>
                <small>
                  {t.font} {t.weight}
                  <br />
                  {t.size}px / {t.line}px
                </small>
              </div>
            ))}
          </div>
        </section>

        <section id="espaciado">
          <div className="section-heading">
            <div className="eyebrow">
              <span>04</span> Espaciado
            </div>
            <p>
              Una escala basada en 4 crea ritmo, equilibrio y consistencia en
              cualquier formato.
            </p>
          </div>
          <div className="spacing-scale">
            {[4, 8, 12, 16, 24, 32, 48, 64].map((size) => (
              <div key={size}>
                <span style={{ width: `${size * 1.35}px` }} />
                <b>{size}</b>
              </div>
            ))}
          </div>
        </section>

        <ComponentShowcase />

        <section id="criterios-de-uso">
          <div className="section-heading">
            <div className="eyebrow">
              <span>06</span> Criterios de uso
            </div>
          </div>
          <div className="identity-block">
            <h2>6.1 Componentes</h2>
            <div className="identity-table-wrap">
              <table className="identity-table usage-table">
                <thead>
                  <tr>
                    <th scope="col">Elemento</th>
                    <th scope="col">Regla de uso</th>
                    <th scope="col">Por qué</th>
                    <th scope="col">Dónde se ve</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "A · Botones",
                    "A · Botones varios · Redes sociales",
                    "B · Campos",
                    "B · Componentes de búsqueda",
                    "C · Estados · Disponibilidad",
                    "D · Mensajes",
                    "E · Etiquetas · Tecnologías",
                    "F · Logotipo y cabecera",
                  ].map((element) => (
                    <tr key={element}>
                      <th scope="row">{element}</th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="identity-block">
            <h2>6.2 Tipografía</h2>
            <div className="identity-table-wrap">
              <table className="identity-table usage-table">
                <thead>
                  <tr>
                    <th scope="col">Uso</th>
                    <th scope="col">Tipografía</th>
                    <th scope="col">Origen / licencia</th>
                    <th scope="col">Motivo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Titulares</th>
                    <td>Playfair Display</td>
                    <td>Google Fonts · SIL Open Font License</td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">Texto e interfaz</th>
                    <td>Inter</td>
                    <td>Google Fonts · SIL Open Font License</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="perfiles">
          <div className="section-heading">
            <div className="eyebrow">
              <span>07</span> Perfiles
            </div>
            <p>
              Cada perfil tiene su propio color para que la persona sepa siempre
              en qué espacio está. Selecciona uno para aplicarlo a toda la guía.
            </p>
          </div>
          <div className="profile-grid">
            {profiles.map((p) => (
              <button
                key={p.id}
                className={`profile-card ${profile === p.id ? "on" : ""}`}
                onClick={() => setProfile(p.id)}
              >
                <span
                  className="profile-head"
                  style={{ background: p.primary }}
                >
                  <BrandIcon role={p.id} className="profile-icon" />
                  <small>{p.role}</small>
                  <strong>{p.id === "candidate" ? "Demandante " : p.name}</strong>
                </span>
                <span className="profile-swatches">
                  {[
                    ["Principal", p.primary],
                    ["Acento", p.accent],
                    ["Secundario", p.soft],
                  ].map(([label, value]) => (
                    <span key={label}>
                      <i style={{ background: value }} />
                      <b>{label}</b>
                      <small>{value}</small>
                    </span>
                  ))}
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
