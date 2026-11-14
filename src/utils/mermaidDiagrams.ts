export const getMermaidDiagram = (profile: string) => {
  if (profile === 'admin') {
    return `
      flowchart TD
        Login["<b>Inicio de sesión</b><br/>Acceso con correo/contraseña"]:::login
        Menu("Menú Global<br/>(ida y vuelta)"):::menu
        
        Login --> Menu
        
        Menu -.-> C1
        Menu -.-> C2
        Menu -.-> C3
        
        subgraph Col1 ["Gestión de Tickets"]
          C1["Abrir Ticket"] --> T1["Ver Ticket"]
          C1 --> T2["Responder Ticket"]
          C1 --> T3["Cerrar Ticket"]
        end
        
        subgraph Col2 ["Gestión de Usuarios"]
          C2["Tabla de Usuarios (Listado)"] --> U1["[ Borrar Usuario ]"]:::action
          C2 --> U2["Crear Usuario"]
          C2 --> U3["Modificar Usuario"]
        end
        
        subgraph Col3 ["Bases de Datos"]
          C3["Tabla de la base de datos"] --> D1["Mapa Conceptual"]
          C3 --> D2["Estado de Error"]:::error
        end

        classDef login fill:#F7F5F6,stroke:#2A2529,stroke-width:2px,color:#2A2529;
        classDef menu fill:transparent,stroke:#2A2529,stroke-width:1px,stroke-dasharray: 5 5,color:#2A2529;
        classDef action fill:transparent,stroke:#2A2529,stroke-width:2px,stroke-dasharray: 5 5;
        classDef error fill:#F7F5F6,stroke:#E53E3E,stroke-width:2px,color:#E53E3E;
    `;
  }

  if (profile === 'recruiter') {
    return `
      flowchart TD
        Login["<b>Inicio de sesión</b><br/>Acceso con correo/contraseña"]:::login
        Menu("Menú Global<br/>(ida y vuelta)"):::menu
        
        Login --> Menu
        
        Menu -.-> C1
        Menu -.-> C2
        Menu -.-> C3
        
        subgraph Col1 ["Panel de Control"]
          C1["Inicio / Dashboard<br/>Resumen"] --> N1["Mis Ofertas<br/>Listado"]
          N1 --> N2["Gestión de Candidaturas<br/>Estado"]
        end
        
        subgraph Col2 ["Búsqueda de Talento"]
          C2["Buscar Candidatos<br/>Filtros"] --> N4["Ver Perfil<br/>Detalle"]
          N4 --> N5["[ Contactar / Entrevistar ]<br/>Acción"]:::action
        end
        
        subgraph Col3 ["Analítica"]
          C3["Métricas de Ofertas<br/>Visualizaciones"] --> N6["[ Exportar Datos ]<br/>CSV"]:::action
        end

        classDef login fill:#FFFCF7,stroke:#002147,stroke-width:2px,color:#002147;
        classDef menu fill:transparent,stroke:#002147,stroke-width:1px,stroke-dasharray: 5 5,color:#002147;
        classDef action fill:transparent,stroke:#002147,stroke-width:2px,stroke-dasharray: 5 5;
    `;
  }

  return `
    flowchart TD
      Login["<b>Inicio de sesión</b><br/>Acceso con correo/contraseña"]:::login
      Menu("Menú Global<br/>(ida y vuelta)"):::menu
      
      Login --> Menu
      
      Menu -.-> C1
      Menu -.-> C2
      Menu -.-> C3
      
      subgraph Col1 ["Descubrimiento"]
        C1["Ranking de Tecnologías<br/>Tendencias"] --> N1["Recursos de Aprendizaje<br/>Cursos"]
      end
      
      subgraph Col2 ["Búsqueda de Empleo"]
        C2["Ofertas de Empleo<br/>Listado"] --> N2["Detalle de la Oferta<br/>Requisitos"]
        N2 --> N3["[ Postularse ]<br/>Envío de candidatura"]:::action
      end
      
      subgraph Col3 ["Gestión Personal"]
        C3["Mi Perfil<br/>Datos"] --> N4["Mis Favoritos<br/>Guardados"]
        N4 --> N5["[ Guardar Cambios ]<br/>Confirmación"]:::action
      end

      classDef login fill:#FFFCF3,stroke:#7A8450,stroke-width:2px,color:#7A8450;
      classDef menu fill:transparent,stroke:#7A8450,stroke-width:1px,stroke-dasharray: 5 5,color:#7A8450;
      classDef action fill:transparent,stroke:#7A8450,stroke-width:2px,stroke-dasharray: 5 5;
  `;
};