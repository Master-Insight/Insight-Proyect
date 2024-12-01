import { createFileRoute } from '@tanstack/react-router'
import { projectsQueryOptions, useDeleteProjectMutation, usePostProjectMutation, useUpdateProjectMutation } from '../../../data/Projects.Data';
import { useSuspenseQuery } from '@tanstack/react-query';
import CardProject from '../../../modules/projects/Card.Projects';
import Frame from '../../../ui/Divs/Frame';
import SectionWFilters from '../../../ui/sections/Section.Filter';
import { z } from 'zod';

export const Route = createFileRoute('/_private/projects/')({
  loader: async ({ context: { queryClient } }) => queryClient.ensureQueryData(projectsQueryOptions),
  component: RouteComponent,
})

function RouteComponent() {
  const { currentUser, queryClient } = Route.useRouteContext()
  const projectsQuery = useSuspenseQuery(projectsQueryOptions)
  const projects = projectsQuery.data

  // Mutaciones QUERY
  const postMutation = usePostProjectMutation(queryClient);
  const updateMutation = useUpdateProjectMutation(queryClient)
  const deleteMutation = useDeleteProjectMutation(queryClient);

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
        name: "users",
        label: "Id Usuario",
        type: "array",
        itemType: "select",
        noEditable: true,
        enum: ["users"],
        default: [currentUser.data._id]
      },
    ],
    card: CardProject,
    currentUserId: currentUser._id,
    actions: {
      postApi: async function (value) {
        await postMutation.mutateAsync(value);
      },
      putApi: async function (predata) {
        const id = predata._id;
        const data = {};
        if (predata.title) data.title = predata.title;
        if (predata.description) data.description = predata.description;
        if (predata.users) data.users = predata.users.map(user => user._id);
        await updateMutation.mutateAsync({ pId: id, data });
      },
      delApi: async function (id) {
        await deleteMutation.mutateAsync(id);
      },
    },
  }

  return (
    <>
      <Frame css={'w-full mx-5'}>
        <SectionWFilters
          title={"Proyectos 📚"}
          data={projects}
          config={config}
          filter={false}
        />
      </Frame>
    </>
  )
}
