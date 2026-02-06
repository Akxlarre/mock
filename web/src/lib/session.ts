/**
 * Sistema de Sesión Mock
 * Fuente única de verdad para rol y datos del usuario en demo
 *
 * Usa cookie demo_role para simular sesión: al entrar a un área de un rol
 * se guarda el rol y se mantiene en rutas compartidas (ej. /matricula para admin y secretaria).
 * En producción reemplazar con autenticación real (Supabase Auth, JWT, etc.).
 */

export type UserRole = "admin" | "instructor" | "secretaria" | "alumno";

/** Nombre de la cookie que guarda el rol en demo */
export const DEMO_ROLE_COOKIE = "demo_role";

const VALID_ROLES: UserRole[] = ["admin", "instructor", "secretaria", "alumno"];

/**
 * Interfaz mínima para leer cookies (evita acoplar lib a Astro).
 * En layout: getCookie: (name) => Astro.cookies.get(name)?.value
 */
export interface CookieReader {
  getCookie(name: string): string | undefined;
}

/**
 * Detecta el rol del usuario: primero por cookie (sesión demo), luego por ruta.
 */
export function getCurrentUserRole(path: string, cookies?: CookieReader): UserRole {
  const fromCookie = cookies?.getCookie(DEMO_ROLE_COOKIE);
  if (fromCookie && VALID_ROLES.includes(fromCookie as UserRole)) {
    return fromCookie as UserRole;
  }

  // Fallback: inferir por ruta
  const cleanPath = path.split("?")[0].replace(/\/$/, "");

  if (cleanPath.startsWith("/secretaria")) return "secretaria";
  if (cleanPath.startsWith("/instructor")) return "instructor";
  if (cleanPath.startsWith("/alumno") && !cleanPath.startsWith("/alumnos")) return "alumno";
  if (cleanPath === "/alumnos" || cleanPath.startsWith("/alumnos/")) return "admin";

  return "admin";
}

/**
 * Indica qué rol guardar en cookie al visitar esta ruta.
 * Solo rutas "exclusivas" de un rol actualizan la cookie; las compartidas no la sobrescriben.
 */
export function getRoleToSetFromPath(path: string): UserRole | null {
  const cleanPath = path.split("?")[0].replace(/\/$/, "");

  if (cleanPath.startsWith("/secretaria")) return "secretaria";
  if (cleanPath.startsWith("/instructor")) return "instructor";
  if (cleanPath.startsWith("/alumno") && !cleanPath.startsWith("/alumnos")) return "alumno";
  // Admin: solo rutas que solo admin usa (no /matricula, /pagos, etc. que comparten con secretaria)
  if (cleanPath === "/dashboard" || cleanPath.startsWith("/dashboard/")) return "admin";
  if (cleanPath.startsWith("/usuarios")) return "admin";
  if (cleanPath.startsWith("/tareas")) return "admin";
  if (cleanPath.startsWith("/contabilidad")) return "admin";
  if (cleanPath.startsWith("/flota")) return "admin";

  return null;
}

/** Clave de localStorage para rol en demo (cuando no hay SSR/cookies) */
export const DEMO_ROLE_STORAGE_KEY = "demo_role";

/**
 * Obtiene el nombre del usuario según su rol
 * En producción, esto vendría de la base de datos
 */
export function getCurrentUserName(role: UserRole): string {
  const userNames: Record<UserRole, string> = {
    admin: 'Jorge Administrador',
    instructor: 'Carlos Rojas',
    secretaria: 'Patricia Secretaria',
    alumno: 'María González'
  };
  
  return userNames[role];
}

/**
 * Obtiene el email del usuario según su rol
 * Mock data - en producción vendría de la sesión
 */
export function getCurrentUserEmail(role: UserRole): string {
  const emails: Record<UserRole, string> = {
    admin: 'jadministrador@escuela.cl',
    instructor: 'crojas@escuela.cl',
    secretaria: 'psecretaria@escuela.cl',
    alumno: 'mgonzalez@email.cl'
  };
  
  return emails[role];
}

/**
 * Obtiene el nombre de la escuela actual
 * En producción con multi-tenancy, esto vendría de la sesión/contexto
 */
export function getCurrentSchoolName(): string {
  return 'Conductores Chillán';
}

/**
 * Hook completo de sesión mock - devuelve todos los datos del usuario
 */
export interface UserSession {
  role: UserRole;
  name: string;
  email: string;
  school: string;
}

export function getCurrentSession(path: string, cookies?: CookieReader): UserSession {
  const role = getCurrentUserRole(path, cookies);

  return {
    role,
    name: getCurrentUserName(role),
    email: getCurrentUserEmail(role),
    school: getCurrentSchoolName(),
  };
}
