/**
 * Mock Data: Instructores
 * Lista de instructores con vehículos asignados y disponibilidad
 */

export interface Instructor {
    id: number;
    nombre: string;
    rut: string;
    email: string;
    telefono: string;
    tipo: "teorico" | "practico" | "ambos";
    sede: "autoescuela-chillan" | "conductores-chillan";

    // RF-041: Información de licencia
    licencia: {
        numero: string;
        clase: string; // "B", "A2", "A3", "A4", "A5"
        fechaVencimiento: string; // YYYY-MM-DD
        estadoValidacion: "vigente" | "por_vencer" | "vencida";
    };

    // RF-045: Asignación actual de vehículo
    vehiculoAsignado?: {
        id: number;
        patente: string;
        modelo: string;
        fechaAsignacion: string;
    };

    // RF-042: Historial de asignaciones de vehículos
    historialVehiculos: Array<{
        vehiculoId: number;
        patente: string;
        modelo: string;
        fechaInicio: string;
        fechaFin: string | null;
        asignadoPor: string;
    }>;

    // RF-044: Historial de reemplazos
    reemplazos: Array<{
        fecha: string;
        reemplazadoPor: number; // ID del instructor reemplazo
        nombreReemplazo: string;
        motivo: string;
        clases: number[]; // IDs de clases afectadas
    }>;

    // RF-043: Clases activas (para advertencia de desactivación)
    clasesActivas: number;

    disponibilidad: {
        // Días de la semana: 0=Domingo, 1=Lunes, ..., 6=Sábado
        dias: number[];
        // Horarios disponibles en formato "HH:MM"
        horaInicio: string;
        horaFin: string;
    };

    activo: boolean;
    fechaRegistro: string;

    // Remuneración (visible para secretaria: tarifa. Acumulado mensual: solo admin)
    tarifaPorClase: number; // $ por sesión práctica o por hora teórica

    // Historial de horas trabajadas por mes
    horasMensuales: {
        [key: string]: { // formato: "febrero2026", "enero2026", etc.
            teoricas: number;        // horas teóricas dictadas
            practicas: number;       // cantidad de sesiones prácticas (cada una = 1.5h)
            totalEquivalente: number; // teoricas + (practicas * 1.5)
        };
    };
}

export const INSTRUCTORES: Instructor[] = [
    /** RF-041: Instructor activo con vehículo asignado, sin historial */
    {
        id: 1,
        nombre: "Carlos Rojas",
        rut: "12.345.678-9",
        email: "carlos.rojas@autoescuela.cl",
        telefono: "+56 9 8765 4321",
        tipo: "practico",
        sede: "autoescuela-chillan",
        licencia: {
            numero: "15234567",
            clase: "B",
            fechaVencimiento: "2027-06-15",
            estadoValidacion: "vigente",
        },
        vehiculoAsignado: {
            id: 1,
            patente: "ABC-123",
            modelo: "Nissan Versa 2022",
            fechaAsignacion: "2025-01-10",
        },
        historialVehiculos: [],
        reemplazos: [],
        clasesActivas: 5,
        disponibilidad: {
            dias: [1, 2, 3, 4, 5], // Lunes a Viernes
            horaInicio: "08:00",
            horaFin: "18:00",
        },
        activo: true,
        fechaRegistro: "2024-01-15",
        tarifaPorClase: 8500,
        horasMensuales: {
            "febrero2026": { teoricas: 0, practicas: 30, totalEquivalente: 45 },
            "enero2026": { teoricas: 0, practicas: 28, totalEquivalente: 42 },
            "diciembre2025": { teoricas: 0, practicas: 25, totalEquivalente: 37.5 },
        },
    },

    /** RF-042: Instructor con historial de vehículos (3 asignaciones previas) */
    {
        id: 2,
        nombre: "Ana Martínez",
        rut: "23.456.789-0",
        email: "ana.martinez@autoescuela.cl",
        telefono: "+56 9 7654 3210",
        tipo: "practico",
        sede: "autoescuela-chillan",
        licencia: {
            numero: "16345678",
            clase: "B",
            fechaVencimiento: "2026-11-20",
            estadoValidacion: "vigente",
        },
        vehiculoAsignado: {
            id: 2,
            patente: "XYZ-789",
            modelo: "Chevrolet Sail 2023",
            fechaAsignacion: "2025-01-05",
        },
        historialVehiculos: [
            {
                vehiculoId: 1,
                patente: "ABC-123",
                modelo: "Nissan Versa 2022",
                fechaInicio: "2024-01-20",
                fechaFin: "2024-06-30",
                asignadoPor: "Admin Principal",
            },
            {
                vehiculoId: 3,
                patente: "DEF-456",
                modelo: "Suzuki Swift 2021",
                fechaInicio: "2024-07-01",
                fechaFin: "2024-10-15",
                asignadoPor: "Secretaria González",
            },
            {
                vehiculoId: 4,
                patente: "GHI-789",
                modelo: "Kia Rio 2022",
                fechaInicio: "2024-10-16",
                fechaFin: "2025-01-04",
                asignadoPor: "Admin Principal",
            },
        ],
        reemplazos: [],
        clasesActivas: 3,
        disponibilidad: {
            dias: [1, 2, 3, 4, 5, 6], // Lunes a Sábado
            horaInicio: "09:00",
            horaFin: "20:00",
        },
        activo: true,
        fechaRegistro: "2024-01-20",
        tarifaPorClase: 8500,
        horasMensuales: {
            "febrero2026": { teoricas: 0, practicas: 25, totalEquivalente: 37.5 },
            "enero2026": { teoricas: 0, practicas: 30, totalEquivalente: 45 },
            "diciembre2025": { teoricas: 0, practicas: 28, totalEquivalente: 42 },
        },
    },

    /** RF-044: Instructor inactivo con ejemplo de reemplazo */
    {
        id: 3,
        nombre: "Luis Torres",
        rut: "34.567.890-1",
        email: "luis.torres@autoescuela.cl",
        telefono: "+56 9 6543 2109",
        tipo: "practico",
        sede: "conductores-chillan",
        licencia: {
            numero: "17456789",
            clase: "B",
            fechaVencimiento: "2026-08-10",
            estadoValidacion: "vigente",
        },
        vehiculoAsignado: undefined,
        historialVehiculos: [
            {
                vehiculoId: 3,
                patente: "DEF-456",
                modelo: "Suzuki Swift 2021",
                fechaInicio: "2024-02-01",
                fechaFin: "2025-01-10",
                asignadoPor: "Admin Principal",
            },
        ],
        reemplazos: [
            {
                fecha: "2025-01-20",
                reemplazadoPor: 2,
                nombreReemplazo: "Ana Martínez",
                motivo: "Licencia médica por intervención quirúrgica",
                clases: [45, 46, 47, 48],
            },
        ],
        clasesActivas: 0,
        disponibilidad: {
            dias: [1, 3, 5], // Lunes, Miércoles, Viernes
            horaInicio: "10:00",
            horaFin: "19:00",
        },
        activo: false,
        fechaRegistro: "2024-02-01",
        tarifaPorClase: 8000,
        horasMensuales: {
            "febrero2026": { teoricas: 0, practicas: 0, totalEquivalente: 0 },
            "enero2026": { teoricas: 0, practicas: 18, totalEquivalente: 27 },
            "diciembre2025": { teoricas: 0, practicas: 22, totalEquivalente: 33 },
        },
    },

    /** RF-041: Instructor con licencia por vencer (20 días) */
    {
        id: 4,
        nombre: "Patricia Soto",
        rut: "45.678.901-2",
        email: "patricia.soto@autoescuela.cl",
        telefono: "+56 9 5432 1098",
        tipo: "practico",
        sede: "autoescuela-chillan",
        licencia: {
            numero: "18567890",
            clase: "B",
            fechaVencimiento: "2025-03-01", // 20 días desde hoy (2025-02-09)
            estadoValidacion: "por_vencer",
        },
        vehiculoAsignado: {
            id: 4,
            patente: "GHI-789",
            modelo: "Kia Rio 2022",
            fechaAsignacion: "2024-11-01",
        },
        historialVehiculos: [],
        reemplazos: [],
        clasesActivas: 2,
        disponibilidad: {
            dias: [2, 4, 6], // Martes, Jueves, Sábado
            horaInicio: "08:00",
            horaFin: "13:00",
        },
        activo: true,
        fechaRegistro: "2024-03-15",
        tarifaPorClase: 7500,
        horasMensuales: {
            "febrero2026": { teoricas: 0, practicas: 20, totalEquivalente: 30 },
            "enero2026": { teoricas: 0, practicas: 22, totalEquivalente: 33 },
            "diciembre2025": { teoricas: 0, practicas: 18, totalEquivalente: 27 },
        },
    },

    /** RF-042: Instructor con múltiple historial (5 asignaciones) */
    {
        id: 5,
        nombre: "María Silva",
        rut: "56.789.012-3",
        email: "maria.silva@conductores.cl",
        telefono: "+56 9 4321 0987",
        tipo: "ambos",
        sede: "conductores-chillan",
        licencia: {
            numero: "19678901",
            clase: "B",
            fechaVencimiento: "2028-01-25",
            estadoValidacion: "vigente",
        },
        vehiculoAsignado: {
            id: 5,
            patente: "JKL-012",
            modelo: "Hyundai Accent 2023",
            fechaAsignacion: "2024-12-01",
        },
        historialVehiculos: [
            {
                vehiculoId: 1,
                patente: "ABC-123",
                modelo: "Nissan Versa 2022",
                fechaInicio: "2024-01-15",
                fechaFin: "2024-03-31",
                asignadoPor: "Admin Principal",
            },
            {
                vehiculoId: 2,
                patente: "XYZ-789",
                modelo: "Chevrolet Sail 2023",
                fechaInicio: "2024-04-01",
                fechaFin: "2024-06-15",
                asignadoPor: "Secretaria González",
            },
            {
                vehiculoId: 4,
                patente: "GHI-789",
                modelo: "Kia Rio 2022",
                fechaInicio: "2024-06-16",
                fechaFin: "2024-08-31",
                asignadoPor: "Admin Principal",
            },
            {
                vehiculoId: 3,
                patente: "DEF-456",
                modelo: "Suzuki Swift 2021",
                fechaInicio: "2024-09-01",
                fechaFin: "2024-11-30",
                asignadoPor: "Admin Principal",
            },
            {
                vehiculoId: 5,
                patente: "JKL-012",
                modelo: "Hyundai Accent 2023",
                fechaInicio: "2024-12-01",
                fechaFin: null, // Asignación actual
                asignadoPor: "Secretaria González",
            },
        ],
        reemplazos: [],
        clasesActivas: 1,
        disponibilidad: {
            dias: [1, 2, 3, 4, 5], // Lunes a Viernes
            horaInicio: "14:00",
            horaFin: "22:00",
        },
        activo: true,
        fechaRegistro: "2024-01-10",
        tarifaPorClase: 9500,
        horasMensuales: {
            "febrero2026": { teoricas: 35, practicas: 28, totalEquivalente: 77 },
            "enero2026": { teoricas: 32, practicas: 30, totalEquivalente: 77 },
            "diciembre2025": { teoricas: 30, practicas: 25, totalEquivalente: 67.5 },
        },
    },
];

// Helper: Calcular acumulado mensual (solo para admin — secretaria no puede ver esto)
export function calcularAcumuladoMes(instructor: Instructor, mes: string): number {
    const horas = instructor.horasMensuales[mes];
    if (!horas) return 0;
    return horas.totalEquivalente * instructor.tarifaPorClase;
}

// Helper: Obtener instructor por ID
export function getInstructorById(id: number): Instructor | undefined {
    return INSTRUCTORES.find((i) => i.id === id);
}

// Helper: Obtener instructores activos
export function getActiveInstructors(): Instructor[] {
    return INSTRUCTORES.filter((i) => i.activo);
}

// Helper: Obtener instructores prácticos
export function getPracticalInstructors(): Instructor[] {
    return INSTRUCTORES.filter(
        (i) => i.activo && (i.tipo === "practico" || i.tipo === "ambos")
    );
}

/**
 * Calcula comparativa de horas entre dos meses
 */
export function getHorasComparison(
    instructor: Instructor,
    mesActual: string,
    mesAnterior: string
): { porcentaje: number; direccion: "up" | "down" | "equal" } {
    const horasActuales = instructor.horasMensuales[mesActual]?.totalEquivalente || 0;
    const horasAnteriores = instructor.horasMensuales[mesAnterior]?.totalEquivalente || 0;

    if (horasAnteriores === 0) {
        return { porcentaje: 0, direccion: "equal" };
    }

    const porcentaje = Math.round(((horasActuales - horasAnteriores) / horasAnteriores) * 100);
    const direccion = porcentaje > 0 ? "up" : porcentaje < 0 ? "down" : "equal";

    return { porcentaje: Math.abs(porcentaje), direccion };
}

/**
 * Obtiene totales agregados de todos los instructores activos para un mes
 */
export function getTotalesHorasMes(mes: string): {
    totalTeoricas: number;
    totalPracticas: number;
    totalEquivalente: number;
    promedioEquivalente: number;
    instructoresActivos: number;
} {
    const activos = getActiveInstructors();
    let totalTeoricas = 0;
    let totalPracticas = 0;
    let totalEquivalente = 0;

    activos.forEach((instructor) => {
        const horas = instructor.horasMensuales[mes];
        if (horas) {
            totalTeoricas += horas.teoricas;
            totalPracticas += horas.practicas;
            totalEquivalente += horas.totalEquivalente;
        }
    });

    return {
        totalTeoricas,
        totalPracticas,
        totalEquivalente,
        promedioEquivalente: activos.length > 0 ? Math.round(totalEquivalente / activos.length) : 0,
        instructoresActivos: activos.length,
    };
}
