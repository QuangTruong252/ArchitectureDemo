export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}