-- ==========================================================
-- TABLA OFICIAL: REGISTRO DE FLYERS GENERADOS POR DOCENTES
-- Centro de Informática - Universidad Señor de Sipán
-- ==========================================================

-- 1. Crear tabla principal
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

-- Comentarios explicativos en las columnas
COMMENT ON TABLE public.tbl_docentes_flyers IS 'Registro de docentes que han generado su flyer oficial del Centro de Informática USS';
COMMENT ON COLUMN public.tbl_docentes_flyers.nombre_docente IS 'Nombre del docente que generó el flyer';
COMMENT ON COLUMN public.tbl_docentes_flyers.genero_imagen IS 'Indica si se dio clic en generar/descargar la imagen (true)';
COMMENT ON COLUMN public.tbl_docentes_flyers.user_id IS 'ID de usuario autenticado si a futuro se integra con panel de autenticación';

-- 2. Habilitar seguridad de nivel de fila (Row Level Security - RLS)
ALTER TABLE public.tbl_docentes_flyers ENABLE ROW LEVEL SECURITY;

-- 3. Política para permitir que el generador web inserte registros
DROP POLICY IF EXISTS "Permitir insercion de flyers generados" ON public.tbl_docentes_flyers;
CREATE POLICY "Permitir insercion de flyers generados"
ON public.tbl_docentes_flyers
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Política para permitir consultar registros (para el panel futuro)
DROP POLICY IF EXISTS "Permitir lectura para panel" ON public.tbl_docentes_flyers;
CREATE POLICY "Permitir lectura para panel"
ON public.tbl_docentes_flyers
FOR SELECT
TO anon, authenticated
USING (true);

-- 5. Índice para consultas rápidas por docente y fecha
CREATE INDEX IF NOT EXISTS idx_docentes_flyers_fecha ON public.tbl_docentes_flyers (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_docentes_flyers_nombre ON public.tbl_docentes_flyers (nombre_docente);
