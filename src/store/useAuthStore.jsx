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

// const createAuthSlice = (set, get) => ({

//   token: null,

//   setToken: (token) => set({ token }),

//   isTokenExpired: () => {
//     const token = get().token
//     if (!token) return true

//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]))
//       return payload.exp * 1000 < Date.now()
//     } catch (error) {
//       console.error('Error checking token expiration:', error)
//       return true
//     }
//   },

//   clearToken: () => set({ token: null }),
// })

// export default createAuthSlice