/**
 * Mock Data: Disponibilidad de Horarios
 * Horarios de funcionamiento y bloques disponibles según RF-014
 */

import type { Instructor } from "./mockInstructors";
import { isInstructorAvailable } from "./mockBookings";

// Horarios de funcionamiento de la escuela
export const HORARIOS_FUNCIONAMIENTO = {
    lunesViernes: {
        inicio: "08:00",
        fin: "20:00",
    },
    sabado: {
        inicio: "08:00",
        fin: "13:00",
    },
    domingo: {
        cerrado: true,
    },
};

// Generar bloques horarios de 1 hora
export function generateTimeBlocks(
    startTime: string,
    endTime: string
): string[] {
    const blocks: string[] = [];
    const [startHour] = startTime.split(":").map(Number);
    const [endHour] = endTime.split(":").map(Number);

    for (let hour = startHour; hour < endHour; hour++) {
        blocks.push(`${hour.toString().padStart(2, "0")}:00`);
    }

    return blocks;
}

// Obtener bloques disponibles para un día específico
export function getAvailableBlocksForDay(dayOfWeek: number): string[] {
    // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    if (dayOfWeek === 0) {
        return []; // Domingo cerrado
    }

    if (dayOfWeek === 6) {
        // Sábado: 8:00 - 13:00
        return generateTimeBlocks(
            HORARIOS_FUNCIONAMIENTO.sabado.inicio,
            HORARIOS_FUNCIONAMIENTO.sabado.fin
        );
    }

    // Lunes a Viernes: 8:00 - 20:00
    return generateTimeBlocks(
        HORARIOS_FUNCIONAMIENTO.lunesViernes.inicio,
        HORARIOS_FUNCIONAMIENTO.lunesViernes.fin
    );
}

// Verificar si un día está dentro del horario de funcionamiento
export function isSchoolOpen(date: Date): boolean {
    const dayOfWeek = date.getDay();
    return dayOfWeek !== 0; // Cerrado domingos
}

// Obtener bloques disponibles para un instructor en una fecha específica
export function getInstructorAvailableBlocks(
    instructor: Instructor,
    date: Date
): string[] {
    const dayOfWeek = date.getDay();

    // Verificar si el instructor trabaja ese día
    if (!instructor.disponibilidad.dias.includes(dayOfWeek)) {
        return [];
    }

    // Obtener bloques del día
    const dayBlocks = getAvailableBlocksForDay(dayOfWeek);

    // Filtrar por disponibilidad del instructor
    const instructorBlocks = generateTimeBlocks(
        instructor.disponibilidad.horaInicio,
        instructor.disponibilidad.horaFin
    );

    // Intersección: solo bloques que estén en ambos
    const availableBlocks = dayBlocks.filter((block) =>
        instructorBlocks.includes(block)
    );

    // Filtrar bloques ya ocupados
    const dateStr = date.toISOString().split("T")[0];
    return availableBlocks.filter((time) =>
        isInstructorAvailable(instructor.id, dateStr, time)
    );
}

// Obtener todos los bloques del día con estado
export interface TimeBlockStatus {
    time: string;
    available: boolean;
    instructorId?: number;
    bookingId?: number;
}

export function getDayBlocksWithStatus(
    date: Date,
    instructorId?: number
): TimeBlockStatus[] {
    const dayOfWeek = date.getDay();
    const blocks = getAvailableBlocksForDay(dayOfWeek);
    const dateStr = date.toISOString().split("T")[0];

    return blocks.map((time) => ({
        time,
        available: instructorId
            ? isInstructorAvailable(instructorId, dateStr, time)
            : true,
    }));
}

// Validar que la fecha/hora cumple con anticipación mínima de 24 horas
export function validate24HourAdvance(
    bookingDate: string,
    bookingTime: string
): boolean {
    const now = new Date();
    const booking = new Date(`${bookingDate}T${bookingTime}`);
    const hoursUntil = (booking.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntil >= 24;
}

// Validar que la fecha es en el futuro
export function isDateInFuture(bookingDate: string): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const booking = new Date(bookingDate);
    return booking >= today;
}
