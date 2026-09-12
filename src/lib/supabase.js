import { createClient } from '@supabase/supabase-js';

// Obtener credenciales desde variables de entorno de Astro / Vite
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Registra en Supabase que el docente ha generado su flyer oficial.
 * @param {Object} datos
 * @param {string} datos.nombreDocente - Nombre completo del docente
 * @param {string} [datos.curso] - Nombre del curso
 * @param {string} [datos.pead] - Código PEAD (a, b, c...)
 * @param {string} [datos.ciclo] - Ciclo lectivo (ej: 2026-II)
 * @param {string} [datos.turno] - Turno (MAÑANA, TARDE, NOCHE)
 * @param {string} [datos.modalidad] - Modalidad (Virtual, Presencial)
 * @param {string} [datos.horarioDias] - Días de clase
 * @param {string} [datos.horarioHoras] - Horas de clase
 * @param {string} [datos.fechaInicio] - Fecha destacada de inicio
 * @returns {Promise<{ success: boolean, data?: any, error?: string }>}
 */
export async function registrarGeneracionFlyer({
  nombreDocente,
  curso = '',
  pead = '',
  ciclo = '',
  turno = '',
  modalidad = '',
  horarioDias = '',
  horarioHoras = '',
  fechaInicio = ''
}) {
  if (!supabase) {
    console.warn('[Supabase] Credenciales no configuradas en .env');
    return { success: false, error: 'Credenciales de Supabase no configuradas en .env' };
  }

  try {
    const payload = {
      nombre_docente: nombreDocente?.trim() || 'Docente no especificado',
      genero_imagen: true,
      curso: curso?.trim() || null,
      pead: pead?.trim() || null,
      ciclo: ciclo?.trim() || null,
      turno: turno?.trim() || null,
      modalidad: modalidad?.trim() || null,
      horario_dias: horarioDias?.trim() || null,
      horario_horas: horarioHoras?.trim() || null,
      fecha_inicio: fechaInicio?.trim() || null
    };

    console.log('[Supabase] Guardando registro de docente:', payload);

    const { data, error } = await supabase
      .from('tbl_docentes_flyers')
      .insert([payload])
      .select();

    if (error) {
      console.error('[Supabase] Error al insertar en tbl_docentes_flyers:', error);
      return { success: false, error: error.message };
    }

    console.log('[Supabase] Registro guardado con éxito:', data);
    return { success: true, data };
  } catch (err) {
    console.error('[Supabase] Excepción al registrar docente:', err);
    return { success: false, error: err.message };
  }
}
