import { useEffect, useState } from 'react';
import myAxios from '../../../api/axiosInstance'; // Ajusta el path si es necesario
import config from '../../../../config/layout'; // Ajusta el path si es necesario
import useAuthStore from '../store/useAuthStore'; // Ajusta el path si es necesario

const useFetchCurrentUser = () => {
  const { accessToken, clearAccessToken } = useAuthStore();
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : config.publicUser;
  });
  const [isLoading, setIsLoading] = useState(true); // Agrega un estado de carga

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) {
        setCurrentUser(config.publicUser);
        setIsLoading(false);
        return;
      }

      try {
        const response = await myAxios.get('/v1/users/current');
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        clearAccessToken();
        setCurrentUser(config.publicUser);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [accessToken, clearAccessToken]);

  return { currentUser, setCurrentUser, isLoading };
};


export default useFetchCurrentUser