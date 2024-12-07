// Importaciones necesarias
import DOMPurify from 'dompurify';
import { createFileRoute } from '@tanstack/react-router';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { z } from 'zod';
import ActionModalTextEditor from '../../ui/modal/ActionModalTextEditor';
import { alertMessage } from '../../ui/messages/alerts';
import { taskByIdQueryOptions, useUpdateTaskMutation } from '../../data/Tasks.Data';
import { commentsQueryOptions, usePostCommentMutation } from '../../data/Comments.Data';
import Frame from '../../ui/Divs/Frame';
import { icons } from '../../../config/layout';

// Definición de la ruta
export const Route = createFileRoute('/_private/tasks/$taskId')({
  loader: async ({ context: { queryClient }, params: { taskId } }) => {
    // Carga simultánea de datos relacionados con la tarea y los comentarios
    const [tasks, comments] = await Promise.all([
      queryClient.ensureQueryData(taskByIdQueryOptions(taskId)),
      queryClient.ensureQueryData(commentsQueryOptions(taskId)),
    ]);
    return { tasks, comments };
  },
  component: RouteComponent,
});

// Componente principal de la ruta
function RouteComponent() {
  const { currentUser, queryClient } = Route.useRouteContext()
  const sanitizeHtml = (html) => DOMPurify.sanitize(html); // para implementar Html seguro

  // Variables, estados y handlers de TASKS
  const taskId = Route.useParams().taskId
  const tasksQuery = useSuspenseQuery(taskByIdQueryOptions(taskId))
  const task = tasksQuery.data

  // Variables, estados y handlers de TASK - DESCRIPTION
  const configTextEditor = {
    name: "description",
    label: "Descripción",
    icon: null,
    default: task.description,
    validation: z.string().min(10, "La descripción debe tener al menos 10 caracteres")
  }
  const postMutation = useUpdateTaskMutation(queryClient);
  const handleSaveDescription = async (value) => {
    try {
      const preData = {
        _id: task._id,
        description: value
      }
      await postMutation.mutateAsync(preData);
      alertMessage("Descripción actualizada con éxito", "success", 2);
    } catch (error) {
      alertMessage("Error al actualizar la descripción", "error", 2);
      console.error('Error al guardar la descripción:', error);
    }
  };

  // Variables, estados y handlers de COMMENTS
  const commentsQuery = useSuspenseQuery(commentsQueryOptions(taskId)) // Obtiene
  const comments = commentsQuery.data
  const [newComment, setNewComment] = useState('');
  const postCommentMutation = usePostCommentMutation(queryClient);
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await postCommentMutation.mutateAsync({
        tId: taskId,
        newComment: { content: newComment, user: currentUser.data._id },
      });
      setNewComment(''); // Limpiar el textarea
    } catch (error) {
      alertMessage("Error al agregar el comentario", "error", 2);
      console.error('Error al agregar el comentario:', error);
    }
  };

  // Renderizado del componente
  return (
    <Frame back={true} css={'w-full mx-5'}>
      {/* Título de la tarea */}
      <h2 className="text-3xl font-semibold mb-2">{task.title}</h2>

      {/* Detalles de la tarea */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Detalles de la Tarea:</h3>
        <ul className="list-disc pl-5">
          <li className="text-sm text-gray-700 mt-1">Prioridad: {task.priority}</li>
          <li className="text-sm text-gray-700 mt-1">Estado: {task.status}</li>
          <li className="text-sm text-gray-700 mt-1">Testeo: {task.teststatus}</li>
        </ul>
      </div>

      {/* Descripción de la tarea y Editor*/}
      <div className="mt-4">
        <div className='flex gap-3'>
          <h3 className="text-xl font-semibold">Detalle:</h3>

          {/* Modal editor de la descripción de la tarea */}
          <ActionModalTextEditor title="Modificar descripción"
            field={configTextEditor}
            functionApi={handleSaveDescription}
          >
            <Icon icon={icons.edit} />
          </ActionModalTextEditor>
        </div>
        <div
          className="mb-4"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(task.description || 'Aqui va la descripción'), }}
        ></div>
      </div>

      {/* Listado de comentarios */}
      {comments && comments.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Comentarios:</h3>
          <ul className="list-disc pl-5">
            {comments.map((comment) => (
              <li key={comment._id} className="text-sm text-gray-700 mt-1">
                <span className='text-primary font-bold'>{comment.user.full_name}</span> - {comment.content}
                <div className="text-gray-500 text-xs mt-1 italic">
                  Creado: {new Date(comment.created).toLocaleString()} {comment.created !== comment.updated ? ` | Actualizado: ${new Date(comment.updated).toLocaleString()}` : ''}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No hay comentarios disponibles.</p>
      )}

      {/* Formulario para agregar nuevo comentario */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Agregar un comentario:</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe tu comentario aquí..."
          className="w-full p-2 border rounded-md mt-2"
        ></textarea>
        <button
          onClick={handleAddComment}
          className="bg-primary text-white px-4 py-2 rounded-md mt-2 hover:bg-primary-dark"
        >
          Enviar comentario
        </button>
      </div>
    </Frame>
  )
}
