/**
 * Datos mock para el Sistema Escuela de Conductores.
 * Coherentes con PLAN-TRABAJO-HOY y mockups; reemplazar por API cuando exista backend.
 */

export const ESCUELA_ACTUAL = 'Autoescuela Chillán';

export const statsAdmin = {
  alumnosActivos: 124,
  clasesHoy: 18,
  pendientesPago: 7,
};

export const ultimasMatriculas = [
  { nombre: 'María González López', rut: '18.234.567-8', fecha: '03 Feb 2026' },
  { nombre: 'Carlos Soto Rojas', rut: '19.456.789-1', fecha: '02 Feb 2026' },
  { nombre: 'Ana Fernández Díaz', rut: '20.123.456-2', fecha: '02 Feb 2026' },
];

export const agendaHoy = [
  { hora: '09:00', alumno: 'Juan Pérez García', instructor: 'Pedro Soto', estado: 'Confirmada' },
  { hora: '10:00', alumno: 'María González López', instructor: 'Ana López', estado: 'Confirmada' },
  { hora: '11:00', alumno: '—', instructor: '—', estado: 'Disponible' },
  { hora: '14:00', alumno: 'Carlos Soto Rojas', instructor: 'Pedro Soto', estado: 'Confirmada' },
];

export const misClasesHoy = [
  { hora: '09:00', alumno: 'Juan Pérez García', claseNum: 3, totalClases: 7 },
  { hora: '14:00', alumno: 'Carlos Soto Rojas', claseNum: 1, totalClases: 7 },
];

/** Módulo 03 – Matrícula Clase B */
export const alumnosClaseB = [
  { nombre: 'Juan Pérez García', rut: '19.234.567-8', estado: 'Activo' as const },
  { nombre: 'María González López', rut: '20.456.789-1', estado: 'Pendiente' as const },
];

export const matriculaResumen = {
  total: 350000,
  metodos: ['Efectivo', 'Transferencia'] as const,
};

/** Módulo 04 – Agenda Clase B */
export const semanaAgenda = { titulo: 'Semana 03 - 07 Feb 2026', dias: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'] };
export const gridAgenda09 = ['Disponible', 'Juan Pérez', 'Disponible', 'Sin vehículo', 'Disponible'];
export const tripleMatch = { instructor: true, vehiculo: true, alumno: false };
export const reservaAlumno = { alumno: 'Juan Pérez', fecha: 'Miércoles 5 Feb', hora: '09:00' };

/** Módulo 05 – Pagos y contabilidad */
export const pagoHibrido = { alumno: 'Juan Pérez García', total: 350000, efectivo: 200000, transferencia: 150000 };
export const boletasSII = [{ folio: 12345, monto: 150000, estado: 'Emitida' }, { folio: 12346, monto: 200000, estado: 'Emitida' }];
export const estadoCuentaAlumno = { nombre: 'Juan Pérez', saldoPendiente: 0 };
export const cierreCaja = { fecha: '03 Feb 2026', efectivo: 450000, transferencias: 200000, total: 650000 };
export const cuadraturaDiaria = { fecha: '03 Feb 2026', pagosRegistrados: 12, totalIngresos: 2450000 };

/** Módulo 06 – Flota (RF-036) */
export const vehiculos = [
  { patente: 'ABCD-12', marcaModelo: 'Toyota Yaris', ano: 2022, estado: 'Disponible' },
  { patente: 'EFGH-34', marcaModelo: 'Hyundai i20', ano: 2023, estado: 'En uso' },
];

/** Módulo 07 – Clase profesional (RF-042) */
export const docsClaseProfesional = [
  { nombre: 'Licencia Clase B', estado: 'Validado' },
  { nombre: 'Certificado antecedentes', estado: 'Pendiente revisión' },
];

/** Módulo 08 – Promociones */
export const promociones = [
  { nombre: 'Verano 2026', descuento: '15%', vigencia: 'Ene - Mar 2026', estado: 'Activa' },
  { nombre: 'Referido', descuento: '$50.000', vigencia: 'Permanente', estado: 'Activa' },
];

/** Módulo 09 – Instructores */
export const instructores = [
  { nombre: 'Pedro Soto', email: 'pedro.soto@escuela.cl', clasesHoy: 6, estado: 'Activo' },
  { nombre: 'Ana López', email: 'ana.lopez@escuela.cl', clasesHoy: 4, estado: 'Activo' },
];

/** Módulo 10 – Certificación (RF-050) */
export const inventarioCertificados = { foliosDisponibles: 245, ultimoLote: '2026-01' };
export const filasCertificados = [{ folio: 10001, lote: '2026-01', estado: 'Disponible' }, { folio: 10002, lote: '2026-01', estado: 'Disponible' }];

/** Módulo 11 – Asistencia (RF-046) */
export const semanaAsistencia = 'Semana 05 Feb 2026';
export const matrizAsistencia = [
  { alumno: 'Juan Pérez', lun: '✓', mar: '✓', mie: 'F', jue: '-', vie: '-' },
  { alumno: 'María González', lun: '✓', mar: '✓', mie: '✓', jue: '✓', vie: '-' },
];

/** Módulo 12 – Usuarios y auditoría (RF-001, RF-005) */
export const usuariosSistema = [
  { nombre: 'María González', email: 'maria@escuela.cl', rol: 'Admin', estado: 'Activo' },
  { nombre: 'Pedro Soto', email: 'pedro@escuela.cl', rol: 'Instructor', estado: 'Activo' },
];
export const logAuditoria = [
  { fechaHora: '03 Feb 2026 10:32', usuario: 'María González', accion: 'Matrícula creada', detalle: 'Juan Pérez' },
  { fechaHora: '03 Feb 2026 09:15', usuario: 'Pedro Soto', accion: 'Clase iniciada', detalle: 'Clase 3 - Juan Pérez' },
];

/** Módulo 13 – Documentos */
export const documentosAlumno = { nombre: 'Juan Pérez', rut: '19.234.567-8' };
export const listaDocumentos = [
  { nombre: 'Cédula identidad.pdf', fechaSubida: '02 Feb 2026' },
  { nombre: 'Certificado antecedentes.pdf', fechaSubida: '01 Feb 2026' },
];
