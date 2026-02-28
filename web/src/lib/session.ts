/**
 * Sistema de Sesión Mock
 * Fuente única de verdad para rol y datos del usuario en demo
 *
 * Usa cookie demo_role para simular sesión: al entrar a un área de un rol
 * se guarda el rol y se mantiene en rutas compartidas (ej. /matricula para admin y secretaria).
 * En producción reemplazar con autenticación real (Supabase Auth, JWT, etc.).
 */

export type UserRole = "admin" | "instructor" | "secretaria" | "alumno" | "relator";

/** Nombre de la cookie que guarda el rol en demo */
export const DEMO_ROLE_COOKIE = "demo_role";

const VALID_ROLES: UserRole[] = ["admin", "instructor", "secretaria", "alumno", "relator"];

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

  // /secretaria (dashboard secretaria) pero NO /secretarias (gestión de secretarias)
  if (cleanPath === "/secretaria" || cleanPath.startsWith("/secretaria/")) return "secretaria";
  // /instructor (dashboard instructor) pero NO /instructores (gestión de instructores)
  if (cleanPath === "/instructor" || cleanPath.startsWith("/instructor/")) return "instructor";
  if (cleanPath.startsWith("/alumno") && !cleanPath.startsWith("/alumnos")) return "alumno";
  if (cleanPath === "/alumnos" || cleanPath.startsWith("/alumnos/")) return "admin";
  if (cleanPath === "/relator" || cleanPath.startsWith("/relator/")) return "relator";

  return "admin";
}

/**
 * Indica qué rol guardar en cookie al visitar esta ruta.
 * Solo rutas "exclusivas" de un rol actualizan la cookie; las compartidas no la sobrescriben.
 */
export function getRoleToSetFromPath(path: string): UserRole | null {
  const cleanPath = path.split("?")[0].replace(/\/$/, "");

  // /secretaria (dashboard secretaria) pero NO /secretarias (gestión de secretarias)
  if (cleanPath === "/secretaria" || cleanPath.startsWith("/secretaria/")) return "secretaria";
  // /instructor (dashboard instructor) pero NO /instructores (gestión de instructores)
  if (cleanPath === "/instructor" || cleanPath.startsWith("/instructor/")) return "instructor";
  if (cleanPath.startsWith("/alumno") && !cleanPath.startsWith("/alumnos")) return "alumno";
  if (cleanPath === "/relator" || cleanPath.startsWith("/relator/")) return "relator";
  // Admin: solo rutas que solo admin usa (no /matricula, /pagos, etc. que comparten con secretaria)
  if (cleanPath === "/dashboard" || cleanPath.startsWith("/dashboard/")) return "admin";
  if (cleanPath.startsWith("/usuarios")) return "admin";
  if (cleanPath.startsWith("/tareas")) return "admin";
  if (cleanPath.startsWith("/contabilidad")) return "admin";
  if (cleanPath.startsWith("/flota")) return "admin";
  // /instructores es compartida (admin/secretaria), no actualiza cookie

  return null;
}

/** Clave de localStorage para rol en demo (cuando no hay SSR/cookies) */
export const DEMO_ROLE_STORAGE_KEY = "demo_role";

/** ID de la escuela a la que pertenece cada rol mock */
const SCHOOL_BY_ROLE: Record<UserRole, string> = {
  admin: 'autoescuela-chillan',      // admin ve ambas, pero su base es Autoescuela
  instructor: 'autoescuela-chillan',
  secretaria: 'autoescuela-chillan',
  alumno: 'autoescuela-chillan',
  relator: 'conductores-chillan',    // Relatores pertenecen a la escuela Profesional
};

/**
 * Obtiene el nombre del usuario según su rol
 * En producción, esto vendría de la base de datos
 */
export function getCurrentUserName(role: UserRole): string {
  const userNames: Record<UserRole, string> = {
    admin: 'Jorge Administrador',
    instructor: 'Carlos Rojas',
    secretaria: 'Patricia Secretaria',
    alumno: 'María González',
    relator: 'Francisco Herrera'
  };
  
  return userNames[role];
}

/**
 * Obtiene el email del usuario según su rol
 * Política: se devuelve el correo institucional (alias) para display en UI.
 * El correo personal queda solo en logs de auditoría.
 * Mock data - en producción vendría de la sesión.
 */
export function getCurrentUserEmail(role: UserRole): string {
  const emails: Record<UserRole, string> = {
    admin: 'jadmin@autoescuela-chillan.cl',
    instructor: 'crojas@autoescuela-chillan.cl',
    secretaria: 'psecretaria@autoescuela-chillan.cl',   // alias institucional
    alumno: 'mgonzalez@email.cl',
    relator: 'fherrera@conductores-chillan.cl'
  };

  return emails[role];
}

/**
 * Obtiene el nombre de la escuela actual
 * En producción con multi-tenancy, esto vendría de la sesión/contexto
 */
export function getCurrentSchoolName(): string {
  return 'Autoescuela Chillán';
}

/**
 * Hook completo de sesión mock - devuelve todos los datos del usuario
 */
export interface UserSession {
  role: UserRole;
  name: string;
  email: string;
  school: string;
  /** ID de la escuela base del usuario */
  schoolId: string;
  /**
   * true → puede cambiar entre escuelas (admin siempre; secretaria si el admin
   * le otorgó permiso de acceso cruzado).
   */
  hasMultiSchoolAccess: boolean;
}

export function getCurrentSession(path: string, cookies?: CookieReader): UserSession {
  const role = getCurrentUserRole(path, cookies);
  const schoolId = SCHOOL_BY_ROLE[role] ?? 'autoescuela-chillan';

  return {
    role,
    name: getCurrentUserName(role),
    email: getCurrentUserEmail(role),
    school: getCurrentSchoolName(),
    schoolId,
    hasMultiSchoolAccess: role === 'admin',
  };
}
