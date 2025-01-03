import axios from 'axios';
import useAuthStore from '../modules/auth/store/useAuthStore';

const myAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 1000 * 10, // Tiempo de espera máximo de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el Bearer Token si está disponible
myAxios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) { config.headers.Authorization = `Bearer ${token}`; }

  return config;
}, (error) => {
  console.error('Error en el interceptor de request:', error);
  return Promise.reject(error);
});

// Interceptor de respuestas
myAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log("Error interceptor");
    // console.log(error);

    if (error.response && error.response.status === 401) {
      // Redirige al login si no está autenticado
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default myAxios;
