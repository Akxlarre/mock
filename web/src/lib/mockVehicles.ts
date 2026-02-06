/**
 * Mock Data: Vehículos
 * Catálogo de vehículos de la escuela
 */

export interface Vehicle {
    id: number;
    patente: string;
    modelo: string;
    año: number;
    transmision: "manual" | "automatica";
    instructorAsignado?: number; // ID del instructor
    status: "disponible" | "en_uso" | "mantencion" | "bloqueado";
    ultimaRevision?: string; // Fecha última revisión técnica
}

export const VEHICULOS: Vehicle[] = [
    {
        id: 1,
        patente: "ABC-123",
        modelo: "Nissan Versa",
        año: 2022,
        transmision: "manual",
        instructorAsignado: 1, // Carlos Rojas
        status: "disponible",
        ultimaRevision: "2026-01-15",
    },
    {
        id: 2,
        patente: "XYZ-789",
        modelo: "Chevrolet Sail",
        año: 2023,
        transmision: "manual",
        instructorAsignado: 2, // Ana Martínez
        status: "disponible",
        ultimaRevision: "2026-01-20",
    },
    {
        id: 3,
        patente: "DEF-456",
        modelo: "Suzuki Swift",
        año: 2021,
        transmision: "manual",
        instructorAsignado: 3, // Luis Torres
        status: "disponible",
        ultimaRevision: "2026-01-10",
    },
    {
        id: 4,
        patente: "GHI-789",
        modelo: "Kia Rio",
        año: 2022,
        transmision: "automatica",
        instructorAsignado: 4, // Patricia Soto
        status: "disponible",
        ultimaRevision: "2026-01-25",
    },
    {
        id: 5,
        patente: "JKL-012",
        modelo: "Hyundai Accent",
        año: 2020,
        transmision: "manual",
        status: "mantencion",
        ultimaRevision: "2025-12-15",
    },
];

// Helper: Obtener vehículo por ID
export function getVehicleById(id: number): Vehicle | undefined {
    return VEHICULOS.find((v) => v.id === id);
}

// Helper: Obtener vehículo por patente
export function getVehicleByPatente(patente: string): Vehicle | undefined {
    return VEHICULOS.find((v) => v.patente === patente);
}

// Helper: Obtener vehículos disponibles
export function getAvailableVehicles(): Vehicle[] {
    return VEHICULOS.filter((v) => v.status === "disponible");
}

// Helper: Obtener vehículo asignado a instructor
export function getVehicleByInstructor(instructorId: number): Vehicle | undefined {
    return VEHICULOS.find((v) => v.instructorAsignado === instructorId);
}
