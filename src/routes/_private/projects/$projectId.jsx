import { createFileRoute } from '@tanstack/react-router'
import { projectByIdQueryOptions } from '../../../data/Projects.Data'
import { tasksQueryOptions, useDeleteTaskMutation, usePostTaskMutation, useUpdateTaskMutation } from '../../../data/Tasks.Data'
import SectionWFilters from '../../../ui/sections/Section.Filter'
import Frame from '../../../ui/Divs/Frame'
import { useSuspenseQuery } from '@tanstack/react-query'
import CardTask from '../../../modules/tasks/Card.Tasks'
import { z } from 'zod'
import { TASK_PRIORITY, TASK_STATUS } from '../../../modules/tasks/mapValues'

export const Route = createFileRoute('/_private/projects/$projectId')({
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

function RouteComponent() {
  const { currentUser, queryClient } = Route.useRouteContext()
  const projectId = Route.useParams().projectId

  const projectQuery = useSuspenseQuery(projectByIdQueryOptions(projectId))
  const project = projectQuery.data
  const tasksQuery = useSuspenseQuery(tasksQueryOptions(projectId))
  const tasks = tasksQuery.data

  // console.log("project: ", project);
  console.log("tasks: ", tasks);

  // Mutaciones QUERY
  const postMutation = usePostTaskMutation(queryClient);
  const updateMutation = useUpdateTaskMutation(queryClient)
  const deleteMutation = useDeleteTaskMutation(queryClient);

  const config = {
    filters: [],
    activeFilter: {},
    fields: [
      {
        name: "title",
        label: "Titulo",
        icon: "mdi:bookmark-outline",
        type: "text",
        validation: z.string().min(5, "El titulo debe tener al menos 5 caracteres"),
        default: "Aquí va un titulo",
      },
      {
        name: "description",
        label: "Descripción",
        icon: "lineicons:clipboard",
        type: "textarea",
        validation: z.string(),
        default: null,
      },
      {
        name: "projectId",
        label: "Id Proyecto",
        type: "text",
        noEditable: true,
        default: projectId,
      },
      {
        name: "assignedTo",
        label: "Asignado a",
        type: "array",
        itemType: "select",
        noEditable: true,
        enum: ["users"],
        default: []
      },
      {
        name: "status",
        label: "Estado",
        icon: "lets-icons:status",
        type: "select",
        itemType: "text",
        enum: TASK_STATUS,
        default: TASK_STATUS[0],
      },
      {
        name: "teststatus",
        label: "Estado del Testeo",
        icon: "lets-icons:status",
        type: "select",
        itemType: "text",
        enum: TASK_STATUS,
        default: TASK_STATUS[1],
      },
      {
        name: "priority",
        label: "Prioridad",
        icon: "ic:round-priority-high",
        type: "select",
        itemType: "text",
        enum: TASK_PRIORITY,
        default: TASK_PRIORITY[1],
      },
    ],
    card: CardTask,
    currentUserId: currentUser._id,
    actions: {
      postApi: async function (value) {
        await postMutation.mutateAsync(value);
      },
      putApi: async function (predata) {
        console.log("putApi: ", predata);
        const data = {};
        if (predata.title) data.title = predata.title;
        if (predata.description) data.description = predata.description;
        if (predata.assignedTo) data.users = predata.users.map(user => user._id);
        if (predata.status) data.status = predata.status;
        if (predata.teststatus) data.teststatus = predata.teststatus;
        if (predata.priority) data.priority = predata.priority;
        await updateMutation.mutateAsync({ pId: predata._id, data });
      },
      delApi: async function (id) {
        await deleteMutation.mutateAsync(id);
      },
    },
    // Extra data
  }

  return (
    <Frame back={true} css={'w-full mx-5'}>
      <SectionWFilters
        title={`Proyecto 📔: ${project.title} - Tareas 📄`}
        data={tasks}
        config={config}
        filter={false}
      />
    </Frame>
  )
}