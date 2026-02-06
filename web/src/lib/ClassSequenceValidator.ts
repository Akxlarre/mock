/**
 * Validador de Secuencia de Clases
 * Reglas de negocio para agendamiento según RF-014, RF-015, RF-017
 */

import type { Booking } from "./mockBookings";
import { getPendingBookings, getNextClassNumber } from "./mockBookings";
import { validate24HourAdvance } from "./mockAvailability";

export interface ValidationResult {
    isValid: boolean;
    error?: string;
    warning?: string;
}

/**
 * RF-014: Validar que el alumno puede agendar la siguiente clase en secuencia
 * Regla: No puede agendar clase 5 si no ha completado clase 4
 */
export function validateClassSequence(
    studentBookings: Booking[],
    requestedClassNumber: number
): ValidationResult {
    const nextAllowed = getNextClassNumber(
        studentBookings[0]?.studentId || 0
    );

    if (requestedClassNumber !== nextAllowed) {
        return {
            isValid: false,
            error: `Debes completar la clase ${nextAllowed - 1} antes de agendar la clase ${requestedClassNumber}`,
        };
    }

    if (requestedClassNumber > 12) {
        return {
            isValid: false,
            error: "Ya has completado las 12 clases del curso",
        };
    }

    return { isValid: true };
}

/**
 * Validar anticipación mínima de 24 horas
 * Regla: No puede agendar clases con menos de 24 horas de anticipación
 */
export function validate24HourAdvanceBooking(
    bookingDate: string,
    bookingTime: string
): ValidationResult {
    if (!validate24HourAdvance(bookingDate, bookingTime)) {
        return {
            isValid: false,
            error: "Debes agendar con al menos 24 horas de anticipación",
        };
    }

    return { isValid: true };
}

/**
 * Validar máximo 3 clases pendientes simultáneamente
 * Regla: No puede tener más de 3 clases agendadas (no confirmadas aún)
 */
export function validateMaxPendingClasses(
    studentId: number
): ValidationResult {
    const pending = getPendingBookings(studentId);

    if (pending.length >= 3) {
        return {
            isValid: false,
            error: "Ya tienes 3 clases agendadas. Completa o cancela una clase antes de agendar otra",
        };
    }

    if (pending.length === 2) {
        return {
            isValid: true,
            warning: "Esta será tu última clase disponible para agendar (máximo 3)",
        };
    }

    return { isValid: true };
}

/**
 * Validar que no haya 2 clases el mismo día
 * Regla: No puede agendar 2 clases en el mismo día
 */
export function validateNoDuplicateDay(
    studentBookings: Booking[],
    newBookingDate: string
): ValidationResult {
    const hasClassThatDay = studentBookings.some(
        (b) => b.bookingDate === newBookingDate && b.status === "scheduled"
    );

    if (hasClassThatDay) {
        return {
            isValid: false,
            error: "Ya tienes una clase agendada para este día",
        };
    }

    return { isValid: true };
}

/**
 * Validar disponibilidad de instructor en horario específico
 */
export function validateInstructorAvailability(
    instructorId: number,
    bookingDate: string,
    bookingTime: string,
    allBookings: Booking[]
): ValidationResult {
    const isBooked = allBookings.some(
        (b) =>
            b.instructorId === instructorId &&
            b.bookingDate === bookingDate &&
            b.startTime === bookingTime &&
            b.status === "scheduled"
    );

    if (isBooked) {
        return {
            isValid: false,
            error: "Este instructor no está disponible en este horario",
        };
    }

    return { isValid: true };
}

/**
 * Validación completa para crear una nueva reserva
 */
export function validateNewBooking(
    studentId: number,
    studentBookings: Booking[],
    allBookings: Booking[],
    requestedClassNumber: number,
    bookingDate: string,
    bookingTime: string,
    instructorId: number
): ValidationResult {
    // 1. Validar secuencia de clases
    const sequenceValidation = validateClassSequence(
        studentBookings,
        requestedClassNumber
    );
    if (!sequenceValidation.isValid) return sequenceValidation;

    // 2. Validar anticipación de 24 horas
    const advanceValidation = validate24HourAdvanceBooking(
        bookingDate,
        bookingTime
    );
    if (!advanceValidation.isValid) return advanceValidation;

    // 3. Validar máximo 3 pendientes
    const pendingValidation = validateMaxPendingClasses(studentId);
    if (!pendingValidation.isValid) return pendingValidation;

    // 4. Validar no 2 clases el mismo día
    const duplicateDayValidation = validateNoDuplicateDay(
        studentBookings,
        bookingDate
    );
    if (!duplicateDayValidation.isValid) return duplicateDayValidation;

    // 5. Validar disponibilidad de instructor
    const instructorValidation = validateInstructorAvailability(
        instructorId,
        bookingDate,
        bookingTime,
        allBookings
    );
    if (!instructorValidation.isValid) return instructorValidation;

    // Retornar warnings si existen
    if (pendingValidation.warning) {
        return {
            isValid: true,
            warning: pendingValidation.warning,
        };
    }

    return { isValid: true };
}

/**
 * RF-015: Validar cancelación según política de 24 horas
 */
export function validateCancellation(
    booking: Booking
): ValidationResult & { countsAsTaken: boolean } {
    const now = new Date();
    const bookingDateTime = new Date(
        `${booking.bookingDate}T${booking.startTime}`
    );
    const hoursUntil =
        (bookingDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntil < 24) {
        return {
            isValid: true,
            countsAsTaken: true,
            warning:
                "⚠️ Al cancelar con menos de 24 horas de anticipación, esta clase contará como tomada (1 de 12)",
        };
    }

    return {
        isValid: true,
        countsAsTaken: false,
    };
}

/**
 * RF-017: Validar reagendamiento
 */
export function validateRescheduling(booking: Booking): ValidationResult {
    const now = new Date();
    const bookingDateTime = new Date(
        `${booking.bookingDate}T${booking.startTime}`
    );
    const hoursUntil =
        (bookingDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntil < 24) {
        return {
            isValid: false,
            error: "Solo puedes reagendar clases con más de 24 horas de anticipación",
        };
    }

    return { isValid: true };
}
