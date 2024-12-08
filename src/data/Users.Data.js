import myAxios from '../api/axiosInstance';
import { queryOptions, useMutation } from '@tanstack/react-query';
import { alertMessage } from '../ui/messages/alerts';

// * ----------------  GETS Users List ----------------
// AXIOS
export const getUserList = async () => {
  try {
    const response = await myAxios.get(`/v1/users/associatesselective`);
    const users = response.data?.data || null;
    return users;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};

// TANSTACK QUERY
export const usersListQueryOptions = queryOptions({
  queryKey: ['usersList'],
  queryFn: () => getUserList()
})