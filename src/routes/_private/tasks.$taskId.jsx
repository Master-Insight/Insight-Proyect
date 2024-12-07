import { createFileRoute } from '@tanstack/react-router'
import Frame from '../../ui/Divs/Frame'
import { taskByIdQueryOptions } from '../../data/Tasks.Data'
import { commentsQueryOptions, usePostCommentMutation } from '../../data/Comments.Data'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { alertMessage } from '../../ui/messages/alerts'
import TextEditor from '../../modules/textEditor/TextEditor'
import ActionModalTextEditor from '../../ui/modal/ActionModalTextEditor'
import { z } from 'zod'
import DOMPurify from 'dompurify';

export const Route = createFileRoute('/_private/tasks/$taskId')({
  loader: async ({ context: { queryClient }, params: { taskId } }) => {
    // Usamos Promise.all para cargar ambos datos simultáneamente
    const [tasks, comments] = await Promise.all([
      queryClient.ensureQueryData(taskByIdQueryOptions(taskId)),
      queryClient.ensureQueryData(commentsQueryOptions(taskId)),
    ])
    return { tasks, comments }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { currentUser, queryClient } = Route.useRouteContext()
  const taskId = Route.useParams().taskId

  const tasksQuery = useSuspenseQuery(taskByIdQueryOptions(taskId))
  const commentsQuery = useSuspenseQuery(commentsQueryOptions(taskId))
  const task = tasksQuery.data
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

  const [richText, setRichText] = useState(task.description);

  const config = {
    name: "description",
    label: "Descripción",
    icon: null,
    default: richText,
    validation: z.string().min(10, "La descripción debe tener al menos 10 caracteres")
  }

  const handleSaveDescription = async (value) => {
    console.log("Saving new description:", value);
    try {
      // Simula la petición al backend
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulación con delay
      setRichText(value);
      alertMessage("Descripción actualizada con éxito", "success", 2);
    } catch (error) {
      alertMessage("Error al actualizar la descripción", "error", 2);
      console.error('Error al guardar la descripción:', error);
    }
  };

  const sanitizeHtml = (html) => DOMPurify.sanitize(html);

  console.log(currentUser);
  console.log("task: ", task);
  console.log("comments: ", comments);

  return (
    <Frame back={true} css={'w-full mx-5'}>
      <h2 className="text-3xl font-semibold mb-2">{task.title}</h2>
      <div
        className="mb-4"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(richText || 'Aqui va la descripción'),
        }}
      ></div>
      <ActionModalTextEditor
        title="Modificar texto"
        field={config}
        functionApi={handleSaveDescription}
      />
      {/* <TextEditor value={richText} onChange={setRichText} /> */}

      {/* Detalle de estados y prioridad */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Detalles de la Tarea:</h3>
        <ul className="list-disc pl-5">
          <li className="text-sm text-gray-700 mt-1">Prioridad: {task.priority}</li>
          <li className="text-sm text-gray-700 mt-1">Estado: {task.status}</li>
          <li className="text-sm text-gray-700 mt-1">Testeo: {task.teststatus}</li>
        </ul>
      </div>

      {/* Renderizamos comentarios si existen */}
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

      {/* Área para agregar un nuevo comentario */}
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
