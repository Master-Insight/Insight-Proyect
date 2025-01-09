import myAxios from '../api/axiosInstance';
import { queryOptions, useMutation } from '@tanstack/react-query';
import { alertMessage } from '../ui/messages/alerts';

// * ----------------  GETS Services List ----------------
// AXIOS
export const getServices = async () => {
  try {
    const response = await myAxios.get(`/v1/services/`);
    const services = response.data?.data || null;
    return services;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};

// TANSTACK QUERY
export const servicesListQueryOptions = queryOptions({
  queryKey: ['services'],
  queryFn: () => getServices()
})


// * ----------------  GET ONE Service bi Id ----------------

// AXIOS
export const getServiceById = async (sId) => {
  try {
    const response = await myAxios.get(`/v1/services/${sId}`);
    const service = response.data?.data || null;
    return service;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};

// TANSTACK QUERY
export const serviceByIdQueryOptions = (serviceId) => {
  return queryOptions({
    queryKey: ['service', { serviceId }],
    queryFn: () => getServiceById(serviceId)
  })
}