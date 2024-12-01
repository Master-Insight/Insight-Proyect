import myAxios from '../api/axiosInstance';
import { queryOptions, useMutation } from '@tanstack/react-query';
import { alertMessage } from '../ui/messages/alerts';

// * ----------------  GETS Projects  ----------------

// AXIOS
export const getProjects = async () => {
  try {
    const response = await myAxios.get(`/v1/projects`);
    const projects = response.data?.data || null;
    return projects;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};

// TANSTACK QUERY
export const projectsQueryOptions = queryOptions({
  queryKey: ['projects'],
  queryFn: () => getProjects()
})

// * ---------------- POST Project ----------------

// AXIOS
export const postProject = async (newProject) => {
  try {
    const response = await myAxios.post(`/v1/projects`, newProject);
    return response.data?.data || null;
  } catch (error) {
    throw new Response('Error al crear el proyecto', {
      status: 500,
      statusText: error.message,
    });
  }
};

// TANSTACK QUERY
export const usePostProjectMutation = (queryClient) => {
  return useMutation({
    mutationFn: postProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      alertMessage('Proyecto creado con éxito', 'success', 2);
    },
    onError: (error) => {
      console.error('Error al crear el proyecto:', error);
      alertMessage('Error: ' + error.message, 'error', 2);
    },
  });
};
//usar asi --> const postMutation = usePostProjectMutation(queryClient);  --> await postMutation.mutateAsync(value);

// * ---------------- UPDATE Project ----------------
// AXIOS
export const updateProjectById = async ({ pId, data }) => {
  try {
    const response = await myAxios.put(`/v1/projects/id/${pId}`, data);
    const projects = response.data?.data || null;
    return projects;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};

// TANSTACK QUERY
export const useUpdateProjectMutation = (queryClient) => {
  return useMutation({
    mutationFn: updateProjectById,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      alertMessage('Proyecto actualizado con éxito', 'success', 2);
    },
    onError: (error) => {
      console.error('Error al actualizar el proyecto:', error);
      alertMessage('Error: ' + error.message, 'error', 2);
    },
  });
};

// * ---------------- DELETE Project ----------------
// AXIOS
export const deleteProjectById = async (pId) => {
  try {
    const response = await myAxios.delete(`/v1/projects/id/${pId}`);
    const projects = response.data?.data || null;
    return projects;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};

// TANSTACK QUERY
export const useDeleteProjectMutation = (queryClient) => {
  return useMutation({
    mutationFn: deleteProjectById,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      alertMessage('Proyecto eliminado con éxito', 'success', 2);
    },
    onError: (error) => {
      console.error('Error al eliminar el proyecto:', error);
      alertMessage('Error: ' + error.message, 'error', 2);
    },
  });
};

// * ----------------  GET ONE Project bi Id ----------------

// AXIOS
export const getProjectById = async (pId) => {
  try {
    const response = await myAxios.get(`/v1/projects/id/${pId}`);
    const projects = response.data?.data || null;
    return projects;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};

// TANSTACK QUERY
export const projectByIdQueryOptions = (projectId) => {
  return queryOptions({
    queryKey: ['project', { projectId }],
    queryFn: () => getProjectById(projectId)
  })
}