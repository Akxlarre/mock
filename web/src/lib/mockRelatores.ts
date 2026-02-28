/**
 * Mock Data: Relatores y Promociones - Clase Profesional
 * RF-058: CRUD Relatores | RF-059: Promociones | RF-079: Dashboard avance
 */

export type EspecialidadProfesional = "A2" | "A3" | "A4" | "A5";

export interface Relator {
  id: number;
  nombre: string;
  rut: string;
  email: string;
  telefono: string;
  especialidades: EspecialidadProfesional[];
  activo: boolean;
  fechaRegistro: string;
  promocionesAsignadas: number;
}

export interface Curso {
  tipo: EspecialidadProfesional;
  relatorId: number;
  relatorNombre: string;
  alumnosInscritos: number;
  maxAlumnos: number; // 25
}

export interface Promocion {
  id: number;
  codigo: string;
  nombre: string;
  fechaInicio: string; // Siempre un lunes
  fechaFin: string;    // Sábado de la 5ta semana (30 días de clase lun-sáb)
  estado: "planificada" | "en_curso" | "finalizada";
  cursos: Curso[];
  totalAlumnos: number;
  diaActual?: number; // RF-079: día de clase X de 30 (lun-sáb)
}

// --- Relatores mock ---

export const RELATORES: Relator[] = [
  {
    id: 1,
    nombre: "Roberto Muñoz Sánchez",
    rut: "11.222.333-4",
    email: "rmunoz@conductores.cl",
    telefono: "+56 9 8111 2233",
    especialidades: ["A2", "A4"],
    activo: true,
    fechaRegistro: "2024-03-01",
    promocionesAsignadas: 3,
  },
  {
    id: 2,
    nombre: "Carmen Vega Fuentes",
    rut: "12.333.444-5",
    email: "cvega@conductores.cl",
    telefono: "+56 9 7222 3344",
    especialidades: ["A3", "A5"],
    activo: true,
    fechaRegistro: "2024-05-15",
    promocionesAsignadas: 2,
  },
  {
    id: 3,
    nombre: "Francisco Herrera López",
    rut: "13.444.555-6",
    email: "fherrera@conductores.cl",
    telefono: "+56 9 6333 4455",
    especialidades: ["A2", "A3", "A4", "A5"],
    activo: true,
    fechaRegistro: "2023-11-20",
    promocionesAsignadas: 5,
  },
  {
    id: 4,
    nombre: "Isabel Contreras Díaz",
    rut: "14.555.666-7",
    email: "icontreras@conductores.cl",
    telefono: "+56 9 5444 5566",
    especialidades: ["A2"],
    activo: false,
    fechaRegistro: "2024-01-10",
    promocionesAsignadas: 1,
  },
  {
    id: 5,
    nombre: "Andrés Tapia Morales",
    rut: "15.666.777-8",
    email: "atapia@conductores.cl",
    telefono: "+56 9 4555 6677",
    especialidades: ["A4", "A5"],
    activo: true,
    fechaRegistro: "2024-08-01",
    promocionesAsignadas: 2,
  },
];

// --- Promociones mock ---
// 30 días de clase (lun-sáb, 6 días/semana) = 5 semanas reales
// Nuevas promociones cada 2 semanas en lunes
// Fecha corte: 13 Feb 2026 (viernes)
//   - Jan 5:  5 sem → sáb 7 Feb (30/30, extendida a sáb 14 Feb por 2 feriados)
//   - Jan 19: 5 sem → sáb 21 Feb (día 23/30 al 13 Feb)
//   - Feb 2:  5 sem → sáb 7 Mar  (día 11/30 al 13 Feb)

export const PROMOCIONES: Promocion[] = [
  /** Promoción antigua - ya finalizada */
  {
    id: 1,
    codigo: "PROM-2025-12",
    nombre: "Promoción Diciembre 2025",
    fechaInicio: "2025-11-24",
    fechaFin: "2025-12-27",
    estado: "finalizada",
    totalAlumnos: 72,
    cursos: [
      { tipo: "A2", relatorId: 1, relatorNombre: "Roberto Muñoz", alumnosInscritos: 20, maxAlumnos: 25 },
      { tipo: "A3", relatorId: 2, relatorNombre: "Carmen Vega", alumnosInscritos: 18, maxAlumnos: 25 },
      { tipo: "A4", relatorId: 3, relatorNombre: "Francisco Herrera", alumnosInscritos: 19, maxAlumnos: 25 },
      { tipo: "A5", relatorId: 5, relatorNombre: "Andrés Tapia", alumnosInscritos: 15, maxAlumnos: 25 },
    ],
  },
  /** Enero I - en curso, semana final (extendida por 2 feriados en enero) */
  {
    id: 2,
    codigo: "PROM-2026-01",
    nombre: "Promoción Enero I",
    fechaInicio: "2026-01-05",
    fechaFin: "2026-02-14",
    estado: "en_curso",
    diaActual: 28,
    totalAlumnos: 88,
    cursos: [
      { tipo: "A2", relatorId: 1, relatorNombre: "Roberto Muñoz", alumnosInscritos: 24, maxAlumnos: 25 },
      { tipo: "A3", relatorId: 2, relatorNombre: "Carmen Vega", alumnosInscritos: 22, maxAlumnos: 25 },
      { tipo: "A4", relatorId: 3, relatorNombre: "Francisco Herrera", alumnosInscritos: 23, maxAlumnos: 25 },
      { tipo: "A5", relatorId: 5, relatorNombre: "Andrés Tapia", alumnosInscritos: 19, maxAlumnos: 25 },
    ],
  },
  /** Enero II - en curso, semana 4 */
  {
    id: 3,
    codigo: "PROM-2026-02",
    nombre: "Promoción Enero II",
    fechaInicio: "2026-01-19",
    fechaFin: "2026-02-21",
    estado: "en_curso",
    diaActual: 23,
    totalAlumnos: 85,
    cursos: [
      { tipo: "A2", relatorId: 3, relatorNombre: "Francisco Herrera", alumnosInscritos: 25, maxAlumnos: 25 },
      { tipo: "A3", relatorId: 2, relatorNombre: "Carmen Vega", alumnosInscritos: 20, maxAlumnos: 25 },
      { tipo: "A4", relatorId: 1, relatorNombre: "Roberto Muñoz", alumnosInscritos: 22, maxAlumnos: 25 },
      { tipo: "A5", relatorId: 5, relatorNombre: "Andrés Tapia", alumnosInscritos: 18, maxAlumnos: 25 },
    ],
  },
  /** Febrero I - en curso, semana 2 */
  {
    id: 4,
    codigo: "PROM-2026-03",
    nombre: "Promoción Febrero I",
    fechaInicio: "2026-02-02",
    fechaFin: "2026-03-07",
    estado: "en_curso",
    diaActual: 11,
    totalAlumnos: 78,
    cursos: [
      { tipo: "A2", relatorId: 3, relatorNombre: "Francisco Herrera", alumnosInscritos: 22, maxAlumnos: 25 },
      { tipo: "A3", relatorId: 3, relatorNombre: "Francisco Herrera", alumnosInscritos: 18, maxAlumnos: 25 },
      { tipo: "A4", relatorId: 1, relatorNombre: "Roberto Muñoz", alumnosInscritos: 20, maxAlumnos: 25 },
      { tipo: "A5", relatorId: 2, relatorNombre: "Carmen Vega", alumnosInscritos: 18, maxAlumnos: 25 },
    ],
  },
  /** Febrero II - planificada, aún no comienza */
  {
    id: 5,
    codigo: "PROM-2026-04",
    nombre: "Promoción Febrero II",
    fechaInicio: "2026-02-16",
    fechaFin: "2026-03-21",
    estado: "planificada",
    totalAlumnos: 35,
    cursos: [
      { tipo: "A2", relatorId: 1, relatorNombre: "Roberto Muñoz", alumnosInscritos: 12, maxAlumnos: 25 },
      { tipo: "A3", relatorId: 2, relatorNombre: "Carmen Vega", alumnosInscritos: 8, maxAlumnos: 25 },
      { tipo: "A4", relatorId: 3, relatorNombre: "Francisco Herrera", alumnosInscritos: 10, maxAlumnos: 25 },
      { tipo: "A5", relatorId: 5, relatorNombre: "Andrés Tapia", alumnosInscritos: 5, maxAlumnos: 25 },
    ],
  },
];

// --- Módulos por curso (plantillas de evaluación) RF-072 ---

export const MODULOS_POR_CURSO: Record<EspecialidadProfesional, { id: string; nombre: string; descripcion: string }[]> = {
  A2: [
    { id: "m1", nombre: "Módulo 1", descripcion: "Legislación de Transporte" },
    { id: "m2", nombre: "Módulo 2", descripcion: "Mecánica Básica" },
    { id: "m3", nombre: "Módulo 3", descripcion: "Conducción Defensiva" },
    { id: "m4", nombre: "Módulo 4", descripcion: "Primeros Auxilios" },
    { id: "m5", nombre: "Examen Final", descripcion: "Evaluación Integrada A2" },
  ],
  A3: [
    { id: "m1", nombre: "Módulo 1", descripcion: "Legislación Transporte Público" },
    { id: "m2", nombre: "Módulo 2", descripcion: "Mecánica de Buses" },
    { id: "m3", nombre: "Módulo 3", descripcion: "Conducción Urbana/Interurbana" },
    { id: "m4", nombre: "Módulo 4", descripcion: "Atención al Pasajero" },
    { id: "m5", nombre: "Examen Final", descripcion: "Evaluación Integrada A3" },
  ],
  A4: [
    { id: "m1", nombre: "Módulo 1", descripcion: "Legislación Carga Simple" },
    { id: "m2", nombre: "Módulo 2", descripcion: "Mecánica de Camiones" },
    { id: "m3", nombre: "Módulo 3", descripcion: "Manejo de Carga" },
    { id: "m4", nombre: "Módulo 4", descripcion: "Seguridad en Ruta" },
    { id: "m5", nombre: "Examen Final", descripcion: "Evaluación Integrada A4" },
  ],
  A5: [
    { id: "m1", nombre: "Módulo 1", descripcion: "Legislación Transporte de Carga" },
    { id: "m2", nombre: "Módulo 2", descripcion: "Mecánica Avanzada" },
    { id: "m3", nombre: "Módulo 3", descripcion: "Conducción con Remolque" },
    { id: "m4", nombre: "Módulo 4", descripcion: "Mercancías Peligrosas" },
    { id: "m5", nombre: "Examen Final", descripcion: "Evaluación Integrada A5" },
  ],
};

// --- Alumnos por promo-curso (clave: "promoId-curso") ---

export const ALUMNOS_POR_CURSO: Record<string, { id: number; nombre: string; rut: string; curso: string; promoId: number }[]> = {
  "3-A2": [
    { id: 1,  nombre: "Carlos Soto Muñoz",      rut: "15.432.198-7", curso: "A2", promoId: 3 },
    { id: 2,  nombre: "Andrea Flores Vera",      rut: "16.789.234-5", curso: "A2", promoId: 3 },
    { id: 3,  nombre: "Luis Pérez Castro",       rut: "14.567.890-3", curso: "A2", promoId: 3 },
    { id: 4,  nombre: "Mariana Torres Rojas",    rut: "17.234.567-K", curso: "A2", promoId: 3 },
    { id: 5,  nombre: "Roberto Núñez Díaz",      rut: "13.456.789-1", curso: "A2", promoId: 3 },
    { id: 6,  nombre: "Patricia Vargas Silva",   rut: "15.678.901-2", curso: "A2", promoId: 3 },
    { id: 7,  nombre: "Jorge Morales Reyes",     rut: "16.901.234-6", curso: "A2", promoId: 3 },
    { id: 8,  nombre: "Valentina Ríos Lagos",    rut: "15.234.567-4", curso: "A2", promoId: 3 },
  ],
  "4-A2": [
    { id: 9,  nombre: "Felipe Aguilar Pino",     rut: "17.345.678-9", curso: "A2", promoId: 4 },
    { id: 10, nombre: "Diego Meza Fuentes",      rut: "16.456.789-0", curso: "A2", promoId: 4 },
    { id: 11, nombre: "Camila Rojas Vega",       rut: "18.123.456-7", curso: "A2", promoId: 4 },
    { id: 12, nombre: "Sebastián Mora Castro",   rut: "17.654.321-2", curso: "A2", promoId: 4 },
  ],
  "4-A3": [
    { id: 15, nombre: "María Fernández López",   rut: "14.876.543-1", curso: "A3", promoId: 4 },
    { id: 16, nombre: "Nicolás Castillo Vera",   rut: "15.987.654-2", curso: "A3", promoId: 4 },
    { id: 17, nombre: "Javiera Soto Romero",     rut: "17.111.222-3", curso: "A3", promoId: 4 },
    { id: 18, nombre: "Mateo Salinas Riquelme",  rut: "16.555.444-9", curso: "A3", promoId: 4 },
  ],
};

// --- Notas mock por alumnoId: { moduloId: nota | null } ---
// "ingresadoPor" solo aplica a notas ya cargadas (no nulas)

export type IngresadoPor = "secretaria" | "relator";

export const NOTAS_MOCK: Record<string, Record<string, number | null>> = {
  "1":  { m1: 5.5, m2: 4.8, m3: null, m4: null, m5: null },
  "2":  { m1: 3.8, m2: 4.2, m3: null, m4: null, m5: null },
  "3":  { m1: 6.0, m2: 6.5, m3: null, m4: null, m5: null },
  "4":  { m1: 3.5, m2: 3.2, m3: null, m4: null, m5: null },
  "5":  { m1: 5.0, m2: 4.9, m3: null, m4: null, m5: null },
  "6":  { m1: 5.8, m2: 5.5, m3: null, m4: null, m5: null },
  "7":  { m1: 4.5, m2: 4.3, m3: null, m4: null, m5: null },
  "8":  { m1: 6.2, m2: 6.0, m3: null, m4: null, m5: null },
  "9":  { m1: 5.0, m2: null, m3: null, m4: null, m5: null },
  "10": { m1: 4.8, m2: null, m3: null, m4: null, m5: null },
  "11": { m1: 3.0, m2: null, m3: null, m4: null, m5: null },
  "12": { m1: 5.5, m2: null, m3: null, m4: null, m5: null },
};

// Quién ingresó cada nota (solo las que tienen valor)
export const NOTAS_AUTOR: Record<string, Record<string, IngresadoPor>> = {
  "1":  { m1: "relator",   m2: "relator" },
  "2":  { m1: "relator",   m2: "secretaria" },
  "3":  { m1: "relator",   m2: "relator" },
  "4":  { m1: "relator",   m2: "secretaria" },
  "5":  { m1: "relator",   m2: "relator" },
  "6":  { m1: "relator",   m2: "relator" },
  "7":  { m1: "relator",   m2: "secretaria" },
  "8":  { m1: "relator",   m2: "relator" },
  "9":  { m1: "secretaria" },
  "10": { m1: "secretaria" },
  "11": { m1: "secretaria" },
  "12": { m1: "secretaria" },
};

// --- Helpers ---

export function getRelatorById(id: number): Relator | undefined {
  return RELATORES.find((r) => r.id === id);
}

export function getActiveRelatores(): Relator[] {
  return RELATORES.filter((r) => r.activo);
}

export function getRelatoresByEspecialidad(esp: EspecialidadProfesional): Relator[] {
  return RELATORES.filter((r) => r.activo && r.especialidades.includes(esp));
}

export function getPromocionById(id: number): Promocion | undefined {
  return PROMOCIONES.find((p) => p.id === id);
}

export function getPromocionesByEstado(estado: Promocion["estado"]): Promocion[] {
  return PROMOCIONES.filter((p) => p.estado === estado);
}

/** Retorna las promociones activas (no finalizadas) donde participa un relator */
export function getPromocionesActivasByRelator(relatorId: number): Promocion[] {
  return PROMOCIONES.filter(
    (p) => p.estado !== "finalizada" && p.cursos.some((c) => c.relatorId === relatorId)
  );
}

/** Retorna el conteo de promociones activas de un relator (para badges y KPIs) */
export function countPromocionesActivasByRelator(relatorId: number): number {
  return getPromocionesActivasByRelator(relatorId).length;
}
