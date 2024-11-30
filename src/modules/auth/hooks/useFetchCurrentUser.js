// src/hooks/useFetchCurrentUser.js
import { useEffect, useState } from 'react';
import myAxios from '../../../api/axiosInstance'; // Ajusta el path si es necesario
import config from '../../../../config/layout'; // Ajusta el path si es necesario
import useAuthStore from '../store/useAuthStore'; // Ajusta el path si es necesario

const useFetchCurrentUser = () => {
  const { accessToken, clearAccessToken } = useAuthStore(); // Acceso al token desde el store
  const [currentUser, setCurrentUser] = useState(() => {
    // Cargar desde localStorage al iniciar
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : config.publicUser;
  });

  // Sincronizar con localStorage al cambiar currentUser
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) {
        setCurrentUser(config.publicUser);
        return;
      }

      try {
        const response = await myAxios.get('/v1/users/current');
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        clearAccessToken();
        setCurrentUser(config.publicUser);
      }
    };

    fetchUser();
  }, [accessToken, clearAccessToken]);

  return { currentUser, setCurrentUser };
};

export default useFetchCurrentUser