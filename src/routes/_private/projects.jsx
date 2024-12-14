// Importaciones necesarias
import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { z } from 'zod'
import {
  projectsQueryOptions,
  useDeleteProjectMutation,
  usePostProjectMutation,
  usersProjectsQueryOptions,
  useUpdateProjectMutation,
} from '../../data/Projects.Data'
import CardProject from '../../modules/projects/Card.Projects'
import Frame from '../../ui/Divs/Frame'
import SectionWFilters from '../../ui/sections/Section.Filter'
import { usersListQueryOptions } from '../../data/Users.Data'

// Definición de la ruta
export const Route = createFileRoute('/_private/projects')({
  loader: async ({ context: { queryClient } }) => {
    const [project, usersList, usersProject] = await Promise.all([
      queryClient.ensureQueryData(projectsQueryOptions),
      queryClient.ensureQueryData(usersListQueryOptions),
      queryClient.ensureQueryData(usersProjectsQueryOptions),
    ])
    return { project, usersList, usersProject }
  },
  component: RouteComponent,
})

// Componente principal de la ruta
function RouteComponent() {
  const { currentUser, queryClient } = Route.useRouteContext()

  // Carga de data PROYECTS
  const projectsQuery = useSuspenseQuery(projectsQueryOptions)
  const projects = projectsQuery.data

  // Mutaciones QUERY PROJECTS
  const postMutation = usePostProjectMutation(queryClient)
  const updateMutation = useUpdateProjectMutation(queryClient)
  const deleteMutation = useDeleteProjectMutation(queryClient)

  // Carga de data USERS asigned PROYECTS
  const usersProjectsQuery = useSuspenseQuery(usersProjectsQueryOptions)
  const users = usersProjectsQuery.data

  const userOptions = users.map((user) => ({
    label: user.full_name,
    value: user._id,
  }));

  // Carga de data USERS
  const usersListQuery = useSuspenseQuery(usersListQueryOptions)
  const usersList = usersListQuery.data

  const isUser = currentUser.data.role === 'User'
  const filtersAllow = isUser ? [
    // Filtro por titulo
    {
      key: "title",
      label: "Título",
      type: "text",
    },
  ] : [
    // Filtro por titulo
    {
      key: "title",
      label: "Título",
      type: "text",
    },
    // Filtro por usuario
    {
      key: "users",
      label: "Asignado a",
      type: "select",
      options: userOptions, // Opciones transformadas
    },
  ]

  // Configuración del módulo
  const config = {
    // ID del usuario actual
    currentUserId: currentUser.data._id,
    // Configuración de filtros - varia segun el rol
    filters: filtersAllow,
    // Filtro activo (por defecto vacío)
    activeFilter: {
      users: currentUser.data._id,
    },
    // Fields muestra los campos para crear / editar
    fields: [
      {
        name: 'title',
        label: 'Titulo',
        icon: 'mdi:bookmark-outline',
        type: 'generic',
        itemType: 'text',
        validation: z
          .string()
          .min(5, 'El titulo debe tener al menos 5 caracteres'),
        default: 'Aquí va un titulo',
      },
      {
        name: 'users',
        label: 'Id Usuario',
        type: 'array',
        itemType: 'object',
        enum: usersList,
        displayField: "full_name",
        valueField: "_id",
        default: [currentUser.data._id],
      },
      {
        name: 'deploy',
        label: 'URL Deploy',
        icon: 'eos-icons:deploy',
        type: 'generic',
        itemType: 'text',
        validation: z
          .string()
          .url(),
        default: '',
      },
      {
        name: 'repository',
        label: 'Repositorio',
        icon: 'mdi:bookmark-outline',
        type: 'generic',
        itemType: 'text',
        validation: z
          .string()
          .url(),
        default: '',
      },
    ],
    // Componente CARD para renderizar los proyectos
    card: CardProject,
    // Acciones disponibles para utilizar es Card
    actions: {
      postApi: async function (value) { await postMutation.mutateAsync(value) },
      putApi: async function (predata) { await updateMutation.mutateAsync(predata) },
      delApi: async function (id) { await deleteMutation.mutateAsync(id) },
    },
    // blockEdit esta pensado para bloquear Crear / Editar / Eliminar
    blockEdit: isUser,
    // Extra data para ser usada en Cards
  }

  return (
    <Frame css={'w-full mx-5'}>
      {isUser ? null : <Link to={'/projectsv2'} className='p2 text-primary underline' >
        Projects Version 2
      </Link>}

      {/* Sección con filtros y listado de proyectos */}
      <SectionWFilters
        filter={true}
        title={'Proyectos 📚'}
        data={projects}
        config={config}
        cssContainerCard='flex flex-wrap'
      />
      <p className='flex flex-wrap'></p>
    </Frame>
  )
}
