/**
 * Mock Data: Instructores
 * Lista de instructores con vehículos asignados y disponibilidad
 */

export interface Instructor {
    id: number;
    nombre: string;
    rut: string;
    tipo: "teorico" | "practico" | "ambos";
    vehiculoAsignado?: {
        id: number;
        patente: string;
        modelo: string;
    };
    disponibilidad: {
        // Días de la semana: 0=Domingo, 1=Lunes, ..., 6=Sábado
        dias: number[];
        // Horarios disponibles en formato "HH:MM"
        horaInicio: string;
        horaFin: string;
    };
    activo: boolean;
}

export const INSTRUCTORES: Instructor[] = [
    {
        id: 1,
        nombre: "Carlos Rojas",
        rut: "12.345.678-9",
        tipo: "practico",
        vehiculoAsignado: {
            id: 1,
            patente: "ABC-123",
            modelo: "Nissan Versa 2022",
        },
        disponibilidad: {
            dias: [1, 2, 3, 4, 5], // Lunes a Viernes
            horaInicio: "08:00",
            horaFin: "18:00",
        },
        activo: true,
    },
    {
        id: 2,
        nombre: "Ana Martínez",
        rut: "23.456.789-0",
        tipo: "practico",
        vehiculoAsignado: {
            id: 2,
            patente: "XYZ-789",
            modelo: "Chevrolet Sail 2023",
        },
        disponibilidad: {
            dias: [1, 2, 3, 4, 5, 6], // Lunes a Sábado
            horaInicio: "09:00",
            horaFin: "20:00",
        },
        activo: true,
    },
    {
        id: 3,
        nombre: "Luis Torres",
        rut: "34.567.890-1",
        tipo: "practico",
        vehiculoAsignado: {
            id: 3,
            patente: "DEF-456",
            modelo: "Suzuki Swift 2021",
        },
        disponibilidad: {
            dias: [1, 3, 5], // Lunes, Miércoles, Viernes
            horaInicio: "10:00",
            horaFin: "19:00",
        },
        activo: true,
    },
    {
        id: 4,
        nombre: "Patricia Soto",
        rut: "45.678.901-2",
        tipo: "practico",
        vehiculoAsignado: {
            id: 4,
            patente: "GHI-789",
            modelo: "Kia Rio 2022",
        },
        disponibilidad: {
            dias: [2, 4, 6], // Martes, Jueves, Sábado
            horaInicio: "08:00",
            horaFin: "13:00",
        },
        activo: true,
    },
];

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
