import Cookies from 'js-cookie';
import { PaginatedUsers, CreateUserInput, UpdateUserInput, User, Certification, CreateCertificationInput } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const getAuthHeaders = () => {
  const token = Cookies.get('accessToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

// Uniwersalny parser błędów dla API (wyłapuje błędy autoryzacji oraz błędy walidacji Zod z Hono)
const handleApiError = async (res: Response, defaultMessage: string) => {
  const errorData = await res.json().catch(() => null);

  if (errorData?.error?.issues) {
    const issues = errorData.error.issues.map((i: any) => i.message).join(' | ');
    throw new Error(`Błąd walidacji: ${issues}`);
  }

  throw new Error(errorData?.message || defaultMessage);
};

export const fetchUsers = async (limit = 50, offset = 0): Promise<PaginatedUsers> => {
  const res = await fetch(`${API_URL}/users?limit=${limit}&offset=${offset}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) await handleApiError(res, 'Nie udało się pobrać użytkowników');
  return res.json();
};

export const createUser = async (data: CreateUserInput): Promise<User> => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) await handleApiError(res, 'Nie udało się utworzyć użytkownika.');
  return res.json();
};

export const updateUser = async (id: string, data: UpdateUserInput): Promise<User> => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) await handleApiError(res, 'Nie udało się zaktualizować użytkownika.');
  return res.json();
};

export const fetchUserById = async (id: string): Promise<User> => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'GET',
    headers: getAuthHeaders()
  });
  if (!res.ok) await handleApiError(res, 'Nie udało się pobrać szczegółów użytkownika.');
  return res.json();
};

export const deleteUser = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) await handleApiError(res, 'Nie udało się dezaktywować użytkownika.');
};

export const fetchCertifications = async (userId: string): Promise<Certification[]> => {
  const res = await fetch(`${API_URL}/users/${userId}/certifications`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) await handleApiError(res, 'Nie udało się pobrać certyfikatów');
  return res.json();
};

export const addCertification = async (userId: string, data: CreateCertificationInput): Promise<Certification> => {
  const res = await fetch(`${API_URL}/users/${userId}/certifications`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) await handleApiError(res, 'Nie udało się dodać certyfikatu');
  return res.json();
};

export const removeCertification = async (userId: string, certId: string): Promise<void> => {
  const res = await fetch(`${API_URL}/users/${userId}/certifications/${certId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) await handleApiError(res, 'Nie udało się usunąć certyfikatu');
};