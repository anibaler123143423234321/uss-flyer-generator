---
name: uss-flyer-system
description: Guía y referencia técnica para la gestión, mantenimiento, despliegue y desarrollo del panel de administración del Generador Oficial de Flyers USS en Astro y Supabase.
---

# USS Flyer System - Manual y Cheatsheet de Desarrollo

Este skill documenta la arquitectura técnica, base de datos y flujos de trabajo del **Generador Oficial de Flyers USS** para el Centro de Informática, facilitando el mantenimiento futuro y la implementación del panel administrativo.

---

## 1. Arquitectura de la Aplicación

La aplicación está construida sobre **Astro 5** con renderizado estático híbrido y módulos cliente ESM:

```plaintext
USS/
├── .env                       # Variables PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY
├── astro.config.mjs           # Configuración de Astro (servidor en puerto 4321)
├── public/logo-uss.png        # Logo oficial del Centro de Informática USS
├── src/
│   ├── components/
│   │   ├── FlyerCard.astro    # Maqueta HTML y SVG del flyer (680px)
│   │   └── Sidebar.astro      # Panel de controles y formulario reactivo
│   ├── lib/
│   │   └── supabase.js        # Cliente Supabase y método registrarGeneracionFlyer
│   ├── pages/
│   │   └── index.astro        # Orquestador: sincronización, html2canvas y Toasts
│   └── styles/
│       └── global.css         # Estilos globales y paleta institucional
└── supabase/
    └── schema.sql             # Definición de tablas y políticas RLS
```

---

## 2. Base de Datos (Supabase)

### Tabla `public.tbl_docentes_flyers`

| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `BIGINT GENERATED ALWAYS AS IDENTITY` | Llave primaria |
| `nombre_docente` | `TEXT NOT NULL` | Nombre completo del docente ingresado |
| `genero_imagen` | `BOOLEAN DEFAULT true` | Bandera que confirma que generó/descargó el flyer |
| `curso` | `TEXT` | Nombre del curso (ej. AutoCAD 2D) |
| `pead` | `TEXT` | Código PEAD (a, b, c...) |
| `ciclo` | `TEXT` | Ciclo académico (ej. 2026-II) |
| `turno` | `TEXT` | Turno (MAÑANA, TARDE, NOCHE) |
| `modalidad` | `TEXT` | Modalidad de dictado (Virtual / Presencial) |
| `horario_dias` | `TEXT` | Días programados (ej. MIÉ, JUE, VIE Y SÁB) |
| `horario_horas` | `TEXT` | Rango de horas |
| `fecha_inicio` | `TEXT` | Fecha destacada de inicio de clases |
| `created_at` | `TIMESTAMPTZ` | Fecha y hora UTC del registro |
| `user_id` | `UUID NULL` | Llave foránea hacia `auth.users(id)` para el futuro panel |

### Políticas de Seguridad (RLS)
- **Insert**: Habilitado para rol `anon` y `authenticated` (`WITH CHECK (true)`).
- **Select**: Habilitado para rol `anon` y `authenticated` (`USING (true)`).

---

## 3. Flujo de Guardado y Descarga

1. El docente ingresa su nombre, curso y detalles de clase.
2. Al pulsar **"Descargar Flyer en PNG (HD)"**:
   - `html2canvas` procesa el nodo `#flyerCard` a escala 2.5x.
   - Se descarga el archivo `.png` en el navegador del usuario.
   - En paralelo, se invoca `registrarGeneracionFlyer(...)` en `src/lib/supabase.js`.
   - Se muestra un Toast visual confirmando el guardado exitoso en Supabase.

---

## 4. Guía para Construir el Futuro Panel de Administración

Para crear el panel administrativo que consulte esta base de datos:

1. **Crear una nueva ruta en Astro**: `src/pages/admin/index.astro`.
2. **Consultar registros desde Supabase**:
   ```javascript
   import { supabase } from '../../lib/supabase.js';

   const { data: registros, error } = await supabase
     .from('tbl_docentes_flyers')
     .select('*')
     .order('created_at', { ascending: false });
   ```
3. **Métricas clave a mostrar en el panel**:
   - Total de flyers generados.
   - Lista de docentes únicos que ya generaron su flyer.
   - Distribución por curso y PEAD.
   - Tabla de auditoría con fecha y hora de descarga.
   - Filtros de búsqueda por nombre de docente y rango de fechas.

---

## 5. Comandos Frecuentes

```bash
# Iniciar servidor local
npm run dev

# Compilar producción
npm run build

# Previsualizar compilación de producción
npm run preview
```
