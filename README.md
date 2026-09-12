# Generador Oficial de Flyers USS - Centro de Informática

Aplicación web desarrollada con **Astro** y conectada a **Supabase** para personalizar, generar y descargar flyers institucionales de bienvenida en alta resolución para los docentes del **Centro de Informática de la Universidad Señor de Sipán (USS)**. Cada generación queda registrada en la base de datos para auditoría y futuros paneles administrativos.

---

## 🚀 Características Principales

- **Arquitectura con Astro**: Estructura modular basada en componentes (`Sidebar.astro`, `FlyerCard.astro`), rápida y optimizada para producción.
- **Registro en Supabase**: Guarda automáticamente el nombre del docente, curso, PEAD, ciclo, horario y la confirmación de generación (`genero_imagen: true`) al descargar la imagen.
- **Identidad Oficial USS**:
  - Paleta cromática oficial: Verde USS (`#004e35`), Celeste USS (`#11acd3`) y Morado CIS (`#56208f`).
  - Tipografías Google Fonts: *Montserrat* (títulos institucionales), *Caveat* (estilo manuscrito para anotaciones de docente) y *Poppins* (interfaz y lectura).
  - Escudo y logotipo oficial vectorizado/HD en `public/logo-uss.png`.
- **Personalización Reactiva**:
  - Carga de fotografía desde archivo local o URL web directa.
  - Controles de encuadre en vivo (zoom de 80% a 230% y desplazamiento vertical Pos Y).
  - Cinta con el nombre del docente y anotación manuscrita *"Tu docente"* alternable.
  - Tabla de horarios editable (Curso, Modalidad, Grupo, Turno y Horario desglosado).
  - Presets rápidos de 1 clic para cursos frecuentes (*AutoCAD 2D*, *Excel Financiero*, *Power BI Analytics*).
- **Auto-Ajuste Responsivo & Cero Scroll**: El lienzo del flyer calcula dinámicamente el factor de escala óptimo según la resolución de la pantalla.
- **Exportación en Ultra Alta Definición**: Renderizado PNG mediante `html2canvas` a escala 2.5x, listo para compartir por WhatsApp, correo o redes sociales.
- **Notificaciones Toast**: Alertas elegantes en tiempo real informando el estado de la descarga y el guardado en la base de datos.

---

## 🛠️ Tecnologías

- **Framework Web**: [Astro 5](https://astro.build/)
- **Base de Datos / Backend**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`)
- **Renderizado de Imagen**: [html2canvas](https://html2canvas.hertzen.com/)
- **Estilos**: Vanilla CSS con variables CSS y diseño Glassmorphism
- **Tipografías**: Google Fonts (*Montserrat*, *Poppins*, *Caveat*)

---

## 📂 Estructura del Proyecto

```plaintext
USS/
├── .env                       # Credenciales de Supabase (URL y Anon Key)
├── astro.config.mjs           # Configuración de Astro
├── package.json               # Dependencias y scripts
├── public/
│   └── logo-uss.png           # Logotipo oficial del Centro de Informática USS
├── src/
│   ├── components/
│   │   ├── FlyerCard.astro    # Plantilla y diseño institucional del flyer
│   │   └── Sidebar.astro      # Panel de controles, carga de foto y presets
│   ├── lib/
│   │   └── supabase.js        # Cliente Supabase y función de registro
│   ├── pages/
│   │   └── index.astro        # Vista principal, interactividad y descarga
│   └── styles/
│       └── global.css         # Tokens de diseño, estilos del flyer y Toasts
└── supabase/
    └── schema.sql             # Script SQL de creación de tabla y políticas RLS
```

---

## ⚙️ Configuración del Entorno (`.env`)

Crea o verifica el archivo `.env` en la raíz del proyecto con las credenciales de tu proyecto Supabase:

```env
# Supabase Configuration
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

> **Nota:** En Astro, las variables con prefijo `PUBLIC_` están disponibles de manera segura en el cliente para comunicarse con la API de Supabase.

---

## 🗄️ Configuración de la Base de Datos (Supabase)

Para habilitar el registro de los docentes en la base de datos:

1. Ingresa a tu panel de **[Supabase](https://supabase.com/dashboard)** y selecciona tu proyecto.
2. Abre el **SQL Editor** en el menú lateral izquierdo.
3. Copia y pega el contenido del archivo [`supabase/schema.sql`](supabase/schema.sql):

```sql
-- 1. Crear tabla de registro de docentes y flyers generados
CREATE TABLE IF NOT EXISTS public.tbl_docentes_flyers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_docente TEXT NOT NULL,
    genero_imagen BOOLEAN NOT NULL DEFAULT true,
    curso TEXT,
    pead TEXT,
    ciclo TEXT,
    turno TEXT,
    modalidad TEXT,
    horario_dias TEXT,
    horario_horas TEXT,
    fecha_inicio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.tbl_docentes_flyers ENABLE ROW LEVEL SECURITY;

-- 3. Permitir que el generador inserte registros
CREATE POLICY "Permitir insercion de flyers generados"
ON public.tbl_docentes_flyers
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Permitir lectura de registros (para futuros paneles administrativos)
CREATE POLICY "Permitir lectura para panel"
ON public.tbl_docentes_flyers
FOR SELECT
TO anon, authenticated
USING (true);

-- 5. Índices de optimización
CREATE INDEX IF NOT EXISTS idx_docentes_flyers_fecha ON public.tbl_docentes_flyers (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_docentes_flyers_nombre ON public.tbl_docentes_flyers (nombre_docente);
```

4. Haz clic en **Run**. A partir de ese momento, cada descarga de flyer registrará al docente automáticamente.

---

## 💻 Instalación y Uso Local

### 1. Clonar o abrir el proyecto
```bash
cd /ruta/al/proyecto/USS
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre tu navegador en `http://localhost:4321/`.

### 4. Compilar para producción
```bash
npm run build
```
Genera la versión optimizada en la carpeta `dist/`.

---

## 🚀 Despliegue en Producción (Vercel / Netlify)

1. Conecta el repositorio a **Vercel** o **Netlify**.
2. En la configuración del proyecto, agrega las variables de entorno:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
3. El comando de compilación es `npm run build` y el directorio de salida es `dist/`.
4. ¡El despliegue se ejecutará de forma automática y continua!
