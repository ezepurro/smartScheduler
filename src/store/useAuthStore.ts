import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface user {
    uid: string,
    name: string,
    isAdmin: boolean
}

const useAuthStore = create(persist(
      (set) => ({
        // isAuthenticated
        isAuthenticated: false, 
        setAuthenticationState: ( value:boolean ) => set({ isAuthenticated: value }),

        // user
        user: null,
        setUser: ( value:user ) => set({ user: value }),

        // errorMessage
        errorMessage: null,
        setErrorMessage: ( value:string ) => set({ errorMessage: value }),
        

        // onLogin
        onLogin: ( user = {}, token:string ) => {
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
));


export default useAuthStore;
