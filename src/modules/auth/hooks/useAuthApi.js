import { useState } from "react"
import myAxios from "../../../api/axiosInstance";
import useAuthStore from "../../../store/useAuthStore";

export default function useAuthApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setAccessToken } = useAuthStore(); // Para manejar el token

  async function authenticate(option, credentials, navigate) {
    setLoading(true);
    setError(null);
    const url = option === 'login' ? '/v1/auth/login' : '/v1/auth/register';

    try {
      const response = await myAxios.post(url, credentials);
      const data = response.data;

      if (data?.isError) throw new Error(data.message);

      const token = data.data.token;
      setAccessToken(token); // Guardar el token en el store

      // Obtener y establecer el usuario actual
      getCurrentUser()

      navigate({ to: '/profile' });

      console.log(`${option === 'login' ? 'Login' : 'Register'} successful`, data.message); // <------------ Reemplazar por Notificacion

    } catch (error) {
      setError(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    setError,
    login: (credentials, navigate) => authenticate('login', credentials, navigate),
    //register: (credentials, navigate) => authenticate('register', credentials, navigate),
  }
}

export async function getCurrentUser() {
  return await myAxios.get("/v1/users/current");
}