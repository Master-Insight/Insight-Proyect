import myAxios from '../api/axiosInstance';
import { queryOptions } from '@tanstack/react-query';

// * ----------------  GETS Tasks ( según un Project Id )  ----------------

export const getTasks = async (pId) => {
  try {
    const response = await myAxios.get(`/v1/projects/${pId}/task`);
    const tasks = response.data?.data || null;
    return tasks;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};

export const tasksQueryOptions = (projectId) => queryOptions({
  queryKey: ['tasks', { projectId }],
  queryFn: () => getTasks(projectId)
})

// * ----------------  GET ONE Tasks bi Id ----------------

export const getTaskById = async (tId) => {
  try {
    const response = await myAxios.get(`/v1/projects/task/${tId}`);
    const task = response.data?.data || null;
    return task;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};

export const taskByIdQueryOptions = (taskId) => {
  return queryOptions({
    queryKey: ['task', { taskId }],
    queryFn: () => getTaskById(taskId)
  })
}