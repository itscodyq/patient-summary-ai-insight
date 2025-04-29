
import { User } from '@/types/auth';

// Authentication state
let currentUser: User | null = null;
let isInitialized = false;

// Initialize authentication service
export const initializeAuth = async (): Promise<boolean> => {
  try {
    console.log('Initializing authentication service');
    isInitialized = true;
    
    // Check if there's a stored session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to initialize authentication service:', error);
    return false;
  }
};

// Start Microsoft/Azure SSO login flow
export const loginWithMicrosoftSSO = async (): Promise<User | null> => {
  if (!isInitialized) {
    throw new Error('Authentication service not initialized');
  }
  
  // In a real implementation, this would redirect to Microsoft login
  // For demo purposes, simulate a successful login
  return new Promise((resolve) => {
    setTimeout(() => {
      const user: User = {
        id: 'azure-user-123',
        displayName: 'Dr. Jane Smith',
        email: 'jsmith@healthcare.org',
        photoURL: null,
        role: 'provider',
        authProvider: 'microsoft'
      };
      
      currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      resolve(user);
    }, 1000);
  });
};

// Logout the current user
export const logout = async (): Promise<void> => {
  currentUser = null;
  localStorage.removeItem('currentUser');
};

// Get the current authenticated user
export const getCurrentUser = (): User | null => {
  return currentUser;
};

// Check if a user is authenticated
export const isAuthenticated = (): boolean => {
  return currentUser !== null;
};

// Check if the user has a specific role
export const hasRole = (role: string): boolean => {
  return currentUser?.role === role;
};
