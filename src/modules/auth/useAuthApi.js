import { useState } from "react"
//import { useAppStore } from "../../../store/useAppStore";
import axiosInstance from "../../api/axiosInstance";

export default function useAuthApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //const { login: signIn, getUser } = useAppStore();
  function signIn () {}
  function getUser () {}

  async function authenticate(option, credentials, navigate) {
    setLoading(true);
    setError(null);
    const url = option === 'login' ? '/v1/auth/login' : '/v1/auth/register';

    try {
      const response = await axiosInstance.post(url, credentials);
      const data = response.data;

      if (data?.isError) throw new Error(data.message);

      const token = data.data.token;
      await signIn(token);
      await getUser()
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
    register: (credentials, navigate) => authenticate('register', credentials, navigate),
  }
}
