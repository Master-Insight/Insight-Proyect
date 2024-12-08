import myAxios from '../api/axiosInstance';
import { queryOptions, useMutation } from '@tanstack/react-query';
import { alertMessage } from '../ui/messages/alerts';

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

// * ---------------- POST Task ----------------

// AXIOS
export const postTask = async (newTask) => {
  try {
    const response = await myAxios.post(`/v1/projects/task`, newTask);
    return response.data?.data || null;
  } catch (error) {
    throw new Response('Error al crear la tarea', {
      status: 500,
      statusText: error.message,
    });
  }
};

// TANSTACK QUERY
export const usePostTaskMutation = (queryClient) => {
  return useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      alertMessage('Proyecto creado con éxito', 'success', 2);
    },
    onError: (error) => {
      console.error('Error al crear la tarea:', error);
      alertMessage('Error: ' + error.message, 'error', 2);
    },
  });
};
//usar asi --> const postMutation = usePostTaskMutation(queryClient);  --> await postMutation.mutateAsync(value);

// * ---------------- UPDATE Task ----------------
// AXIOS
export const updateTaskById = async (predata) => {
  const data = {};
  if (predata.title) data.title = predata.title;
  if (predata.description) data.description = predata.description;
  if (predata.assignedTo) data.assignedTo = predata.assignedTo;
  if (predata.status) data.status = predata.status;
  if (predata.teststatus) data.teststatus = predata.teststatus;
  if (predata.priority) data.priority = predata.priority;

  const pId = predata._id

  try {
    const response = await myAxios.put(`/v1/projects/task/${pId}`, data);
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
export const useUpdateTaskMutation = (queryClient) => {
  return useMutation({
    mutationFn: updateTaskById,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      alertMessage('Proyecto actualizado con éxito', 'success', 2);
    },
    onError: (error) => {
      console.error('Error al actualizar la tarea:', error);
      alertMessage('Error: ' + error.message, 'error', 2);
    },
  });
};

// * ---------------- DELETE Task ----------------
// AXIOS
export const deleteTaskById = async (pId) => {
  try {
    const response = await myAxios.delete(`/v1/projects/task/${pId}`);
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
export const useDeleteTaskMutation = (queryClient) => {
  return useMutation({
    mutationFn: deleteTaskById,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      alertMessage('Proyecto eliminado con éxito', 'success', 2);
    },
    onError: (error) => {
      console.error('Error al eliminar la tarea:', error);
      alertMessage('Error: ' + error.message, 'error', 2);
    },
  });
};

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