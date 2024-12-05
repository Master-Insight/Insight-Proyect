import myAxios from '../api/axiosInstance';
import { queryOptions, useMutation } from '@tanstack/react-query';
import { alertMessage } from '../ui/messages/alerts';

// * ----------------  GETS Comments ( según un Project Id )  ----------------

export const getComments = async (tId) => {
  try {
    const response = await myAxios.get(`/v1/projects/tasks/${tId}/comments`);
    const comments = response.data?.data || null;
    return comments;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};

export const commentsQueryOptions = (taskId) => queryOptions({
  queryKey: ['comments', { taskId }],
  queryFn: () => getComments(taskId)
})

// * ---------------- POST Comment ----------------

// AXIOS
export const postComment = async ({tId, newComment}) => {
  try {
    const response = await myAxios.post(`/v1/projects/tasks/${tId}/comments`, newComment);
    return response.data?.data || null;
  } catch (error) {
    throw new Response('Error al crear la tarea', {
      status: 500,
      statusText: error.message,
    });
  }
};

// TANSTACK QUERY
export const usePostCommentMutation = (queryClient) => {
  return useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
      alertMessage('Proyecto creado con éxito', 'success', 2);
    },
    onError: (error) => {
      console.error('Error al crear la tarea:', error);
      alertMessage('Error: ' + error.message, 'error', 2);
    },
  });
};
//usar asi --> const postMutation = usePostCommentMutation(queryClient);  --> await postMutation.mutateAsync(value);

// // * ---------------- UPDATE Comment ----------------
// // AXIOS
// export const updateCommentById = async ({ tId, cId, data }) => {
//   try {
//     const response = await myAxios.put(`/v1/projects/tasks/${tId}/comments/${cId}`, data);
//     const projects = response.data?.data || null;
//     return projects;
//   } catch (error) {
//     throw new Response('Error al cargar los datos', {
//       status: 500,
//       statusText: error.message,
//     });
//   }
// };

// // TANSTACK QUERY
// export const useUpdateCommentMutation = (queryClient) => {
//   return useMutation({
//     mutationFn: updateCommentById,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['comments']);
//       alertMessage('Proyecto actualizado con éxito', 'success', 2);
//     },
//     onError: (error) => {
//       console.error('Error al actualizar la tarea:', error);
//       alertMessage('Error: ' + error.message, 'error', 2);
//     },
//   });
// };

// * ---------------- DELETE Comment ----------------
// AXIOS
export const deleteCommentById = async ({tId, cId}) => {
  try {
    const response = await myAxios.delete(`/v1/projects/tasks/${tId}/comments/${cId}`);
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
export const useDeleteCommentMutation = (queryClient) => {
  return useMutation({
    mutationFn: deleteCommentById,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
      alertMessage('Proyecto eliminado con éxito', 'success', 2);
    },
    onError: (error) => {
      console.error('Error al eliminar la tarea:', error);
      alertMessage('Error: ' + error.message, 'error', 2);
    },
  });
};

// * ----------------  GET ONE Comments bi Id ----------------

export const getCommentById = async ({tId, cId}) => {
  try {
    const response = await myAxios.get(`/v1/projects/tasks/${tId}/comment/${cId}`);
    const comment = response.data?.data || null;
    return comment;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};

export const commentByIdQueryOptions = (commentId) => {
  return queryOptions({
    queryKey: ['comment', { commentId }],
    queryFn: () => getCommentById(commentId)
  })
}