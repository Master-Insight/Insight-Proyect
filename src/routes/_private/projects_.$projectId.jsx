// Importaciones necesarias
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { z } from 'zod'
import {
  tasksQueryOptions,
  useDeleteTaskMutation,
  usePostTaskMutation,
  useUpdateTaskMutation,
} from '../../data/Tasks.Data'
import { projectByIdQueryOptions } from '../../data/Projects.Data'
import { TASK_PRIORITY, TASK_STATUS } from '../../modules/tasks/mapValues'
import Frame from '../../ui/Divs/Frame'
import CardTask from '../../modules/tasks/Card.Tasks'
import SectionWFilters from '../../ui/sections/Section.Filter'

// Definición de la ruta
export const Route = createFileRoute('/_private/projects_/$projectId')({
  loader: async ({ context: { queryClient }, params: { projectId } }) => {
    // Usamos Promise.all para cargar ambos datos simultáneamente
    const [project, tasks] = await Promise.all([
      queryClient.ensureQueryData(projectByIdQueryOptions(projectId)),
      queryClient.ensureQueryData(tasksQueryOptions(projectId)),
    ])
    return { project, tasks }
  },
  component: RouteComponent,
})

// Componente principal de la ruta
function RouteComponent() {
  const { currentUser, queryClient } = Route.useRouteContext()

  // Variables, estados y handlers de PROJECTS
  const projectId = Route.useParams().projectId
  const projectQuery = useSuspenseQuery(projectByIdQueryOptions(projectId))
  const project = projectQuery.data

  // Variables, estados y handlers de TASKs
  const tasksQuery = useSuspenseQuery(tasksQueryOptions(projectId))
  const tasks = tasksQuery.data

  // Mutaciones QUERY TASKs
  const postMutation = usePostTaskMutation(queryClient)
  const updateMutation = useUpdateTaskMutation(queryClient)
  const deleteMutation = useDeleteTaskMutation(queryClient)

  // Configuración del módulo
  const config = {
    // ID del usuario actual
    currentUserId: currentUser._id,
    // Configuración de filtros (vacío para este ejemplo)
    filters: [],
    // Filtro activo (por defecto vacío)
    activeFilter: {},
    // Fields muestra los campos para crear / editar
    fields: [
      {
        name: 'title',
        label: 'Titulo',
        icon: 'mdi:bookmark-outline',
        type: 'text',
        validation: z
          .string()
          .min(5, 'El titulo debe tener al menos 5 caracteres'),
        default: 'Aquí va un titulo',
      },
      {
        name: 'description',
        label: 'Descripción',
        icon: 'lineicons:clipboard',
        type: 'textarea',
        validation: z.string(),
        default: null,
      },
      {
        name: 'projectId',
        label: 'Id Proyecto',
        type: 'text',
        noEditable: true,
        default: projectId,
      },
      {
        name: 'assignedTo',
        label: 'Asignado a',
        type: 'array',
        itemType: 'select',
        noEditable: true,
        enum: ['users'],
        default: [],
      },
      {
        name: 'status',
        label: 'Estado',
        icon: 'lets-icons:status',
        type: 'select',
        itemType: 'text',
        enum: TASK_STATUS,
        default: TASK_STATUS[0],
      },
      {
        name: 'teststatus',
        label: 'Estado del Testeo',
        icon: 'lets-icons:status',
        type: 'select',
        itemType: 'text',
        enum: TASK_STATUS,
        default: TASK_STATUS[1],
      },
      {
        name: 'priority',
        label: 'Prioridad',
        icon: 'ic:round-priority-high',
        type: 'select',
        itemType: 'text',
        enum: TASK_PRIORITY,
        default: TASK_PRIORITY[1],
      },
    ],
    // Componente CARD para renderizar los proyectos
    card: CardTask,
    // Acciones disponibles para utilizar es Card
    actions: {
      postApi: async function (value) {
        await postMutation.mutateAsync(value)
      },
      putApi: async function (predata) {
        await updateMutation.mutateAsync(predata)
      },
      delApi: async function (id) {
        await deleteMutation.mutateAsync(id)
      },
    },
    // Extra data para ser usada en Cards
  }

  return (
    <Frame back={true} css={'w-full mx-5'}>
      {/* Sección con filtros y listado de proyectos */}
      <SectionWFilters
        title={`Proyecto 📔: ${project.title} - Tareas 📄`}
        data={tasks}
        config={config}
        filter={false}
      />
    </Frame>
  )
}
