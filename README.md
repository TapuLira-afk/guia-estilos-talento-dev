# README para Guía de Estilo Talento.Dev

## Descripción

Esta es la guía de estilo de Talento.Dev, una aplicación web que proporciona una referencia visual completa para el diseño y desarrollo de interfaces de usuario. La guía contiene los fundamentos de diseño, paletas de colores, tipografía, espaciado y componentes reutilizables que se utilizan en toda la plataforma.

## Características

- **Diseño responsive**: Adaptación automática a diferentes tamaños de pantalla
- **Modo oscuro**: Soporte para tema oscuro con transiciones suaves
- **Múltiples perfiles**: Diferentes temas según el rol del usuario (Administrador, Reclutador, Demandante)
- **Guía completa**: Incluye fundamentos, colores, tipografía, espaciado y componentes
- **Descarga PDF**: Funcionalidad para imprimir o descargar la guía como documento PDF

## Estructura del Proyecto

```
guia-estilos-talento-dev/
├── src/
│   ├── main.tsx              # Punto de entrada de la aplicación
│   ├── App.tsx               # Componente principal de la aplicación
│   ├── index.css             # Estilos globales y configuración de Tailwind
│   ├── components/           # Componentes reutilizables
│   │   ├── BrandIcon.tsx     # Icono de marca con diferentes perfiles
│   │   └── ComponentShowcase.tsx  # Muestra de componentes UI
│   └── data/                 # Datos de configuración
│       └── style-guide.ts    # Paletas de colores, navegación y perfiles
├── index.html                # Archivo HTML principal
└── package.json              # Dependencias y scripts del proyecto
```

## Tecnologías Utilizadas

- **React 19** - Biblioteca para construcción de interfaces de usuario
- **Vite 8** - Herramienta de desarrollo y build
- **Tailwind CSS v4** - Framework de estilos utilitarios
- **TypeScript 5.7** - Lenguaje de programación tipado
- **Figma Make** - Entorno de desarrollo integrado

## Funcionalidades Principales

1. **Navegación por secciones**: Acceso rápido a los diferentes aspectos de la guía de estilo
2. **Cambio de perfil**: Selección entre tres perfiles (Administrador, Reclutador, Demandante)
3. **Modo oscuro/claro**: Cambio de tema con persistencia
4. **Copiado de colores**: Funcionalidad para copiar valores de color al portapapeles
5. **Exportación PDF**: Descarga de la guía en formato PDF para impresión

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la aplicación construida
- `npm run format` - Formatea el código con oxfmt

## Cómo Ejecutar el Proyecto

1. Asegúrate de tener Node.js y pnpm instalados
2. Instala las dependencias:
   ```bash
   pnpm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

La aplicación se ejecutará en el puerto especificado por `$PORT` (por defecto 8443) y estará disponible para ser vista en el panel de previsualización.

## Autor

Talento.Dev - Equipo de Desarrollo

## Licencia

Este proyecto está bajo licencia MIT. 
