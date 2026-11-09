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
  ["05", "Componentes"],
  ["06", "Criterios de uso"],
  ["07", "Perfiles"],
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
