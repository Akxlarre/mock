/**
 * Mock Data: Repositorio de Documentos (DMS)
 * RF-012: Documentos del Alumno | Documentos de la Escuela | Plantillas
 * Seguridad: Admin elimina; Secretaria solo sube, visualiza y descarga
 */

export type TipoDocAlumno =
  | "contrato"
  | "foto_licencia"
  | "hoja_vida"
  | "cedula"
  | "certificado_antecedentes"
  | "autorizacion_notarial"
  | "foto_carnet";

export type TipoDocEscuela =
  | "factura_folios"
  | "resolucion_mtt"
  | "decreto"
  | "otro";

export interface DocumentoAlumno {
  id: string;
  alumnoId: number;
  alumnoNombre: string;
  alumnoRut: string;
  tipo: TipoDocAlumno;
  nombreArchivo: string;
  fechaSubida: string;
  subidoPor: "admin" | "secretaria";
}

export interface DocumentoEscuela {
  id: string;
  tipo: TipoDocEscuela;
  nombreArchivo: string;
  descripcion?: string;
  fechaSubida: string;
  subidoPor: "admin" | "secretaria";
}

// --- Documentos del Alumno ---
export const DOCUMENTOS_ALUMNO: DocumentoAlumno[] = [
  {
    id: "da-1",
    alumnoId: 1,
    alumnoNombre: "María González López",
    alumnoRut: "18.234.567-8",
    tipo: "contrato",
    nombreArchivo: "Contrato_Prestacion_Servicios.pdf",
    fechaSubida: "2026-02-03",
    subidoPor: "secretaria",
  },
  {
    id: "da-2",
    alumnoId: 1,
    alumnoNombre: "María González López",
    alumnoRut: "18.234.567-8",
    tipo: "foto_carnet",
    nombreArchivo: "foto_carnet_maria.jpg",
    fechaSubida: "2026-02-03",
    subidoPor: "secretaria",
  },
  {
    id: "da-3",
    alumnoId: 1,
    alumnoNombre: "María González López",
    alumnoRut: "18.234.567-8",
    tipo: "cedula",
    nombreArchivo: "cedula_identidad.pdf",
    fechaSubida: "2026-02-02",
    subidoPor: "secretaria",
  },
  {
    id: "da-4",
    alumnoId: 2,
    alumnoNombre: "Juan Pérez García",
    alumnoRut: "19.234.567-8",
    tipo: "contrato",
    nombreArchivo: "Contrato_Prestacion_Servicios.pdf",
    fechaSubida: "2026-01-28",
    subidoPor: "admin",
  },
  {
    id: "da-5",
    alumnoId: 2,
    alumnoNombre: "Juan Pérez García",
    alumnoRut: "19.234.567-8",
    tipo: "hoja_vida",
    nombreArchivo: "Hoja_Vida_Conductor.pdf",
    fechaSubida: "2026-01-27",
    subidoPor: "secretaria",
  },
  {
    id: "da-6",
    alumnoId: 2,
    alumnoNombre: "Juan Pérez García",
    alumnoRut: "19.234.567-8",
    tipo: "foto_licencia",
    nombreArchivo: "licencia_conducir.jpg",
    fechaSubida: "2026-01-27",
    subidoPor: "secretaria",
  },
  {
    id: "da-7",
    alumnoId: 3,
    alumnoNombre: "Carlos Soto Rojas",
    alumnoRut: "20.456.789-1",
    tipo: "contrato",
    nombreArchivo: "Contrato_Prestacion_Servicios.pdf",
    fechaSubida: "2026-02-02",
    subidoPor: "secretaria",
  },
  {
    id: "da-8",
    alumnoId: 3,
    alumnoNombre: "Carlos Soto Rojas",
    alumnoRut: "20.456.789-1",
    tipo: "certificado_antecedentes",
    nombreArchivo: "certificado_antecedentes.pdf",
    fechaSubida: "2026-02-01",
    subidoPor: "secretaria",
  },
];

// --- Documentos de la Escuela ---
export const DOCUMENTOS_ESCUELA: DocumentoEscuela[] = [
  {
    id: "de-1",
    tipo: "resolucion_mtt",
    nombreArchivo: "Resolucion_MTT_2025-1245.pdf",
    descripcion: "Resolución de autorización como centro de formación",
    fechaSubida: "2025-11-15",
    subidoPor: "admin",
  },
  {
    id: "de-2",
    tipo: "factura_folios",
    nombreArchivo: "Factura_Compra_Folios_Casa_Moneda_2026-01.pdf",
    descripcion: "Factura lote folios certificados profesional",
    fechaSubida: "2026-01-20",
    subidoPor: "admin",
  },
  {
    id: "de-3",
    tipo: "decreto",
    nombreArchivo: "Decreto_Modificacion_Reglamento_2025.pdf",
    descripcion: "Decreto que modifica reglamento de licencias",
    fechaSubida: "2025-09-10",
    subidoPor: "admin",
  },
  {
    id: "de-4",
    tipo: "resolucion_mtt",
    nombreArchivo: "Resolucion_Inspeccion_2025.pdf",
    descripcion: "Acta de inspección MTT - Aprobada",
    fechaSubida: "2025-08-22",
    subidoPor: "secretaria",
  },
];

// --- Labels para UI ---
export const LABELS_TIPO_ALUMNO: Record<TipoDocAlumno, string> = {
  contrato: "Contrato firmado",
  foto_licencia: "Foto licencia",
  hoja_vida: "Hoja de vida conductor",
  cedula: "Cédula identidad",
  certificado_antecedentes: "Certificado antecedentes",
  autorizacion_notarial: "Autorización notarial",
  foto_carnet: "Foto carnet",
};

export const LABELS_TIPO_ESCUELA: Record<TipoDocEscuela, string> = {
  factura_folios: "Factura folios",
  resolucion_mtt: "Resolución MTT",
  decreto: "Decreto",
  otro: "Otro",
};

// --- Plantillas de Documentos ---

export type CategoriasPlantilla =
  | "clase_b"
  | "clase_profesional"
  | "general"
  | "administrativo";

export interface Plantilla {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: CategoriasPlantilla;
  formato: "pdf" | "docx" | "xlsx";
  version: string;
  actualizadoEl: string;
  actualizadoPor: "admin";
  descargas: number;
}

export const PLANTILLAS: Plantilla[] = [
  {
    id: "pl-1",
    nombre: "Contrato Matrícula Clase B",
    descripcion: "Contrato estándar de prestación de servicios para alumnos Clase B. Incluye cláusulas de pago en cuotas y políticas de cancelación.",
    categoria: "clase_b",
    formato: "pdf",
    version: "v3.2",
    actualizadoEl: "2025-12-01",
    actualizadoPor: "admin",
    descargas: 142,
  },
  {
    id: "pl-2",
    nombre: "Contrato Matrícula Clase Profesional",
    descripcion: "Contrato para alumnos de cursos profesionales (A2, A3, A4, D). Incluye requisitos de la Hoja de Vida del Conductor.",
    categoria: "clase_profesional",
    formato: "pdf",
    version: "v2.1",
    actualizadoEl: "2026-01-10",
    actualizadoPor: "admin",
    descargas: 58,
  },
  {
    id: "pl-3",
    nombre: "Hoja de Vida del Conductor",
    descripcion: "Formulario oficial requerido por el MTT para alumnos de clase profesional. Obligatorio para rendir examen.",
    categoria: "clase_profesional",
    formato: "pdf",
    version: "v1.4 (MTT 2024)",
    actualizadoEl: "2024-08-15",
    actualizadoPor: "admin",
    descargas: 211,
  },
  {
    id: "pl-4",
    nombre: "Formulario Pre-inscripción Profesional",
    descripcion: "Formulario que completa el candidato antes de la entrevista y test psicológico. Base para generar el expediente inicial.",
    categoria: "clase_profesional",
    formato: "pdf",
    version: "v1.0",
    actualizadoEl: "2026-01-05",
    actualizadoPor: "admin",
    descargas: 34,
  },
  {
    id: "pl-5",
    nombre: "Autorización Notarial Menor de Edad",
    descripcion: "Documento que deben firmar los tutores legales para alumnos menores de 18 años que se matriculan en Clase B.",
    categoria: "clase_b",
    formato: "docx",
    version: "v2.0",
    actualizadoEl: "2025-09-20",
    actualizadoPor: "admin",
    descargas: 27,
  },
  {
    id: "pl-6",
    nombre: "Certificado de Alumno Regular",
    descripcion: "Certificado emitido por la escuela que acredita que el alumno está matriculado y al día. Editable con datos del alumno.",
    categoria: "general",
    formato: "docx",
    version: "v1.3",
    actualizadoEl: "2025-11-30",
    actualizadoPor: "admin",
    descargas: 89,
  },
  {
    id: "pl-7",
    nombre: "Recibo de Pago / Abono",
    descripcion: "Comprobante de pago manual para transacciones en efectivo. Se imprime y entrega al alumno en el acto.",
    categoria: "administrativo",
    formato: "pdf",
    version: "v1.1",
    actualizadoEl: "2025-10-12",
    actualizadoPor: "admin",
    descargas: 318,
  },
  {
    id: "pl-8",
    nombre: "Acta de Término de Curso Clase B",
    descripcion: "Documento interno que certifica que el alumno completó sus 12 clases prácticas y teoría. Necesario para tramitar licencia.",
    categoria: "clase_b",
    formato: "pdf",
    version: "v2.4",
    actualizadoEl: "2025-12-15",
    actualizadoPor: "admin",
    descargas: 76,
  },
  {
    id: "pl-9",
    nombre: "Planilla de Pagos en Cuotas",
    descripcion: "Hoja de seguimiento de cuotas para alumnos con plan de pago. Se imprime y adjunta al expediente.",
    categoria: "administrativo",
    formato: "xlsx",
    version: "v1.0",
    actualizadoEl: "2026-01-20",
    actualizadoPor: "admin",
    descargas: 63,
  },
];

export const LABELS_CATEGORIA_PLANTILLA: Record<CategoriasPlantilla, string> = {
  clase_b: "Clase B",
  clase_profesional: "Clase Profesional",
  general: "General",
  administrativo: "Administrativo",
};

export const FORMATO_ICONO: Record<Plantilla["formato"], { color: string; label: string }> = {
  pdf:  { color: "text-red-600 bg-red-50",   label: "PDF"  },
  docx: { color: "text-blue-600 bg-blue-50", label: "DOCX" },
  xlsx: { color: "text-green-700 bg-green-50", label: "XLSX" },
};

// --- Helpers ---
export function getDocumentosByAlumno(alumnoId: number): DocumentoAlumno[] {
  return DOCUMENTOS_ALUMNO.filter((d) => d.alumnoId === alumnoId);
}

export function getAlumnosConDocumentos(): { alumnoId: number; nombre: string; rut: string; cantidad: number }[] {
  const map = new Map<number, { nombre: string; rut: string; count: number }>();
  for (const doc of DOCUMENTOS_ALUMNO) {
    const existing = map.get(doc.alumnoId);
    if (existing) {
      existing.count++;
    } else {
      map.set(doc.alumnoId, {
        nombre: doc.alumnoNombre,
        rut: doc.alumnoRut,
        count: 1,
      });
    }
  }
  return Array.from(map.entries()).map(([alumnoId, { nombre, rut, count }]) => ({
    alumnoId,
    nombre,
    rut,
    cantidad: count,
  }));
}
