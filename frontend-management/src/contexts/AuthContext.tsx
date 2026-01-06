import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  publicEmail?: string;
  role: 'ADMIN' | 'EDITOR' | 'WRITER';
  avatar?: string;
  bio?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  dribbble?: string;
  linkedin?: string;
  isTeamMember?: boolean;
  teamRole?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session and refresh from server
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // Refresh user data from server
          const freshUser = await api.get(`/users/${parsedUser.id}`);
          const updatedUser = {
            ...freshUser,
            name: freshUser.displayName || `${freshUser.firstName} ${freshUser.lastName}`,
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
        } catch {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    
    if (response.token && response.user) {
      const userData = {
        ...response.user,
        name: response.user.displayName || response.user.name || `${response.user.firstName} ${response.user.lastName}`,
      };
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } else {
      throw new Error('Invalid response from server');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const refreshUser = async () => {
    if (user) {
      try {
        const freshUser = await api.get(`/users/${user.id}`);
        const updatedUser = {
          ...freshUser,
          name: freshUser.displayName || `${freshUser.firstName} ${freshUser.lastName}`,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch (err) {
        console.error('Failed to refresh user:', err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
