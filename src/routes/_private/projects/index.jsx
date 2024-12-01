import { createFileRoute } from '@tanstack/react-router'
import { projectsQueryOptions } from '../../../data/DataProjects';
import { useSuspenseQuery } from '@tanstack/react-query';
import CardProject from '../../../modules/projects/Card.Projects';
import Frame from '../../../ui/Divs/Frame';
import SectionWFilters from '../../../ui/sections/Section.Filter';

export const Route = createFileRoute('/_private/projects/')({
  loader: async ({ context: { queryClient } }) => queryClient.ensureQueryData(projectsQueryOptions),
  component: RouteComponent,
})

function RouteComponent() {
  const { currentUser } = Route.useRouteContext()
  const projectsQuery = useSuspenseQuery(projectsQueryOptions)
  const projects = projectsQuery.data

  console.log("data: ", projects);

  const config = {
    filters: [],
    activeFilter: {},
    fields: [],
    card: CardProject,
    currentUserId: currentUser._id,
    actions: {},
  }

  return (
    <>
      <Frame css={'w-full mx-5'}>
        <SectionWFilters
          title={"Proyectos"}
          data={projects}
          config={config}
          filter={false}
        />
      </Frame>
    </>
  )
}
