import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => {
        console.log('Token almacenado:', token);
        set({ accessToken: token });
      },
      clearAccessToken: () => {
        console.log('Token eliminado');
        set({ accessToken: null });
      },
    }),
    {
      name: 'auth-storage', // Nombre de la clave en localStorage
    }
  )
);

export default useAuthStore;