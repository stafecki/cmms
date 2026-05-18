export type UserRole = 'ADMIN' | 'MANAGER' | 'WAREHOUSE' | 'OPERATOR' | 'TECHNICIAN';
export type CertificationType = 'SEP' | 'FORKLIFT' | 'UDS' | 'CRANE' | 'FIRST_AID' | 'SAFETY';

export interface Certification {
  id: string;
  userId: string;
  type: CertificationType;
  issuedAt: string;
  expiresAt: string;
  isValid: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export interface PaginatedUsers {
  data: User[];
  total: number;
  limit: number;
  offset: number;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}

export interface UpdateUserInput {
  name?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface CreateCertificationInput {
  type: CertificationType;
  issuedAt: string;
  expiresAt: string;
}