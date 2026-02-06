/**
 * Mock Data: Reservas de Clases Individuales
 * Sistema de agendamiento clase por clase (RF-014)
 */

export interface Booking {
    id: number;
    studentId: number;
    studentName: string;
    instructorId: number;
    instructorName: string;
    vehicleId: number;
    vehiclePatente: string;
    bookingDate: string; // YYYY-MM-DD
    startTime: string; // HH:MM
    endTime: string; // HH:MM
    classNumber: number; // 1 a 12 (secuencia obligatoria)
    status: "scheduled" | "completed" | "cancelled" | "no_show";
    countsAsTaken: boolean; // Si canceló con <24hrs o no asistió
    createdAt: string;
    cancelledAt?: string;
    completedAt?: string;
}

// Mock de clases agendadas para diferentes alumnos
export const BOOKINGS: Booking[] = [
    // Alumno 1: María González (completó 3 clases, tiene 2 agendadas)
    {
        id: 1,
        studentId: 1,
        studentName: "María González",
        instructorId: 1,
        instructorName: "Carlos Rojas",
        vehicleId: 1,
        vehiclePatente: "ABC-123",
        bookingDate: "2026-01-15",
        startTime: "09:00",
        endTime: "10:00",
        classNumber: 1,
        status: "completed",
        countsAsTaken: true,
        createdAt: "2026-01-10T10:00:00",
        completedAt: "2026-01-15T10:00:00",
    },
    {
        id: 2,
        studentId: 1,
        studentName: "María González",
        instructorId: 1,
        instructorName: "Carlos Rojas",
        vehicleId: 1,
        vehiclePatente: "ABC-123",
        bookingDate: "2026-01-22",
        startTime: "09:00",
        endTime: "10:00",
        classNumber: 2,
        status: "completed",
        countsAsTaken: true,
        createdAt: "2026-01-16T14:00:00",
        completedAt: "2026-01-22T10:00:00",
    },
    {
        id: 3,
        studentId: 1,
        studentName: "María González",
        instructorId: 1,
        instructorName: "Carlos Rojas",
        vehicleId: 1,
        vehiclePatente: "ABC-123",
        bookingDate: "2026-01-29",
        startTime: "09:00",
        endTime: "10:00",
        classNumber: 3,
        status: "completed",
        countsAsTaken: true,
        createdAt: "2026-01-23T11:00:00",
        completedAt: "2026-01-29T10:00:00",
    },
    {
        id: 4,
        studentId: 1,
        studentName: "María González",
        instructorId: 1,
        instructorName: "Carlos Rojas",
        vehicleId: 1,
        vehiclePatente: "ABC-123",
        bookingDate: "2026-02-07",
        startTime: "09:00",
        endTime: "10:00",
        classNumber: 4,
        status: "scheduled",
        countsAsTaken: false,
        createdAt: "2026-01-30T09:00:00",
    },
    {
        id: 5,
        studentId: 1,
        studentName: "María González",
        instructorId: 2,
        instructorName: "Ana Martínez",
        vehicleId: 2,
        vehiclePatente: "XYZ-789",
        bookingDate: "2026-02-14",
        startTime: "14:00",
        endTime: "15:00",
        classNumber: 5,
        status: "scheduled",
        countsAsTaken: false,
        createdAt: "2026-02-01T16:00:00",
    },

    // Alumno 2: Juan Pérez (tiene 1 completada, 1 agendada, 1 cancelada tarde)
    {
        id: 6,
        studentId: 2,
        studentName: "Juan Pérez",
        instructorId: 2,
        instructorName: "Ana Martínez",
        vehicleId: 2,
        vehiclePatente: "XYZ-789",
        bookingDate: "2026-01-20",
        startTime: "10:00",
        endTime: "11:00",
        classNumber: 1,
        status: "completed",
        countsAsTaken: true,
        createdAt: "2026-01-12T14:00:00",
        completedAt: "2026-01-20T11:00:00",
    },
    {
        id: 7,
        studentId: 2,
        studentName: "Juan Pérez",
        instructorId: 2,
        instructorName: "Ana Martínez",
        vehicleId: 2,
        vehiclePatente: "XYZ-789",
        bookingDate: "2026-01-27",
        startTime: "10:00",
        endTime: "11:00",
        classNumber: 2,
        status: "cancelled",
        countsAsTaken: true, // Canceló con <24hrs
        createdAt: "2026-01-21T10:00:00",
        cancelledAt: "2026-01-27T08:00:00", // Canceló 2 hrs antes
    },
    {
        id: 8,
        studentId: 2,
        studentName: "Juan Pérez",
        instructorId: 3,
        instructorName: "Luis Torres",
        vehicleId: 3,
        vehiclePatente: "DEF-456",
        bookingDate: "2026-02-10",
        startTime: "16:00",
        endTime: "17:00",
        classNumber: 3,
        status: "scheduled",
        countsAsTaken: false,
        createdAt: "2026-02-03T12:00:00",
    },

    // Alumno 3: Sofía Vargas (clase en curso hoy)
    {
        id: 9,
        studentId: 3,
        studentName: "Sofía Vargas",
        instructorId: 1,
        instructorName: "Carlos Rojas",
        vehicleId: 1,
        vehiclePatente: "ABC-123",
        bookingDate: "2026-02-05",
        startTime: "12:00",
        endTime: "13:00",
        classNumber: 1,
        status: "scheduled", // En curso
        countsAsTaken: false,
        createdAt: "2026-01-28T15:00:00",
    },
];

// Helpers

export function getBookingsByStudent(studentId: number): Booking[] {
    return BOOKINGS.filter((b) => b.studentId === studentId).sort(
        (a, b) => a.classNumber - b.classNumber
    );
}

export function getCompletedClassCount(studentId: number): number {
    return BOOKINGS.filter(
        (b) => b.studentId === studentId && b.status === "completed"
    ).length;
}

export function getPendingBookings(studentId: number): Booking[] {
    return BOOKINGS.filter(
        (b) => b.studentId === studentId && b.status === "scheduled"
    );
}

export function getNextClassNumber(studentId: number): number {
    const completed = getCompletedClassCount(studentId);
    const takenButNotCompleted = BOOKINGS.filter(
        (b) =>
            b.studentId === studentId &&
            b.countsAsTaken &&
            b.status !== "completed"
    ).length;
    return completed + takenButNotCompleted + 1;
}

export function getBookingsByDate(date: string): Booking[] {
    return BOOKINGS.filter((b) => b.bookingDate === date);
}

export function getBookingsByInstructor(
    instructorId: number,
    date?: string
): Booking[] {
    let bookings = BOOKINGS.filter((b) => b.instructorId === instructorId);
    if (date) {
        bookings = bookings.filter((b) => b.bookingDate === date);
    }
    return bookings;
}

// Validar si instructor está disponible en un horario específico
export function isInstructorAvailable(
    instructorId: number,
    date: string,
    time: string
): boolean {
    return !BOOKINGS.some(
        (b) =>
            b.instructorId === instructorId &&
            b.bookingDate === date &&
            b.startTime === time &&
            b.status === "scheduled"
    );
}
