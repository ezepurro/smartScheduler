import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  uid: string;
  name: string;
  isAdmin: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setAuthenticationState: (value: boolean) => void;
  setUser: (user: User) => void;
  errorMessage: string | null;
  setErrorMessage: (message: string) => void;
  onLogin: (user: User, token: string) => void;
  onLogout: () => void;
  clearErrorMessage: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // isAuthenticated
      isAuthenticated: false,
      setAuthenticationState: (value: boolean) => set({ isAuthenticated: value }),

      // user
      user: null,
      setUser: (user: User) => set({ user }),

      // errorMessage
      errorMessage: null,
      setErrorMessage: (message: string) => set({ errorMessage: message }),

      // onLogin
      onLogin: (user, token) => {
        localStorage.setItem('token', token);
        set({ isAuthenticated: true, user, errorMessage: null });
      },

      // onLogout
      onLogout: () => {
        localStorage.removeItem('token');
        set({ isAuthenticated: false, user: null, errorMessage: null });
      },

      // clearErrorMessage
      clearErrorMessage: () => {
        set({ errorMessage: null });
      },
    }),
    {
      name: 'auth-storage', 
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
