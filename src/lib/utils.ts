
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuid } from "uuid"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a unique ID
 */
export function nanoid(): string {
  return uuid().replace(/-/g, '');
}

/**
 * Re-export uuid v4 for compatibility
 */
export const v4 = uuid;

/**
 * Verifica se o usuário está autenticado usando múltiplos métodos
 */
export function verifyAuthentication(): boolean {
  // Verificação primária usando localStorage e sessionStorage
  const localAuth = localStorage.getItem('isAuthenticated') === 'true';
  const sessionAuth = sessionStorage.getItem('isAuthenticated') === 'true';
  
  // Verificação secundária usando token e objeto do usuário
  const hasToken = localStorage.getItem('supabase.auth.token') !== null;
  const hasUser = localStorage.getItem('user') !== null;
  
  // Requer pelo menos um método de validação
  return localAuth || sessionAuth || hasToken || hasUser;
}

/**
 * Limpa todos os dados de autenticação do armazenamento local
 */
export function clearAuthData(): void {
  localStorage.removeItem('isAuthenticated');
  sessionStorage.removeItem('isAuthenticated');
  localStorage.removeItem('user');
  localStorage.removeItem('supabase.auth.token');
}
