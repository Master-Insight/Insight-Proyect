// Importaciones necesarias
import { createFileRoute } from '@tanstack/react-router'
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
import { usersListQueryOptions } from '../../data/Users.Data'
import ActionModal from '../../ui/modal/ActionModal'
import { Icon } from '@iconify/react/dist/iconify.js'
import { icons } from '../../../config/layout'
import BackButton from '../../ui/buttons/BackButton2'
import FrameAbs from '../../ui/Divs/FrameAbs'
import ElementList from '../../ui/sections/SectionWFilter/Elements'
import { useState } from 'react'
import FilterSection from '../../ui/sections/SectionWFilter/Filters'

// Definición de la ruta
export const Route = createFileRoute('/_private/projectsv2')({
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
  const { data: projects, isLoading } = useSuspenseQuery(projectsQueryOptions)


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

  // FILTROS ----------------------------------------------------------


  // ELEMENTOS ----------------------------------------------------------
  // Estados de control
  const [activeFilters, setActiveFilters] = useState(config.activeFilter || {}); // Objeto con Filtros activos
  const [filteredData, setFilteredData] = useState(projects); // Array de Datos filtrados

  return (
    <FrameAbs>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className='flex'>
          <BackButton />
          <h2 className="text-3xl font-semibold ml-2">Proyectos</h2>
        </div>
        <ActionModal
          title={"Agregar nuevo elemento"}
          fields={config.fields}
          functionApi={config.actions.postApi}
        >
          Contribuir <Icon icon={icons.plus} className="ml-2" />
        </ActionModal>
      </div>

      {/* <section className="w-full flex mt-4 flex-col lg:flex-row"> */}
      <section className="w-full flex mt-4 flex-row">


        {/* Filtros */}
        {/* <FilterSection
          active={true}
          activeFilters={activeFilters}
          filters={config.filters}
          onFilterChange={handleFilterChange}
          isPending={isFilterPending}
          onReset={handleResetFilter}
        /> */}


        {/* ------------ ELEMENTOS ------------ */}
        <div className="w-full justify-center lg:w-4/5 p-4 gap-2 flex flex-col">
          <ElementList data={filteredData} config={config} isPending={isLoading} />
        </div>
      </section>


    </FrameAbs>
  )
}

