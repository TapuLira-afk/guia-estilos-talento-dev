import { useState } from "react"
import { BrandIcon, useProfileFavicon } from "./components/BrandIcon"
import { ComponentShowcase } from "./components/ComponentShowcase"
import { navItems, palettes, profiles } from "./data/style-guide"
import { getMermaidDiagram } from './utils/mermaidDiagrams';
import { MermaidChart } from './components/MermaidChart';
const trazabilidadData = [
  { rf: "RF01", desc: "El sistema permitirá a los usuarios registrarse.", pantalla: "Registro de sesión", vista: "Acceso común · Administrador, demandante y reclutador", estado: "Implementado" },
  { rf: "RF02", desc: "El sistema permitirá a los demandantes de empleo crear y gestionar su perfil.", pantalla: "Perfil del demandante", vista: "Vista demandante", estado: "Implementado" },
  { rf: "RF03", desc: "El sistema permitirá a los reclutadores tener y modificar su propio perfil", pantalla: "Perfil del reclutador", vista: "Vista reclutador", estado: "Implementado" },
  { rf: "RF04", desc: "El sistema permitirá a los reclutadores buscar candidatos mediante filtros.", pantalla: "Búsqueda de perfiles · Filtros", vista: "Vista reclutador", estado: "Implementado" },
  { rf: "RF05", desc: "El sistema mostrará una lista de candidatos ordenada según los criterios de búsqueda.", pantalla: "Búsqueda de perfiles · Resultados", vista: "Vista reclutador", estado: "Implementado" },
  { rf: "RF06", desc: "El sistema permitirá gestionar usuarios.", pantalla: "Gestión de usuarios · Crear, borrar y modificar usuario", vista: "Vista administrador", estado: "Implementado" },
  { rf: "RF07", desc: "El sistema gestionará la toma de decisiones y la importación automática de los perfiles de linkedin y los requerimientos de las ofertas de empleo.", pantalla: "Gestión de Base de datos", vista: "Vista administrador", estado: "Implementado" },
  { rf: "RF08", desc: "El sistema contará con una vista detallada de un ranking de los requisitos más demandados actualmente en las ofertas de empleo.", pantalla: "Ranking de tecnologías", vista: "Vista demandante", estado: "Implementado" },
  { rf: "RF09", desc: "El sistema permitirá cambiar entre modo claro y oscuro", pantalla: "Sin pantalla implementada", vista: "Vista administrador, demandante y reclutador", estado: "No implementado" },
  { rf: "RF10", desc: "El sistema permitirá consultar recursos de estudio desde cada requisito de la vista.", pantalla: "Ranking de tecnologías / Recursos de aprendizaje", vista: "Vista demandante", estado: "Implementado" },
  { rf: "RF11", desc: "El sistema contará con una vista de ofertas de empleo.", pantalla: "Ofertas de empleo", vista: "Vista demandante", estado: "Implementado" },
  { rf: "RF12", desc: "El sistema permitirá a los usuarios cambiar el idioma de la interfaz entre español e inglés.", pantalla: "Sin pantalla implementada", vista: "Vista administrador, demandante y reclutador", estado: "No implementado" },
  { rf: "RF13", desc: "El sistema permitirá iniciar sesión y cerrarla.", pantalla: "Inicio de sesión", vista: "Acceso común · Administrador, demandante y reclutador", estado: "Implementado" },
  { rf: "RF14", desc: "El sistema permitirá gestionar las ofertas de empleo.", pantalla: "Gestión de Base de datos", vista: "Vista administrador", estado: "Implementado" },
  { rf: "RF15", desc: "El sistema permitirá gestionar los recursos de aprendizaje.", pantalla: "Gestión de Base de datos", vista: "Vista administrador", estado: "Implementado" },
  { rf: "RF16", desc: "El sistema permitirá enviar notificaciones si perfiles guardados en favoritos, si sufre alguna modificación.", pantalla: "Sin notificaciones implementadas · Favoritos como referencia", vista: "Vista reclutador", estado: "No implementado" },
  { rf: "RF17", desc: "El sistema permitirá acceder y gestionar a las bases de datos de los diferentes servicios.", pantalla: "Bases de datos · Tabla / Mapa conceptual", vista: "Vista administrador", estado: "Implementado" },
  { rf: "RF18", desc: "El sistema tendrá una vista para monitorizar el rendimiento de los diferentes sistemas.", pantalla: "Sin pantalla implementada", vista: "Vista administrador", estado: "No implementado" },
];
const recorridosData = [
  {
    id: "R0-registro",
    profile: "all",
    systemTag: "TALENTO.DEV",
    journeyCode: "RECORRIDO R0",
    title: "R0: Creación de cuenta",
    subtitle: "Un nuevo usuario se registra en la plataforma para empezar a buscar empleo o reclutar talento.",
    user: "Nuevo usuario",
    start: "Pantalla de Inicio de Sesión (enlace «Regístrate»)",
    expected: "Cuenta creada y acceso al sistema",
    note: "Ejemplo de uso. El usuario accede al formulario de registro, selecciona su rol y completa sus datos.",
    flowTitle: "Secuencia principal",
    flowSubtitle: "Registro de nuevo usuario",
    flow: [
      { num: "01", label: "Acceso", title: "Ir al registro", detail: "Pulsar «Regístrate» desde el Login" },
      { num: "02", label: "Rol", title: "Seleccionar perfil", detail: "Reclutador o Demandante" },
      { num: "03", label: "Datos", title: "Rellenar formulario", detail: "Nombre, correo, contraseña" },
      { num: "04", label: "Legal", title: "Aceptar términos", detail: "Marcar casilla de condiciones" },
      { num: "05", label: "Resultado", title: "Crear cuenta", detail: "Acceso directo a la plataforma", isFinal: true },
    ],
    stepsTable: [
      { paso: "01", pantalla: "Inicio de sesión", accion: "Pulsa el enlace «Regístrate» situado en la parte inferior del formulario.", respuesta: "Redirige a la pantalla de creación de cuenta." },
      { paso: "02", pantalla: "Crear cuenta", accion: "Selecciona el tipo de perfil deseado (Reclutador o Demandante de empleo).", respuesta: "Adapta el contexto del formulario según el rol seleccionado." },
      { paso: "03", pantalla: "Crear cuenta", accion: "Rellena los campos: Nombre completo, Correo electrónico y Contraseña.", respuesta: "Valida que el correo tenga formato correcto y la contraseña sea segura." },
      { paso: "04", pantalla: "Crear cuenta", accion: "Marca la casilla «Acepto los términos y condiciones».", respuesta: "Habilita el botón de envío al cumplir los requisitos legales." },
      { paso: "05", pantalla: "Crear cuenta", accion: "Pulsa el botón «Crear cuenta».", respuesta: "Registra al nuevo usuario en la base de datos y lo redirige automáticamente al inicio de su área privada." },
    ],
    reqs: [
      { code: "RF01 / REGISTRO", title: "Alta de usuarios", desc: "El sistema permitirá a los usuarios registrarse." },
    ],
    footerLeft: "TALENTO.DEV / NUEVO USUARIO",
    footerRight: "R0 · REGISTRO → ACCESO",
  },

  // ==========================================
  // PERFIL: DEMANDANTE (candidate)
  // ==========================================
  {
    id: "R1-demandante",
    profile: "candidate",
    systemTag: "TALENTO.DEV",
    journeyCode: "RECORRIDO R1",
    title: "R1: De la demanda al aprendizaje",
    subtitle: "Un demandante de empleo consulta qué tecnologías se piden y accede a un recurso para aprender una de ellas.",
    user: "Lucía · demandante de empleo",
    start: "Pantalla de Inicio de Sesión",
    expected: "Un recurso de React abierto",
    note: "Ejemplo de uso, no datos reales. Quiere orientar su aprendizaje tras consultar la demanda del mercado.",
    flowTitle: "Secuencia principal",
    flowSubtitle: "Tecnología de ejemplo: React",
    flow: [
      { num: "01", label: "Acceso", title: "Iniciar sesión", detail: "Usuario y contraseña" },
      { num: "02", label: "Explorar", title: "Consultar ranking", detail: "Tecnologías y número de ofertas" },
      { num: "03", label: "Elegir", title: "Seleccionar React", detail: "Acceso a «Recursos»" },
      { num: "04", label: "Aprender", title: "Ver sus recursos", detail: "Documentación, curso y ejercicios" },
      { num: "05", label: "Resultado", title: "Abrir documentación", detail: "Comenzar a estudiar React", isFinal: true },
    ],
    stepsTable: [
      { paso: "01", pantalla: "Inicio de sesión", accion: "Introduce su correo y contraseña y pulsa «Iniciar sesión».", respuesta: "Valida las credenciales y permite acceder al área del demandante de empleo." },
      { paso: "02", pantalla: "Ranking de tecnologías", accion: "Consulta el ranking para identificar las tecnologías más demandadas.", respuesta: "Muestra las tecnologías ordenadas y el número de ofertas asociado a cada una." },
      { paso: "03", pantalla: "Ranking de tecnologías", accion: "Elige React como tecnología de interés y pulsa «Recursos».", respuesta: "Presenta los recursos de aprendizaje relacionados con React." },
      { paso: "04", pantalla: "Recursos de aprendizaje", accion: "Revisa las opciones y selecciona «Documentación oficial».", respuesta: "Ofrece el acceso al recurso de estudio elegido." },
      { paso: "05", pantalla: "Documentación oficial (externo)", accion: "Accede a la documentación de React y empieza a consultar sus contenidos.", respuesta: "Abre el recurso seleccionado fuera de Talento.Dev." },
    ],
    reqs: [
      { code: "RF13 / ACCESO", title: "Inicio y cierre de sesión", desc: "El sistema permitirá iniciar sesión y cerrarla." },
      { code: "RF08 / RANKING", title: "Ranking de requisitos", desc: "El sistema contará con una vista detallada de un ranking de los requisitos más demandados actualmente en las ofertas de empleo." },
      { code: "RF10 / RECURSOS", title: "Recursos de estudio", desc: "El sistema permitirá consultar recursos de estudio desde cada requisito de la vista." },
    ],
    footerLeft: "TALENTO.DEV / DEMANDANTE DE EMPLEO",
    footerRight: "R1 · CONSULTAR → APRENDER",
  },
  {
    id: "R2-demandante-ofertas",
    profile: "candidate",
    systemTag: "TALENTO.DEV",
    journeyCode: "RECORRIDO R2",
    title: "R2: De la búsqueda a la oportunidad",
    subtitle: "Un demandante de empleo busca ofertas que encajen con su perfil, filtra por sus preferencias y revisa su compatibilidad.",
    user: "Lucía · demandante de empleo",
    start: "Navegación principal (área de demandante)",
    expected: "Ofertas filtradas visualizadas y guardadas en favoritos",
    note: "Ejemplo de uso, no datos reales. Quiere encontrar ofertas que se ajusten a su stack tecnológico y modalidad preferida.",
    flowTitle: "Secuencia principal",
    flowSubtitle: "Búsqueda y filtrado de ofertas",
    flow: [
      { num: "01", label: "Acceso", title: "Ir a Ofertas", detail: "Pulsar «Ofertas de empleo» en el menú" },
      { num: "02", label: "Filtrar", title: "Aplicar filtros", detail: "Tecnología, Ubicación, Modalidad" },
      { num: "03", label: "Revisar", title: "Consultar tarjeta", detail: "Ver tecnologías y actitudes" },
      { num: "04", label: "Guardar", title: "Marcar favorito", detail: "Pulsar el icono del corazón", isFinal: true },
    ],
    stepsTable: [
      { paso: "01", pantalla: "Navegación principal", accion: "Pulsa la pestaña «Ofertas de empleo» en la barra de navegación superior.", respuesta: "Carga la vista de ofertas mostrando el buscador y el panel de filtros laterales." },
      { paso: "02", pantalla: "Ofertas de empleo", accion: "Selecciona una tecnología, ubicación y modalidad en los desplegables, o escribe en el buscador.", respuesta: "Filtra el listado de tarjetas en tiempo real y actualiza la puntuación de compatibilidad (ej: 00.00)." },
      { paso: "03", pantalla: "Ofertas de empleo", accion: "Revisa la información de una tarjeta específica (título, etiquetas de tecnología y actitud).", respuesta: "Muestra los detalles visualmente destacados, facilitando la lectura rápida de los requisitos." },
      { paso: "04", pantalla: "Ofertas de empleo", accion: "Haz clic en el icono del corazón situado a la derecha de la tarjeta.", respuesta: "Guarda la oferta en la lista de favoritos del demandante y cambia el estado del icono." },
    ],
    reqs: [
      { code: "RF11 / OFERTAS", title: "Vista de ofertas", desc: "El sistema contará con una vista de ofertas de empleo." },
      { code: "RF02 / PERFIL", title: "Gestión del perfil", desc: "El sistema permitirá a los demandantes de empleo crear y gestionar su perfil. (Base para la compatibilidad)." },
    ],
    footerLeft: "TALENTO.DEV / DEMANDANTE DE EMPLEO",
    footerRight: "R2 · BUSCAR → FILTRAR → GUARDAR",
  },

  // ==========================================
  // PERFIL: RECLUTADOR (recruiter)
  // ==========================================
  {
    id: "R1-reclutador",
    profile: "recruiter",
    systemTag: "TALENTO.DEV",
    journeyCode: "RECORRIDO R1",
    title: "R1: El reclutador busca y consulta candidatos",
    subtitle: "De la búsqueda al detalle, los favoritos y la gestión del perfil del reclutador.",
    user: "Reclutador",
    start: "Pantalla de Inicio de Sesión",
    expected: "El reclutador consulta un candidato, revisa sus favoritos y accede a la edición de su perfil.",
    note: "Ejemplo de uso, no datos reales.",
    flowTitle: "Secuencia principal",
    flowSubtitle: "Flujo de reclutamiento",
    flow: [
      { num: "1", label: "Inicio", title: "Inicio de sesión", detail: "Acceder" },
      { num: "2", label: "Buscar", title: "Búsqueda de perfiles", detail: "Filtrar candidatos" },
      { num: "3", label: "Revisar", title: "Detalle del perfil", detail: "Consultar información" },
      { num: "4", label: "Guardar", title: "Perfiles favoritos", detail: "Revisar guardados" },
      { num: "5", label: "Gestionar", title: "Perfil del reclutador", detail: "Editar datos" },
    ],
    stepsTable: [
      { paso: "1", pantalla: "Inicio de sesión", accion: "Introduce correo y contraseña y pulsa «Iniciar sesión».", respuesta: "Valida las credenciales y da acceso al área de reclutamiento." },
      { paso: "2", pantalla: "Búsqueda de perfiles", accion: "Filtra por tecnología, experiencia y ubicación; pulsa «Buscar perfiles».", respuesta: "Muestra candidatos según los criterios, con sus habilidades y puntuación de búsqueda." },
      { paso: "3", pantalla: "Detalle del perfil", accion: "Abre un candidato de los resultados y revisa su información.", respuesta: "Presenta descripción, tecnologías, habilidades y experiencia del candidato." },
      { paso: "4", pantalla: "Perfiles favoritos", accion: "Accede a «Perfiles Fav» para revisar los perfiles guardados.", respuesta: "Muestra las tarjetas de favoritos con tecnologías, criterio y puntuación de búsqueda." },
      { paso: "5", pantalla: "Perfil del reclutador", accion: "Entra en «Mi perfil» y edita sus datos personales.", respuesta: "Ofrece nombre, correo y contraseña, con «Guardar cambios» y «Cancelar»." },
      { paso: "Alt.", pantalla: "Favoritos sin perfiles", accion: "Accede a favoritos sin perfiles guardados y pulsa «Volver».", respuesta: "Muestra «No hay perfiles, vuelve a la pestaña de búsqueda de perfiles». «Volver» conduce a la búsqueda." },
    ],
    reqs: [
      { code: "RF13 / ACCESO", title: "Inicio y cierre de sesión", desc: "El sistema permitirá iniciar sesión y cerrarla." },
      { code: "RF04 / BÚSQUEDA", title: "Filtros de búsqueda", desc: "El sistema permitirá a los reclutadores buscar candidatos mediante filtros." },
      { code: "RF05 / LISTA", title: "Listado de candidatos", desc: "El sistema mostrará una lista de candidatos ordenada según los criterios de búsqueda." },
      { code: "RF16 / FAVORITOS", title: "Notificaciones de favoritos", desc: "El sistema permitirá enviar notificaciones si perfiles guardados en favoritos, si sufre alguna modificación." },
      { code: "RF03 / PERFIL", title: "Perfil del reclutador", desc: "El sistema permitirá a los reclutadores tener y modificar su propio perfil." },
    ],
    footerLeft: "TALENTO.DEV / RECLUTADOR",
    footerRight: "R1 · BUSCAR → CONSULTAR → GESTIONAR",
  },

  // ==========================================
  // PERFIL: ADMINISTRADOR (admin)
  // ==========================================
  {
    id: "R1-tickets-login",
    profile: "admin",
    systemTag: "TALENTO.DEV",
    journeyCode: "RECORRIDO R1",
    title: "R1: Acceso al panel de administración",
    subtitle: "Un agente o administrador accede al sistema introduciendo sus credenciales para gestionar tickets o usuarios.",
    user: "Agente / Administrador",
    start: "Pantalla de Inicio de Sesión",
    expected: "Acceso concedido al Panel Principal",
    note: "Ejemplo de uso, no datos reales.",
    flowTitle: "Secuencia principal",
    flowSubtitle: "Inicio de Sesión",
    flow: [
      { num: "01", label: "Entrada", title: "Introducir credenciales", detail: "Usuario y contraseña" },
      { num: "02", label: "Validación", title: "Pulsar «Entrar»", detail: "Sistema comprueba la BD" },
      { num: "03", label: "Redirección", title: "Acceso permitido", detail: "Carga del Panel Principal", isFinal: true },
    ],
    stepsTable: [
      { paso: "01", pantalla: "Inicio de sesión", accion: "Introduce su nombre de usuario y contraseña.", respuesta: "Muestra los campos de entrada y el botón de acceso." },
      { paso: "02", pantalla: "Inicio de sesión", accion: "Pulsa el botón «Entrar».", respuesta: "Valida las credenciales. Si son correctas, redirige al Panel Principal; si no, muestra error." },
    ],
    reqs: [
      { code: "RF13 / ACCESO", title: "Inicio y cierre de sesión", desc: "El sistema permitirá iniciar sesión y cerrarla." },
    ],
    footerLeft: "TALENTO.DEV / LOGIN",
    footerRight: "R1 · INICIAR SESIÓN",
  },
  {
    id: "R2-tickets-crear",
    profile: "admin",
    systemTag: "TALENTO.DEV",
    journeyCode: "RECORRIDO R2",
    title: "R2: De la incidencia a la resolución",
    subtitle: "Un agente de soporte registra un nuevo ticket para dar respuesta a un problema técnico reportado por un usuario.",
    user: "Agente de Soporte",
    start: "Panel Principal (Sesión Iniciada)",
    expected: "Ticket creado y registrado",
    note: "Ejemplo de uso, no datos reales.",
    flowTitle: "Secuencia principal",
    flowSubtitle: "Creación de Ticket",
    flow: [
      { num: "01", label: "Acceso", title: "Pulsar «Nuevo Ticket»", detail: "Botón superior" },
      { num: "02", label: "Registro", title: "Rellenar formulario", detail: "Título, Cat., Prioridad, Desc." },
      { num: "03", label: "Guardar", title: "Pulsar «Guardar»", detail: "Sistema valida campos" },
      { num: "04", label: "Confirmación", title: "Ver ticket en la lista", detail: "Se actualiza la base de datos", isFinal: true },
    ],
    stepsTable: [
      { paso: "01", pantalla: "Panel Principal", accion: "Pulsa el botón «Nuevo Ticket» en la barra superior.", respuesta: "Abre el formulario de creación de ticket." },
      { paso: "02", pantalla: "Formulario «Nuevo Ticket»", accion: "Introduce Título, Categoría, Prioridad, Estado y Descripción.", respuesta: "Muestra los campos obligatorios y valida." },
      { paso: "03", pantalla: "Formulario «Nuevo Ticket»", accion: "Pulsa el botón «Guardar».", respuesta: "Procesa la información, genera un ID (ej: TK-001) y registra el ticket." },
      { paso: "04", pantalla: "Lista de Tickets", accion: "Visualiza la lista de tickets.", respuesta: "Muestra el nuevo ticket en la tabla con el estado actual." },
    ],
    reqs: [], // La tabla RF no especifica un requisito de tickets
    footerLeft: "TALENTO.DEV / AGENTE DE SOPORTE",
    footerRight: "R2 · CREAR TICKET",
  },
  {
    id: "R3-tickets-responder",
    profile: "admin",
    systemTag: "TALENTO.DEV",
    journeyCode: "RECORRIDO R3",
    title: "R3: Respuesta a un ticket",
    subtitle: "Un agente de soporte lee un ticket pendiente y envía una respuesta al usuario.",
    user: "Agente de Soporte",
    start: "Lista de Tickets",
    expected: "Respuesta enviada y registrada en el historial",
    note: "Ejemplo de uso, no datos reales.",
    flowTitle: "Secuencia principal",
    flowSubtitle: "Conversación del Ticket",
    flow: [
      { num: "01", label: "Selección", title: "Abrir ticket", detail: "Desde la lista de tickets" },
      { num: "02", label: "Lectura", title: "Revisar historial", detail: "Leer mensajes previos" },
      { num: "03", label: "Redacción", title: "Escribir respuesta", detail: "Campo de texto al pie" },
      { num: "04", label: "Envío", title: "Pulsar «Enviar»", detail: "Sistema notifica al usuario", isFinal: true },
    ],
    stepsTable: [
      { paso: "01", pantalla: "Lista de Tickets", accion: "Selecciona un ticket y hace clic en «Abrir Ticket».", respuesta: "Carga la vista detallada con el historial de conversación." },
      { paso: "02", pantalla: "Detalle del Ticket", accion: "Revisa el problema planteado por el usuario en el hilo.", respuesta: "Muestra los mensajes anteriores ordenados cronológicamente." },
      { paso: "03", pantalla: "Detalle del Ticket", accion: "Escribe una respuesta en el cuadro de texto inferior.", respuesta: "Habilita el botón de «Enviar»." },
      { paso: "04", pantalla: "Detalle del Ticket", accion: "Pulsa «Enviar».", respuesta: "Añade el nuevo mensaje al hilo y actualiza el estado del ticket a «En Proceso» o «Resuelto»." },
    ],
    reqs: [],
    footerLeft: "TALENTO.DEV / AGENTE DE SOPORTE",
    footerRight: "R3 · RESPONDER TICKET",
  },
  {
    id: "R4-tickets-modificar",
    profile: "admin",
    systemTag: "TALENTO.DEV",
    journeyCode: "RECORRIDO R4",
    title: "R4: Modificación de un ticket existente",
    subtitle: "Un agente actualiza los datos de un ticket (prioridad, categoría o estado) según la evolución de la incidencia.",
    user: "Agente de Soporte",
    start: "Lista de Tickets",
    expected: "Ticket actualizado correctamente",
    note: "Ejemplo de uso, no datos reales.",
    flowTitle: "Secuencia principal",
    flowSubtitle: "Edición de Ticket",
    flow: [
      { num: "01", label: "Selección", title: "Seleccionar ticket", detail: "Desde la tabla" },
      { num: "02", label: "Edición", title: "Cambiar campos", detail: "Prioridad, categoría, estado" },
      { num: "03", label: "Guardado", title: "Pulsar «Guardar»", detail: "Sistema valida" },
      { num: "04", label: "Refresco", title: "Ver cambios", detail: "Tabla actualizada", isFinal: true },
    ],
    stepsTable: [
      { paso: "01", pantalla: "Lista de Tickets", accion: "Selecciona el ticket a modificar y pulsa «Editar».", respuesta: "Abre el formulario de edición con los datos actuales del ticket." },
      { paso: "02", pantalla: "Formulario «Editar Ticket»", accion: "Modifica la Prioridad (ej: de Baja a Alta) o la Categoría.", respuesta: "Permite cambiar los valores de los desplegables." },
      { paso: "03", pantalla: "Formulario «Editar Ticket»", accion: "Pulsa «Guardar Cambios».", respuesta: "Valida la información y actualiza el registro en la base de datos." },
      { paso: "04", pantalla: "Lista de Tickets", accion: "Comprueba la tabla.", respuesta: "Muestra los datos actualizados del ticket en la tabla." },
    ],
    reqs: [],
    footerLeft: "TALENTO.DEV / AGENTE DE SOPORTE",
    footerRight: "R4 · MODIFICAR TICKET",
  },
  {
    id: "R5-tickets-crear-usuario",
    profile: "admin",
    systemTag: "TALENTO.DEV",
    journeyCode: "RECORRIDO R5",
    title: "R5: Alta de un nuevo usuario",
    subtitle: "Un administrador registra a un nuevo usuario en el sistema para que pueda acceder a la plataforma.",
    user: "Administrador",
    start: "Gestión de Usuarios",
    expected: "Usuario registrado en el sistema",
    note: "Ejemplo de uso, no datos reales.",
    flowTitle: "Secuencia principal",
    flowSubtitle: "Crear Usuario",
    flow: [
      { num: "01", label: "Acceso", title: "Pulsar «Gestión de usuarios»", detail: "Barra superior" },
      { num: "02", label: "Crear", title: "Pulsar «Crear usuario»", detail: "Botón en el panel lateral" },
      { num: "03", label: "Registro", title: "Rellenar formulario", detail: "Nombre, email, rol, etc." },
      { num: "04", label: "Confirmación", title: "Pulsar «Guardar usuario»", detail: "Sistema registra al usuario", isFinal: true },
    ],
    stepsTable: [
      { paso: "01", pantalla: "Panel Principal", accion: "Pulsa el botón «Gestión de usuarios».", respuesta: "Muestra la pantalla de gestión con el buscador y la lista de usuarios." },
      { paso: "02", pantalla: "Gestión de Usuarios", accion: "Pulsa el botón «Crear usuario».", respuesta: "Despliega el formulario de creación de usuario." },
      { paso: "03", pantalla: "Formulario «Crear Usuario»", accion: "Rellena los campos (Nombre, Apellidos, Email, Rol, etc.).", respuesta: "Valida los campos introducidos." },
      { paso: "04", pantalla: "Formulario «Crear Usuario»", accion: "Pulsa el botón «Guardar usuario».", respuesta: "Registra al usuario, le asigna un ID y lo añade a la tabla." },
    ],
    reqs: [
      { code: "RF06 / GESTIÓN", title: "Gestión de usuarios", desc: "El sistema permitirá gestionar usuarios." },
    ],
    footerLeft: "TALENTO.DEV / ADMINISTRADOR",
    footerRight: "R5 · CREAR USUARIO",
  },
  {
    id: "R6-tickets-modificar-usuario",
    profile: "admin",
    systemTag: "TALENTO.DEV",
    journeyCode: "RECORRIDO R6",
    title: "R6: Modificación de un usuario",
    subtitle: "Un administrador actualiza los datos de un usuario existente en el sistema.",
    user: "Administrador",
    start: "Gestión de Usuarios",
    expected: "Datos del usuario actualizados",
    note: "Ejemplo de uso, no datos reales.",
    flowTitle: "Secuencia principal",
    flowSubtitle: "Modificar Usuario",
    flow: [
      { num: "01", label: "Acceso", title: "Pulsar «Gestión de usuarios»", detail: "Barra superior" },
      { num: "02", label: "Selección", title: "Buscar y seleccionar", detail: "Elegir de la lista" },
      { num: "03", label: "Edición", title: "Pulsar «Modificar usuario»", detail: "Cambiar datos en formulario" },
      { num: "04", label: "Guardado", title: "Pulsar «Guardar cambios»", detail: "Sistema actualiza la BD", isFinal: true },
    ],
    stepsTable: [
      { paso: "01", pantalla: "Panel Principal", accion: "Pulsa el botón «Gestión de usuarios».", respuesta: "Muestra la pantalla de gestión con el buscador y la lista de usuarios." },
      { paso: "02", pantalla: "Lista de Usuarios", accion: "Busca al usuario y pulsa sobre él para seleccionarlo.", respuesta: "Resalta la fila del usuario seleccionado." },
      { paso: "03", pantalla: "Lista de Usuarios", accion: "Pulsa el botón «Modificar usuario».", respuesta: "Abre el formulario de edición con los datos precargados." },
      { paso: "04", pantalla: "Formulario «Modificar Usuario»", accion: "Modifica los campos necesarios y pulsa «Guardar cambios».", respuesta: "Valida los datos, actualiza la base de datos y muestra un mensaje de éxito." },
    ],
    reqs: [
      { code: "RF06 / GESTIÓN", title: "Gestión de usuarios", desc: "El sistema permitirá gestionar usuarios." },
    ],
    footerLeft: "TALENTO.DEV / ADMINISTRADOR",
    footerRight: "R6 · MODIFICAR USUARIO",
  },
  {
    id: "R7-tickets-bd",
    profile: "admin",
    systemTag: "TALENTO.DEV",
    journeyCode: "RECORRIDO R7",
    title: "R7: Consulta de la base de datos",
    subtitle: "Un administrador accede a la vista tabular para consultar los registros almacenados en el sistema.",
    user: "Administrador",
    start: "Panel Principal",
    expected: "Visualización de la tabla de registros",
    note: "Ejemplo de uso, no datos reales.",
    flowTitle: "Secuencia principal",
    flowSubtitle: "Buscar de datos",
    flow: [
      { num: "01", label: "Acceso", title: "Pulsar «Buscar de datos»", detail: "Barra superior" },
      { num: "02", label: "Visualización", title: "Ver tabla", detail: "Datos tabulados" },
      { num: "03", label: "Consulta", title: "Revisar registros", detail: "IDs, nombres, fechas, etc.", isFinal: true },
    ],
    stepsTable: [
      { paso: "01", pantalla: "Panel Principal", accion: "Pulsa el botón «Buscar de datos».", respuesta: "Muestra la vista de base de datos con la tabla de registros." },
      { paso: "02", pantalla: "Base de Datos > Tabla", accion: "Consulta los registros almacenados (ID, Nombre, Teléfono, etc.).", respuesta: "Muestra los datos tabulados de forma ordenada." },
    ],
    reqs: [
      { code: "RF17 / BASES DE DATOS", title: "Acceso a bases de datos", desc: "El sistema permitirá acceder y gestionar a las bases de datos de los diferentes servicios." },
    ],
    footerLeft: "TALENTO.DEV/ ADMINISTRADOR",
    footerRight: "R7 · CONSULTAR BD",
  },
  {
    id: "R8-tickets-mapa",
    profile: "admin",
    systemTag: "TALENTO.DEV",
    journeyCode: "RECORRIDO R8",
    title: "R8: Consulta del mapa conceptual",
    subtitle: "Un administrador genera y visualiza un diagrama de entidades y relaciones a partir de la base de datos.",
    user: "Administrador",
    start: "Vista de Base de Datos",
    expected: "Visualización del Mapa Conceptual",
    note: "Ejemplo de uso, no datos reales.",
    flowTitle: "Secuencia principal",
    flowSubtitle: "Mapa Conceptual",
    flow: [
      { num: "01", label: "Acceso", title: "Ir a Base de Datos", detail: "Pulsar «Buscar de datos»" },
      { num: "02", label: "Generación", title: "Pulsar «Mapa conceptual»", detail: "Botón superior derecho" },
      { num: "03", label: "Visualización", title: "Ver diagrama", detail: "Entidades y relaciones", isFinal: true },
    ],
    stepsTable: [
      { paso: "01", pantalla: "Base de Datos > Tabla", accion: "Pulsa el botón «Mapa conceptual».", respuesta: "Procesa la estructura de la base de datos para generar el diagrama." },
      { paso: "02", pantalla: "Mapa Conceptual", accion: "Visualiza el mapa generado.", respuesta: "Muestra las entidades (Usuarios, Tickets) y sus relaciones visualmente." },
    ],
    reqs: [
      { code: "RF17 / BASES DE DATOS", title: "Acceso a bases de datos", desc: "El sistema permitirá acceder y gestionar a las bases de datos de los diferentes servicios." },
    ],
    footerLeft: "TALENTO.DEV / ADMINISTRADOR",
    footerRight: "R8 · MAPA CONCEPTUAL",
  }
];
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
          {navItems.map(([number, label, slug], index) => (
            <a
              href={`#${slug}`}
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
              <span>08</span> Criterios de uso
            </div>
          </div>
          <div className="identity-block">
            <h2>8.1 Componentes</h2>
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
            <h2>8.2 Tipografía</h2>
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
              <span>09</span> Vistas del sistema
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
        {/* ========================================================= */}
        {/* SECCIÓN 08: RECORRIDOS DE USUARIO */}
        {/* ========================================================= */}
        <section id="recorridos">
          <div className="section-heading">
            <div className="eyebrow">
              <span>10</span> Recorridos de Usuario
            </div>
            <p>
              Flujos de interacción detallados para el perfil activo: <strong>
                {profile === "candidate" ? "Demandante" : profile === "recruiter" ? "Reclutador" : "Administrador"}
              </strong>.
            </p>
          </div>

          <div className="document-container">
            {recorridosData
              // Actualizamos esta línea para aceptar "all"
              .filter((recorrido) => recorrido.profile === profile || recorrido.profile === "all")
              .map((recorrido, index) => (
                <article className="journey" key={recorrido.id}>
                  {/* ... resto del código del recorrido ... */}
                  <div className="journey-header">
                    <span className="system-tag">{recorrido.systemTag}</span>
                    <span>{recorrido.journeyCode}</span>
                  </div>

                  <h2 className="journey-title">{recorrido.title}</h2>
                  <p className="journey-subtitle">{recorrido.subtitle}</p>

                  <div className="meta-grid">
                    <div className="meta-item">
                      <h4>Usuario</h4>
                      <p>{recorrido.user}</p>
                    </div>
                    <div className="meta-item">
                      <h4>Punto de partida</h4>
                      <p>{recorrido.start}</p>
                    </div>
                    <div className="meta-item">
                      <h4>Resultado esperado</h4>
                      <p>{recorrido.expected}</p>
                    </div>
                  </div>
                  <p className="meta-note">{recorrido.note}</p>

                  <div className="section-label">01 / {recorrido.flowTitle}</div>
                  <div className="section-title">{recorrido.flowSubtitle}</div>

                  <div className="flow-container">
                    {recorrido.flow.map((step, i) => (
                      <div className="flow-step" key={i} style={{ background: step.isFinal ? 'var(--forest)' : '#fafafa', color: step.isFinal ? 'white' : 'inherit' }}>
                        <h3 style={{ color: step.isFinal ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>{step.num} / {step.label}</h3>
                        <p>{step.title}</p>
                        <small style={{ color: step.isFinal ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)' }}>{step.detail}</small>
                      </div>
                    ))}
                  </div>

                  <div className="section-label" style={{ marginTop: '40px' }}>02 / Paso a paso</div>
                  <div className="section-title">Acción del usuario + Respuesta del sistema</div>

                  <table className="step-table">
                    <thead>
                      <tr>
                        <th>Paso</th>
                        <th>Pantalla</th>
                        <th>Acción del usuario</th>
                        <th>Respuesta del sistema</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recorrido.stepsTable.map((step, i) => (
                        <tr key={i}>
                          <td>{step.paso}</td>
                          <td>{step.pantalla}</td>
                          <td>{step.accion}</td>
                          <td>{step.respuesta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {recorrido.reqs.length > 0 && (
                    <>
                      <div className="section-label" style={{ marginTop: '40px' }}>03 / Requisitos funcionales relacionados</div>
                      <div className="req-grid">
                        {recorrido.reqs.map((req, i) => (
                          <div className="req-item" key={i}>
                            <span className="req-code">{req.code}</span>
                            <div className="req-title">{req.title}</div>
                            <p className="req-desc">{req.desc}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="journey-footer">
                    <span>{recorrido.footerLeft}</span>
                    <span>{recorrido.footerRight}</span>
                  </div>
                </article>
              ))}
          </div>
        </section>
        {/* ========================================================= */}
        {/* SECCIÓN 09: TRAZABILIDAD FUNCIONAL */}
        {/* ========================================================= */}
        <section id="trazabilidad">
          <div className="section-heading">
            <div className="eyebrow">
              <span>11</span> Trazabilidad Funcional
            </div>
            <p>
              Estado de los requisitos funcionales del sistema, mapeados con las pantallas que los implementan y el perfil de usuario implicado.
            </p>
          </div>

          {/* Resumen de Estado */}
          <div className="trace-summary">
            <div className="trace-summary-item">
              <span className="trace-number">18</span>
              <span className="trace-label">Requisitos</span>
            </div>
            <div className="trace-summary-item">
              <span className="trace-number success">14</span>
              <span className="trace-label">Implementados</span>
            </div>
            <div className="trace-summary-item">
              <span className="trace-number danger">4</span>
              <span className="trace-label">No implementados</span>
            </div>
          </div>

          <div className="identity-table-wrap">
            <table className="identity-table trace-table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '8%' }}>RF</th>
                  <th scope="col" style={{ width: '35%' }}>Requisito funcional</th>
                  <th scope="col" style={{ width: '25%' }}>Pantalla que lo implementa</th>
                  <th scope="col" style={{ width: '22%' }}>Vista</th>
                  <th scope="col" style={{ width: '10%', textAlign: 'center' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {trazabilidadData.map((item) => (
                  <tr key={item.rf}>
                    <td style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{item.rf}</td>
                    <td>{item.desc}</td>
                    <td style={{ color: 'var(--text-main)' }}>{item.pantalla}</td>
                    <td style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{item.vista}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`status-badge ${item.estado === 'Implementado' ? 'status-success' : 'status-danger'}`}>
                        {item.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section id="perfiles">
          <div className="section-heading">
            <div className="eyebrow">
              <span>12</span> Perfiles
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
