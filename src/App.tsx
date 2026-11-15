import { useState } from "react"
import { BrandIcon, useProfileFavicon } from "./components/BrandIcon"
import { ComponentShowcase } from "./components/ComponentShowcase"
import { navItems, palettes, profiles } from "./data/style-guide"
import { getMermaidDiagram } from './utils/mermaidDiagrams';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MermaidChart } from './components/MermaidChart';

const vistasData = [
  {
    id: "iniciar-sesion",
    title: "Inicio de sesión",
    imgName: "iniciosesion.png", // Asegúrate de que el nombre coincida con tu imagen
    profiles: ["admin", "candidate", "recruiter"],
    objetivo: "Permitir a los usuarios acceder a su cuenta en la plataforma.",
    acciones: "Introducir correo y contraseña, marcar 'Recordar sesión', iniciar sesión, recuperar contraseña o ir al registro.",
    navegacion: "Llega desde: Acceso directo. Lleva a: Pantalla principal del rol correspondiente (Demandante, Reclutador o Administrador).",
    rf: "RF13: El sistema permitirá iniciar sesión y cerrarla.",
    decisiones: "Formulario simple y centrado, con enlaces claros para recuperación de contraseña y registro. Campos de texto con iconos para mostrar/ocultar contraseña.",
  },
  {
    id: "registro-cuenta",
    title: "Registro de cuenta (Crea tu cuenta)",
    imgName: "crearcuenta.png", // Asegúrate de que el nombre coincida con tu imagen
    profiles: ["admin", "candidate", "recruiter"],
    objetivo: "Permitir a un nuevo usuario darse de alta en el sistema eligiendo su rol.",
    acciones: "Seleccionar perfil (Reclutador / Demandante), rellenar datos (nombre, correo, contraseña), aceptar términos y condiciones, crear cuenta.",
    navegacion: "Llega desde: Inicio de sesión (enlace 'Regístrate'). Lleva a: Pantalla principal del rol seleccionado.",
    rf: "RF01: El sistema permitirá a los usuarios registrarse.",
    decisiones: "Selector de rol destacado visualmente en la parte superior para adaptar la experiencia desde el primer paso. Formulario unificado con validación de contraseña y checkbox obligatorio de términos.",
  },
  {
    id: "abrir-ticket",
    title: "Abrir ticket",
    imgName: "abrirticket.png",
    profiles: ["admin"], // Generalmente todos los usuarios pueden abrir tickets, aunque la captura sea del admin
    objetivo: "Permitir al usuario reportar una incidencia o problema técnico.",
    acciones: "Rellenar formulario (título, prioridad, categoría, descripción), enviar o cancelar.",
    navegacion: "Llega desde: Tickets / Nuevo ticket. Lleva a: Lista de tickets.",
    rf: "N/A: No existe un RF específico para tickets de soporte en la tabla proporcionada.",
    decisiones: "Formulario claro con campos obligatorios y texto de ayuda para no compartir datos sensibles.",
  },
  {
    id: "tabla-datos",
    title: "Tabla de Base de Datos",
    imgName: "basedatos.png",
    profiles: ["admin"],
    objetivo: "Consultar y filtrar los registros de una tabla específica de la base de datos.",
    acciones: "Buscar datos en la tabla, navegar por las páginas, acceder al mapa conceptual.",
    navegacion: "Llega desde: Bases de datos > ItJobMarketAppDB. Lleva a: Mapa conceptual.",
    rf: "RF17: El sistema permitirá acceder y gestionar a las bases de datos de los diferentes servicios.",
    decisiones: "Tabla paginada con buscador integrado y botón destacado para ver el mapa conceptual.",
  },
  {
    id: "borrar-usuario",
    title: "Borrar usuario",
    imgName: "borrarusuario.png",
    profiles: ["admin"],
    objetivo: "Buscar una cuenta y eliminarla del sistema.",
    acciones: "Buscar por nombre/correo, revisar datos, hacer clic en el icono de la papelera.",
    navegacion: "Llega desde: Gestión de usuarios. Lleva a: Misma vista actualizada.",
    rf: "RF06: El sistema permitirá gestionar usuarios.",
    decisiones: "Uso de iconos de papelera en rojo para acciones destructivas. Paginación de 50 en 50.",
  },
  {
    id: "buscar-perfiles",
    title: "Buscar perfiles",
    imgName: "buscarperfil.png",
    profiles: ["recruiter"],
    objetivo: "Filtrar y visualizar perfiles de candidatos (Demandantes).",
    acciones: "Filtrar por tecnología, experiencia, ubicación, buscar, marcar como favorito.",
    navegacion: "Llega desde: Menú Búsqueda. Lleva a: Detalle del perfil.",
    rf: "RF04: El sistema permitirá a los reclutadores buscar candidatos mediante filtros. / RF05: Mostrar lista de candidatos.",
    decisiones: "Panel lateral de filtros fijo y tarjetas destacadas en color mostaza con habilidades y botón de favorito.",
  },
  {
    id: "crear-usuario",
    title: "Crear usuario",
    imgName: "crearusuario.png",
    profiles: ["admin"],
    objetivo: "Dar de alta a un nuevo usuario en el sistema.",
    acciones: "Rellenar formulario (nombre, rol, fecha nacimiento, sexo, correo, contraseña), crear.",
    navegacion: "Llega desde: Gestión de usuarios. Lleva a: Lista de usuarios.",
    rf: "RF06: El sistema permitirá gestionar usuarios.",
    decisiones: "Formulario de dos columnas con validación de contraseña segura y selector de rol.",
  },
  {
    id: "detalle-perfil",
    title: "Detalle de perfil",
    imgName: "detallesperfil.png",
    profiles: ["recruiter"],
    objetivo: "Visualizar la información completa de un candidato.",
    acciones: "Leer descripción, revisar tecnologías y leer experiencia.",
    navegacion: "Llega desde: Buscar perfiles. Lleva a: Búsqueda de perfiles (al volver).",
    rf: "RF05: El sistema mostrará una lista de candidatos ordenada según los criterios de búsqueda.",
    decisiones: "Bloques visuales separados por tarjetas blancas con fondo contrastado para destacar la información.",
  },
  {
    id: "mapa-conceptual",
    title: "Mapa conceptual",
    imgName: "mapaconceptual.png",
    profiles: ["admin"],
    objetivo: "Visualizar la estructura lógica de la tabla seleccionada.",
    acciones: "Ver estado vacío (El mapa aún no está disponible).",
    navegacion: "Llega desde: Tabla de Base de Datos. Lleva a: Tabla de Base de Datos (con botón volver).",
    rf: "RF17: El sistema permitirá acceder y gestionar a las bases de datos de los diferentes servicios.",
    decisiones: "Estado vacío elegante con icono y texto claro cuando no hay mapa cargado.",
  },
  {
    id: "modificar-usuario",
    title: "Modificar usuario",
    imgName: "modficarusuario.png",
    profiles: ["admin"],
    objetivo: "Actualizar la información y permisos de una cuenta.",
    acciones: "Editar nombre, apellidos, rol, fecha, sexo, correo, actualizar contraseña.",
    navegacion: "Llega desde: Gestión de usuarios. Lleva a: Lista de usuarios.",
    rf: "RF06: El sistema permitirá gestionar usuarios.",
    decisiones: "Carga automática de datos. Campos de contraseña vacíos por defecto para conservar la actual.",
  },
  {
    id: "ranking-tecnologias",
    title: "Ranking de tecnologías",
    imgName: "ranking.png",
    profiles: ["candidate"],
    objetivo: "Descubrir las tecnologías más demandadas por las empresas.",
    acciones: "Filtrar por tecnología, ubicación, modalidad; buscar; desplegar recursos; guardar en favoritos.",
    navegacion: "Llega desde: Menú principal (Demandante). Lleva a: Recursos de aprendizaje.",
    rf: "RF08: El sistema contará con una vista detallada de un ranking de los requisitos más demandados actualmente en las ofertas de empleo.",
    decisiones: "Listado en tarjetas con numeración destacada y un desplegable para ver los recursos.",
  },
  {
    id: "mi-perfil-reclutador",
    title: "Mi perfil (Reclutador)",
    imgName: "perfil.png",
    profiles: ["recruiter"],
    objetivo: "Permitir al usuario gestionar su propia información personal y credenciales.",
    acciones: "Editar nombre, correo, contraseña, guardar cambios.",
    navegacion: "Llega desde: Menú usuario (Mi perfil). Lleva a: Misma vista actualizada.",
    rf: "RF03: El sistema permitirá a los reclutadores tener y modificar su propio perfil.",
    decisiones: "Interfaz visual con avatar, tarjeta de resumen a la izquierda y formulario a la derecha.",
  },
  {
    id: "ofertas-empleo",
    title: "Ofertas de empleo",
    imgName: "ofertas.png",
    profiles: ["candidate"],
    objetivo: "Consultar oportunidades de empleo y su compatibilidad con el perfil.",
    acciones: "Buscar ofertas y filtrar por tecnología, ubicación y modalidad; revisar tecnologías y actitudes.",
    navegacion: "Llega desde: Navegación principal. Lleva a: Ranking, Recursos o Mi perfil.",
    rf: "RF11: El sistema contará con una vista de ofertas de empleo.",
    decisiones: "Las tarjetas reúnen la oferta, sus tecnologías y actitudes, y una puntuación de compatibilidad.",
  },
  {
    id: "recursos-aprendizaje",
    title: "Recursos de aprendizaje",
    imgName: "recursos.png",
    profiles: ["candidate"],
    objetivo: "Consultar recursos de estudio vinculados a una tecnología demandada.",
    acciones: "Consultar documentación oficial, cursos de introducción y ejercicios prácticos.",
    navegacion: "Llega desde: Recursos del ranking o la navegación. Lleva a: Ranking, Ofertas o Mi perfil.",
    rf: "RF10: El sistema permitirá consultar recursos de estudio desde cada requisito de la vista.",
    decisiones: "Los recursos se agrupan bajo la tecnología seleccionada y su número de ofertas.",
  },
  {
    id: "perfil-demandante",
    title: "Mi perfil (Demandante)",
    imgName: "perfildemadante.png",
    profiles: ["candidate"],
    objetivo: "Consultar y gestionar el perfil del demandante de empleo.",
    acciones: "Editar nombre, correo y contraseña; añadir tecnologías; guardar cambios o cancelar.",
    navegacion: "Llega desde: Mi perfil. Lleva a: Ranking, Ofertas y Recursos de aprendizaje.",
    rf: "RF02: El sistema permitirá a los demandantes de empleo crear y gestionar su perfil.",
    decisiones: "Los datos actuales y el formulario de edición se muestran juntos, con guardar y cancelar separados.",
  },
  {
    id: "perfiles-favoritos",
    title: "Perfiles favoritos",
    imgName: "perfilesfavoritos.png", // Asegúrate de que coincida con el nombre de tu archivo
    profiles: ["recruiter"],
    objetivo: "Consultar y gestionar los perfiles de candidatos que han sido guardados como favoritos.",
    acciones: "Revisar la lista de perfiles guardados, consultar sus habilidades y los criterios de búsqueda, y desmarcar el perfil como favorito.",
    navegacion: "Llega desde: Menú superior ('Perfiles Fav'). Lleva a: Detalle del perfil (al hacer clic sobre un candidato).",
    rf: "RF16: El sistema permitirá enviar notificaciones si perfiles guardados en favoritos, si sufre alguna modificación. (Nota: Este RF implica la existencia de una gestión de favoritos).",
    decisiones: "Se reutiliza el diseño de tarjetas en color mostaza de la vista de búsqueda para mantener la coherencia. Se añade una línea de 'Criterio de búsqueda' para dar contexto de por qué se guardó ese perfil y se mantiene el icono de corazón para poder quitarlo de la lista.",
  },
];

const filas = [
  {
    elemento: "Botones",
    regla: "Botón primario para la acción principal (máx. 1 por vista); secundario para acciones alternativas; terciario (boton de texto) para acciones de baja prioridad.",
    porQue: "Jerarquiza la acción esperada, evita competencia visual entre CTAs y comunica si el botón está disponible o procesando.",
    donde: "Formularios, modales, cabecera de sección, barras de acciones",
  },
  {
    elemento: "Botones de icono · Redes sociales y utilidades",
    regla: "Icono + color marca; tamaño táctil mínimo 44×44 px (icono 24 px); incluir aria-label siempre, también en compartir, guardar y similares.",
    porQue: "Reconocimiento inmediato del canal, accesibilidad para lectores de pantalla y usabilidad táctil (WCAG 2.2).",
    donde: "Footer, sección de contacto, tarjetas de autor, barra de acciones",
  },
  {
    elemento: "Campos",
    regla: "Label(titulo del campo) visible siempre arriba; placeholder solo como ejemplo, nunca sustituto del label. El error incluye texto descriptivo asociado (aria-describedby).",
    porQue: "Mejora accesibilidad (WCAG) y reduce errores de llenado; sin estados el campo no comunica si está bloqueado o inválido.",
    donde: "Login, registro, checkout, edición de perfil",
  },
  {
    elemento: "Componentes de búsqueda",
    regla: "Input con icono lupa, ancho mínimo 240 px. Botón de limpiar (✕) visible solo cuando hay texto; aria-label en input y botón; estado loading mientras se obtienen resultados.",
    porQue: "Feedback inmediato, evita peticiones innecesarias y aclara cuándo hay una búsqueda en curso.",
    donde: "Header, listados, tablas filtrables",
  },
  {
    elemento: "Selects y combobox",
    regla: "Label visible; placeholder como opción deshabilitada («Selecciona…»); soporte de teclado (flechas, Enter, Esc); estados abierto/cerrado y opción seleccionada visibles.",
    porQue: "Los filtros por categoría, ubicación o modalidad son claves en el proyecto, sin teclado ni estados el filtrado se vuelve inaccesible.",
    donde: "Filtros de ofertas, formularios de perfil, configuración",
  },
  {
    elemento: "Checkboxes y radios",
    regla: "Checkbox para selección múltiple; radio para opción excluyente. Área táctil mínima 44×44 px; label clicable; estados focus-visible y disabled definidos.",
    porQue: "La selección de tecnologías y los filtros excluyentes necesitan controles claros y accesibles.",
    donde: "Filtros de búsqueda, preferencias, formularios",
  },
  {
    elemento: "Toggles / switches",
    regla: "Switch para activar o desactivar ajustes con efecto inmediato; incluir label y estado on/off con texto o aria-checked.",
    porQue: "Notificaciones y visibilidad del perfil se gestionan mejor con un control de estado explícito.",
    donde: "Configuración de cuenta, preferencias de notificaciones",
  },
  {
    elemento: "Estados · Disponibilidad",
    regla: "Verde = disponible, ámbar = limitado, rojo = agotado; siempre con icono (✓ ⚠ ✕) y texto explícito, no solo color.",
    porQue: "Accesibilidad para daltónicos y claridad semántica; la combinación color + icono + texto es el estándar WCAG.",
    donde: "Listados de ofertas, reservas, agenda",
  },
  {
    elemento: "Badges e indicadores numéricos",
    regla: "Badge compacto (padding 2–6 px, texto 12 px) para conteos de notificaciones, postulaciones o resultados. Si supera 99 mostrar «99+»; incluir aria-label con el número completo.",
    porQue: "Comunica volumen de información sin recargar la interfaz y sin perder accesibilidad.",
    donde: "Header, tabs, iconos de notificación, filtros",
  },
  {
    elemento: "Mensajes",
    regla: "Info (azul), éxito (verde), advertencia (ámbar), error (rojo). Autocierre solo en éxito e info.",
    porQue: "Consistencia cromática y permite al usuario leer y actuar ante errores antes de que desaparezcan.",
    donde: "Toasts, banners, validaciones inline",
  },
  {
    elemento: "Etiquetas · Tecnologías",
    regla: "Se forma con el logo de la tecnologia + nombre + color descriptivo de fondo y bordes, texto 12 px. No interactivas salvo que actúen como filtro.",
    porQue: "Permite añadir de forma descriptiva las tecnologias o habilidades de un perfil.",
    donde: "Tarjetas de proyecto, perfiles",
  },
  {
    elemento: "Logotipo y cabecera",
    regla: "Logotipo principal (pingüino + texto) en la cabecera en escritorio; en pantallas estrechas, solo el icono y un menú desplegable. Sobre fondo oscuro, versión invertida (texto blanco). Nunca se deforma ni recolorea.",
    porQue: "El nombre completo no cabe en móvil junto al menú. Mantener el logotipo intacto conserva la identidad de marca en cualquier dispositivo o tamaño de pantalla.",
    donde: "Todas las pantallas (Header superior y Footer)",
  },
  {
    elemento: "Tipografía",
    regla: "Playfair Display (Serif) solo en títulos (página, bloque y tarjetas). Inter (Sans-serif) en todo lo demás (textos, interfaz, tablas). Tamaño base de 16 px para textos y nunca menos de 12 px para etiquetas.",
    porQue: "Playfair Display aporta personalidad editorial y jerarquía visual, mientras que Inter está diseñada para pantallas, garantizando legibilidad en tablas y formularios sin fatigar la vista.",
    donde: "Todas las pantallas",
  },
];

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
        <section id="estructura">
          <div className="section-heading">
            <div className="eyebrow"><span>05</span> Estructura general</div>
            <p>La aplicación se organiza en dos grandes áreas. La separación entre consulta/exploración y gestión se mantiene clara: un usuario final no ve las herramientas administrativas.</p>
          </div>

          <div className="estructura-container">

            {/* CAJA SUPERIOR: ACCESO */}
            <div className="estructura-acceso">
              <h3>Acceso</h3>
              <p>Inicio y cierre de sesión. Cada usuario llega a la pantalla principal de su rol.</p>
              <div className="estructura-badges" style={{ justifyContent: 'center' }}>
                <span className="estructura-badge socio">Demandante</span>
                <span className="estructura-badge resp">Reclutador</span>
                <span className="estructura-badge admin">Admin.</span>
              </div>
            </div>

            {/* FLECHAS HACIA ABAJO */}
            <div className="estructura-arrows">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4v16m-6-6 6 6 6-6" /></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4v16m-6-6 6 6 6-6" /></svg>
            </div>

            {/* LAYOUT DE DOS COLUMNAS */}
            <div className="estructura-split">

              {/* COLUMNA IZQUIERDA: CONSULTA */}
              <div className="estructura-zona consulta">
                <div className="estructura-zona-title">Consulta y Exploración</div>

                <div className="estructura-area consulta-box">
                  <h4>Ranking de Tecnologias Demandadas</h4>
                  <p>Consultar y filtrar tecnologías.</p>
                  <div className="estructura-badges">
                    <span className="estructura-badge socio">Demandante</span>
                  </div>
                </div>

                <div className="estructura-area consulta-box">
                  <h4>Búsqueda de Empleo</h4>
                  <p>Buscar ofertas de empleo</p>
                  <div className="estructura-badges">
                    <span className="estructura-badge socio">Demandante</span>
                  </div>
                </div>

                <div className="estructura-area consulta-box">
                  <h4>Visualizacion de Candidatos</h4>
                  <p>Revisión y filtrado de perfiles.</p>
                  <div className="estructura-badges">
                    <span className="estructura-badge resp">Reclutador</span>
                  </div>
                </div>

                <div className="estructura-area consulta-box">
                  <h4>Visualizacion de Ofertas</h4>
                  <p>Revision y filtrado de ofertas de empleo.</p>
                  <div className="estructura-badges">
                    <span className="estructura-badge socio">Demandante</span>
                  </div>
                </div>

                <div className="estructura-area consulta-box">
                  <h4>Recursos de aprendizaje</h4>
                  <p>Acceso a documentación oficial, cursos de introducción y ejercicios prácticos.</p>
                  <div className="estructura-badges">
                    <span className="estructura-badge socio">Demandante</span>
                  </div>
                </div>

                <div className="estructura-area consulta-box">
                  <h4>Mi Perfil y Favoritos</h4>
                  <p>Edición de datos personales, gestión de habilidades tecnológicas y perfiles guardados.</p>
                  <div className="estructura-badges">
                    <span className="estructura-badge socio">Demandante</span>
                    <span className="estructura-badge resp">Reclutador</span>
                  </div>
                </div>
              </div>

              {/* LÍNEA DIVISORIA CENTRAL */}
              <div className="estructura-divisor">
              </div>

              {/* COLUMNA DERECHA: GESTIÓN */}
              <div className="estructura-zona gestion">
                <div className="estructura-zona-title">Gestión y Administración</div>

                {/* CAJA DE ADMINISTRADOR (Colores corregidos) */}
                <div className="estructura-area admin-box">
                  <h4 style={{ color: '#2A2529' }}>Administración del Sistema</h4>
                  <p>Gestion de bases de datos, Control total de usuarios, roles, categorías de tecnologías y métricas globales.</p>
                  <div className="estructura-badges">
                    <span className="estructura-badge admin">Admin.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================= */}
          {/* SECCIÓN 05.1: ACCESOS SEGÚN EL TIPO DE USUARIO */}
          {/* ========================================================= */}
          <div className="identity-block" style={{ marginTop: '60px' }}>
            <h2>5.1 Accesos según el tipo de usuario</h2>

            <div className="identity-table-wrap">
              <table className="identity-table">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '20%' }}>Tipo de usuario</th>
                    <th scope="col" style={{ width: '45%' }}>Áreas a las que accede</th>
                    <th scope="col" style={{ width: '35%' }}>Áreas a las que NO accede</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Demandante</th>
                    <td>
                      Acceso · Ranking de Tecnologías Demandadas · Búsqueda de Empleo · Visualización de Ofertas · Recursos de aprendizaje · Mi Perfil y Favoritos
                    </td>
                    <td>
                      Visualización de Candidatos · Administración del Sistema
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Reclutador</th>
                    <td>
                      Acceso · Visualización de Candidatos · Mi Perfil y Favoritos
                    </td>
                    <td>
                      Ranking de Tecnologías Demandadas · Búsqueda de Empleo · Visualización de Ofertas · Recursos de aprendizaje · Administración del Sistema
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Administrador/a</th>
                    <td>
                      Acceso · Administración del Sistema
                    </td>
                    <td>
                      Ranking de Tecnologías Demandadas · Búsqueda de Empleo · Visualización de Candidatos · Visualización de Ofertas · Recursos de aprendizaje · Mi Perfil y Favoritos
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECCIÓN 06: MAPA DE NAVEGACIÓN (Mermaid.js) */}
        {/* ========================================================= */}
        <section id="navegación">
          <div className="section-heading">
            <div className="eyebrow"><span>06</span> Mapa de navegación</div>
            <p>El mapa detalla el flujo del sistema para el perfil activo (<strong>{profile === "candidate" ? "Demandante" : profile === "recruiter" ? "Reclutador" : "Administrador"}</strong>). Las líneas discontinuas representan acciones secundarias o menús globales.</p>
          </div>

          <div className="pro-diagram" style={{ padding: '2rem', overflowX: 'auto' }}>
            <MermaidChart chart={getMermaidDiagram(profile)} profile={profile} />

            {/* LEYENDA DE LA SECCIÓN 06 */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem', fontSize: '0.8rem', color: 'var(--muted)', borderTop: '1px solid var(--line)', paddingTop: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: '20px', height: '2px', background: 'var(--forest)' }}></span>
                Navegación principal
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: '20px', height: '2px', borderTop: '2px dashed var(--forest)' }}></span>
                Menú global (ida y vuelta)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: '20px', height: '15px', border: '2px dashed var(--forest)', borderRadius: '4px' }}></span>
                Acción secundaria (Modales / Confirmaciones)
              </div>
            </div>
          </div>
        </section>

        {/* 07. COMPONENTES */}
        <div id="componentes">
          <ComponentShowcase />
        </div>

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
                  {filas.map((fila) => (
                    <tr key={fila.elemento}>
                      <th scope="row">{fila.elemento}</th>
                      <td>{fila.regla}</td>
                      <td>{fila.porQue}</td>
                      <td>{fila.donde}</td>
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
                    <td>
                      Serif de alto contraste que aporta carácter editorial y jerarquía
                      visual a los encabezados; transmite rigor y distinción sin resultar
                      anticuada. Ideal para títulos de sección y hero, donde se busca
                      personalidad de marca.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Texto e interfaz</th>
                    <td>Inter</td>
                    <td>Google Fonts · SIL Open Font License</td>
                    <td>
                      Sans serif geométrica diseñada para pantallas: alta legibilidad en
                      tamaños pequeños, métricas estables y amplia cobertura de pesos.
                      Reduce la fatiga visual en formularios, listados y textos largos, y
                      armoniza bien con Playfair Display al compartir proporciones
                      equilibradas.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        {/* ========================================================= */}
        {/* SECCIÓN 07: VISTAS DEL PROYECTO */}
        {/* ========================================================= */}
        <section id="vistas">
          <div className="section-heading">
            <div className="eyebrow">
              <span>07</span> Vistas del sistema
            </div>
            <p>
              Explora las pantallas principales disponibles para el perfil activo: <strong>{profile === "candidate" ? "Demandante" : profile === "recruiter" ? "Reclutador" : "Administrador"}</strong>.
            </p>
          </div>

          <div className="views-list">
            {vistasData
              .filter((vista) => vista.profiles.includes(profile))
              .map((vista, index) => (
                <article className="view-row" key={vista.id}>
                  <div className="view-image">
                    <span className="view-index">{String(index + 1).padStart(2, '0')}</span>
                    <img src={`/images/${vista.imgName}`} alt={vista.title} loading="lazy" />
                  </div>

                  <div className="view-content">
                    <h3>{vista.title}</h3>

                    <table className="view-specs-table">
                      <tbody>
                        <tr>
                          <th>Objetivo</th>
                          <td>{vista.objetivo}</td>
                        </tr>
                        <tr>
                          <th>Acciones</th>
                          <td>{vista.acciones}</td>
                        </tr>
                        <tr>
                          <th>Llega desde / lleva a</th>
                          <td>{vista.navegacion}</td>
                        </tr>
                        <tr>
                          <th>RF</th>
                          <td>{vista.rf}</td>
                        </tr>
                        <tr>
                          <th>Decisiones</th>
                          <td>{vista.decisiones}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </article>
              ))}
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
    </div >
  )
}
