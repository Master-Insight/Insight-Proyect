import { createFileRoute } from '@tanstack/react-router'
import { projectByIdQueryOptions } from '../../../data/Projects.Data'
import { tasksQueryOptions } from '../../../data/Tasks.Data'
import SectionWFilters from '../../../ui/sections/Section.Filter'
import Frame from '../../../ui/Divs/Frame'
import { useSuspenseQuery } from '@tanstack/react-query'
import CardTask from '../../../modules/tasks/Card.Tasks'

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
  const { currentUser } = Route.useRouteContext()
  const projectId = Route.useParams().projectId

  const projectQuery = useSuspenseQuery(projectByIdQueryOptions(projectId))
  const project = projectQuery.data
  const tasksQuery = useSuspenseQuery(tasksQueryOptions(projectId))
  const tasks = tasksQuery.data

  console.log("data: ", project);
  console.log("tasks: ", tasks);

  const config = {
    filters: [],
    activeFilter: {},
    fields: [],
    card: CardTask,
    currentUserId: currentUser._id,
    actions: {},
  }

  return (
    <Frame css={'w-full mx-5'}>
      <h2 className='text-3xl font-bold mb-8'>Proyecto: {project.title}</h2>
      <SectionWFilters
        title={`Tareas`}
        data={tasks}
        config={config}
        filter={false}
      />
    </Frame>
  )
}