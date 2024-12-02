import { useState } from "react"
import myAxios from "../../../api/axiosInstance";
import useAuthStore from "../store/useAuthStore";
import { alertMessage } from "../../../ui/messages/alerts";
import config from "../../../../config/layout";

export default function useAuthApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setAccessToken, clearAccessToken } = useAuthStore(); // Para manejar el token

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
      await getCurrentUser()
      
      //console.log(`${option === 'login' ? 'Login' : 'Register'} successful`, data.message);
      alertMessage(`${option === 'login' ? 'Login' : 'Register'} exitoso`, "success", 2);
      
    } catch (error) {
      setError(error.response?.data?.message || 'Authentication failed');
    } finally {
      navigate({ to: config.path.login });
      setLoading(false);
    }
  }

  async function logout(navigate) {
    setLoading(true);
    setError(null);

    try {
      // Navegar al login o página pública
      navigate({ to: config.path.private });

      // Limpiar token y usuario
      clearAccessToken();

    } catch (error) {
      setError("Failed to logout");
      console.error("Logout error:", error);
    } finally {
      alertMessage("Cierre de sesión exitoso", "warning", 2);
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    setError,
    login: (credentials, navigate) => authenticate('login', credentials, navigate),
    register: (credentials, navigate) => authenticate('register', credentials, navigate),
    logout,
  }
}

export async function getCurrentUser() {
  return await myAxios.get("/v1/users/current");
}