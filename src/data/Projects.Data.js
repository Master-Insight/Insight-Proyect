import myAxios from '../api/axiosInstance';
import { queryOptions } from '@tanstack/react-query';

// * ----------------  GETS Projects  ----------------

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

export const projectsQueryOptions = () => queryOptions({
  queryKey: ['projects'],
  queryFn: () => getProjects()
})

// * ----------------  GET ONE Project bi Id ----------------

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

export const projectByIdQueryOptions = (projectId) => {
  return queryOptions({
    queryKey: ['project', { projectId }],
    queryFn: () => getProjectById(projectId)
  })
}