export type Role = 'GUEST' | 'HOST' | 'BOTH';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  createdAt: string;
}
