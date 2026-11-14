import { CSSProperties } from "react";

export const palettes: Record<string, {
  group: string
  colors: { use: string value: string }[]
}[]> = {
  admin: [
    {
      group: "Colores primarios",
      colors: [
        { use: "Primario", value: "#2A2529" },
        { use: "Secundario", value: "#F3F0E7" },
        { use: "Fondo principal", value: "#F7F5F6" },
      ],
    },
    {
      group: "Colores secundarios",
      colors: [
        { use: "Error", value: "#AD414B" },
        { use: "Éxito", value: "#44765C" },
        { use: "Advertencia", value: "#9A6A24" },
        { use: "Acento", value: "#806558" },
      ],
    },
    {
      group: "Colores neutros",
      colors: [
        { use: "Texto principal", value: "#2A2529" },
        { use: "Texto secundario", value: "#665D62" },
        { use: "Texto deshabilitado", value: "#A49B9E" },
        { use: "Bordes", value: "#DCD5D0" },
        { use: "Fondos", value: "#FFFCF6" },
      ],
    },
  ],
  recruiter: [
    {
      group: "Colores primarios",
      colors: [
        { use: "Primario", value: "#002147" },
        { use: "Secundario", value: "#D9BD66" },
        { use: "Fondo principal", value: "#F6F2EB" },
      ],
    },
    {
      group: "Colores secundarios",
      colors: [
        { use: "Error", value: "#B64646" },
        { use: "Éxito", value: "#38765C" },
        { use: "Advertencia", value: "#A66B18" },
        { use: "Acento", value: "#937044" },
      ],
    },
    {
      group: "Colores neutros",
      colors: [
        { use: "Texto principal", value: "#10243B" },
        { use: "Texto secundario", value: "#526172" },
        { use: "Texto deshabilitado", value: "#919BA5" },
        { use: "Bordes", value: "#DDD2C2" },
        { use: "Fondos", value: "#FFFCF7" },
      ],
    },
  ],
  candidate: [
    {
      group: "Colores primarios",
      colors: [
        { use: "Primario", value: "#7A8450" },
        { use: "Secundario", value: "#F8EFDA" },
        { use: "Fondo principal", value: "#F5F6EE" },
      ],
    },
    {
      group: "Colores secundarios",
      colors: [
        { use: "Error", value: "#AD4940" },
        { use: "Éxito", value: "#47734C" },
        { use: "Advertencia", value: "#9C6B1F" },
        { use: "Acento", value: "#566136" },
      ],
    },
    {
      group: "Colores neutros",
      colors: [
        { use: "Texto principal", value: "#242B1B" },
        { use: "Texto secundario", value: "#596044" },
        { use: "Texto deshabilitado", value: "#979B82" },
        { use: "Bordes", value: "#D9D5BC" },
        { use: "Fondos", value: "#FFFCF3" },
      ],
    },
  ],
}

export const navItems = [
  ["01", "Fundamentos"],
  ["02", "Color"],
  ["03", "Tipografía"],
  ["04", "Espaciado"],
  ["05", "Estructura"],
  ["06", "Navegación"],
  ["07", "Componentes"],
  ["08", "Criterios de uso"],
  ["09", "Perfiles"],
]

export const profiles = [
  {
    id: "admin",
    name: "Administrador",
    role: "Control y gestión",
    primary: "#2A2529",
    accent: "#F3F0E7",
    soft: "#DCD5D0",
  },
  {
    id: "recruiter",
    name: "Reclutador",
    role: "Búsqueda y selección",
    primary: "#002147",
    accent: "#D2B48C",
    soft: "#DDD2C2",
  },
  {
    id: "candidate",
    name: "Demandante de empleo",
    role: "Oportunidades y crecimiento",
    primary: "#7A8450",
    accent: "#F8EFDA",
    soft: "#D9D5BC",
  },
]

export const diagramStyles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    padding: "2rem",
    backgroundColor: "var(--bg-card, #ffffff)", // Puedes cambiarlo por "#FFFCF6" si prefieres fijo
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflowX: "auto",
    fontFamily: "Inter, sans-serif",
    width: "100%",
    boxSizing: "border-box",
  },
  node: {
    padding: "12px 20px",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "14px",
    borderWidth: "2px",
    borderStyle: "solid",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    minWidth: "160px",
    color: "#10243B", // Color de texto principal de tu paleta
  },
  arrowDown: {
    fontSize: "20px",
    color: "#9ca3af",
    margin: "4px 0",
    lineHeight: "1",
  },
  roleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
    width: "100%",
    alignItems: "start",
  },
  roleColumn: {
    borderRadius: "8px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  roleHeader: {
    color: "white",
    padding: "0.5rem",
    borderRadius: "4px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "14px",
  },
  navMapGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "1rem",
    width: "100%",
    alignItems: "start",
  },
  navColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
  },
  navAction: {
    borderStyle: "dashed",
    fontSize: "12px",
    padding: "8px 12px",
    backgroundColor: "#FFFCF3", // Color de fondo de la paleta candidate
    width: "100%",
    boxSizing: "border-box",
  },
};