# Guía de Estilo Talento.Dev

## Descripción

Guía de estilo interactiva de **Talento.Dev**, una plataforma de gestión de talento. Proporciona una referencia visual completa para el diseño y desarrollo de interfaces: fundamentos de diseño, paletas de colores por perfil, tipografía, espaciado, criterios de uso y componentes UI reutilizables.

## Características

- **Diseño responsive**: Adaptación automática a diferentes tamaños de pantalla
- **Modo oscuro / claro**: Cambio de tema con transiciones suaves
- **Tres perfiles de marca**: Paleta e iconografía según el rol (Administrador, Reclutador, Demandante)
- **Guía completa en 7 secciones**: Fundamentos, Color, Tipografía, Espaciado, Componentes, Criterios de uso, Perfiles
- **Copiado de colores**: Un clic para copiar cualquier valor hex al portapapeles
- **Exportación PDF**: Botón "Descargar PDF" que abre el diálogo de impresión del navegador
- **Favicon dinámico**: El icono de la pestaña cambia según el perfil seleccionado

## Estructura del Proyecto

```
guia-estilos-talento-dev/
├── public/
│   ├── assets/               # Iconos SVG de marca y tecnologías
│   │   ├── *.svg             # Capas del penguin (cuerpo, ojos, pico, patas, gorra, código)
│   │   └── technologies/     # Iconos SVG de tecnologías (Java, React, Docker, etc.)
│   └── favicon.svg
├── src/
│   ├── main.tsx              # Punto de entrada; monta <App /> en #root
│   ├── App.tsx               # Componente principal: header, sidebar y 7 secciones
│   ├── index.css             # Estilos globales, variables CSS por perfil y tema
│   ├── vite-env.d.ts         # Declaraciones de tipos de Vite
│   ├── components/
│   │   ├── BrandIcon.tsx     # Icono de marca (penguin) + hook de favicon dinámico
│   │   └── ComponentShowcase.tsx  # Sección 05: botones, campos, estados, mensajes, etiquetas
│   └── data/
│       └── style-guide.ts    # Paletas de colores, items de navegación y perfiles
├── index.html                # Shell HTML con #root y carga de main.tsx
├── vite.config.ts            # Config Vite: React, Tailwind CSS v4, alias @ → src
├── tsconfig.json             # Configuración de TypeScript
├── .mise.toml                # Versiones de Node.js y pnpm
├── package.json              # Dependencias y scripts
└── pnpm-lock.yaml            # Lockfile de pnpm
```

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | UI declarativa |
| Vite | 8 | Dev server y build |
| Tailwind CSS | 4 | Utilidades CSS (vía `@tailwindcss/vite`) |
| TypeScript | 5.7 | Tipado estático |
| oxfmt | – | Formateo de código |
| pnpm | 9+ | Gestor de paquetes |

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia el servidor de desarrollo (hot-reload) |
| `pnpm build` | Build de producción para `dist/` |
| `pnpm preview` | Previsualiza el build de producción |
| `pnpm format` | Formatea el código con oxfmt |

## Cómo ejecutar

**Prerequisitos:** Node.js ≥ 18 y [pnpm](https://pnpm.io) ≥ 9.

```bash
# 1. Instalar dependencias
pnpm install

# 2. Servidor de desarrollo
pnpm dev
```

La aplicación queda disponible en `http://localhost:$PORT` (por defecto **8443**).
En el contexto de **Figma Make** el servidor de Vite ya está corriendo y se accede directamente desde el panel de previsualización.

## Secciones de la guía

| # | Sección | Contenido |
|---|---|---|
| 01 | Fundamentos | Identidad, datos académicos, principios de diseño |
| 02 | Color | Paletas por perfil (primarios, secundarios, neutros) con copiado hex |
| 03 | Tipografía | Escala tipográfica, Playfair Display e Inter |
| 04 | Espaciado | Sistema de espaciado y grid |
| 05 | Componentes | Botones, campos, estados, mensajes, etiquetas de tecnología |
| 06 | Criterios de uso | Tablas de correspondencia: componente → perfil, tipografía → licencia |
| 07 | Perfiles | Tarjetas interactivas para previsualizar cada perfil de marca |

## Autores

**Talento.Dev** – Equipo de Desarrollo
