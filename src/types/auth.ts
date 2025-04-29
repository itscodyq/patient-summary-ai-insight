
export interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  role: 'admin' | 'provider' | 'staff';
  authProvider: 'microsoft' | 'local';
}
