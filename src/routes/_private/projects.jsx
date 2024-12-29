'use client'

// Importaciones necesarias
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { z } from 'zod'
import {
  projectsQueryOptions,
  useDeleteProjectMutation,
  usePostProjectMutation,
  useUpdateProjectMutation,
} from '../../data/Projects.Data'
import { usersListQueryOptions } from '../../data/Users.Data'
import CardProject from '../../modules/projects/Card.Projects'
import ActionModal from '../../ui/modal/ActionModal'
import { Icon } from '@iconify/react/dist/iconify.js'
import { icons } from '../../../config/layout'
import BackButton from '../../ui/buttons/BackButton2'
import FrameAbs from '../../ui/Divs/FrameAbs'
import ElementList from '../../ui/sections/SectionWFilter/Elements'
import FilterSection from '../../ui/sections/SectionWFilter/Filters'
import { useEffect, useState } from 'react'

// Definición de la ruta
export const Route = createFileRoute('/_private/projects')({
  loader: async ({ context: { queryClient } }) => {
    const [project, usersList] = await Promise.all([
      queryClient.ensureQueryData(projectsQueryOptions),
      queryClient.ensureQueryData(usersListQueryOptions),
    ])
    return { project, usersList }
  },
  component: RouteComponent,
})

// Componente principal
function RouteComponent() {
  const { currentUser, queryClient } = Route.useRouteContext()

  // Carga de data PROYECTS
  const { data: projects, isLoading } = useSuspenseQuery(projectsQueryOptions)
  const usersListQuery = useSuspenseQuery(usersListQueryOptions) // USERS (se usa al crear projects)

  // Mutaciones PROYECTS
  const postMutation = usePostProjectMutation(queryClient)
  const updateMutation = useUpdateProjectMutation(queryClient)
  const deleteMutation = useDeleteProjectMutation(queryClient)

  // Configuración inicial
  const { configFilters, configElements } = getConfig(
    currentUser,
    usersListQuery.data, // lista de usuarios
    queryClient,
    postMutation,
    updateMutation,
    deleteMutation, // mutaciones
  )

  // Estados de control de filtros
  const [activeFilters, setActiveFilters] = useState(
    configFilters.activeFilter || {},
  )
  const [filteredData, setFilteredData] = useState(projects)

  // Actualización de datos al cambiar filtros
  useEffect(
    () => setFilteredData(filterProjects(projects, activeFilters)),
    [activeFilters, projects],
  )

  return (
    <FrameAbs>
      {/* ------------ HEADER ------------ */}
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="flex">
          <BackButton />
          <h2 className="text-3xl font-semibold ml-2">Proyectos 📚</h2>
        </div>
        <ActionModal
          title={'Agregar nuevo elemento'}
          fields={configElements.fields}
          functionApi={configElements.actions.postApi}
        >
          Contribuir <Icon icon={icons.plus} className="ml-2" />
        </ActionModal>
      </div>

      <section className="w-full flex mt-4 flex-row">
        {/* ------------ FILTROS ------------ */}
        <FilterSection
          active={true}
          activeFilters={activeFilters}
          filters={configFilters.filters}
          onFilterChange={(key, value) =>
            handleFilterChange(setActiveFilters, key, value)
          }
          onReset={() =>
            handleResetFilter(setActiveFilters, configFilters.activeFilter)
          }
          isPending={isLoading}
        />

        {/* ------------ ELEMENTOS ------------ */}
        <div className="w-full justify-center lg:w-4/5 p-4 gap-2 flex flex-col">
          <ElementList
            data={filteredData}
            config={configElements}
            isPending={isLoading}
          />
        </div>
      </section>
    </FrameAbs>
  )
}

// Configuración dinámica del componente
function getConfig(
  currentUser,
  usersList,
  queryClient,
  postMutation,
  updateMutation,
  deleteMutation,
) {
  const isUser = currentUser.data.role === 'User'
  return {
    configFilters: {
      activeFilter: { users: currentUser.data._id },
      filters: [
        { key: 'title', label: 'Título', type: 'text' },
        ...(isUser
          ? []
          : [
              {
                key: 'users',
                label: 'Asignado a',
                type: 'select',
                options: usersList.map((user) => ({
                  label: user.full_name,
                  value: user._id,
                })),
              },
            ]),
      ],
    },

    // Card y Acciones disponibles para utilizar en ella
    configElements: {
      currentUserId: currentUser.data._id,
      card: CardProject,
      actions: {
        postApi: (value) => postMutation.mutateAsync(value),
        putApi: (predata) => updateMutation.mutateAsync(predata),
        delApi: (id) => deleteMutation.mutateAsync(id),
      },
      blockEdit: isUser, // bloquear si es usuario (cliente no programador)
      // Fields muestra los campos para crear (boton) / editar (card)
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
          displayField: 'full_name',
          valueField: '_id',
          default: [currentUser.data._id],
        },
        {
          name: 'deploy',
          label: 'URL Deploy',
          icon: icons.deploy,
          type: 'generic',
          itemType: 'text',
          validation: z.string().url(),
          default: '',
        },
        {
          name: 'repository',
          label: 'Repositorio',
          icon: icons.repository,
          type: 'generic',
          itemType: 'text',
          validation: z.string().url(),
          default: '',
        },
        {
          name: 'description',
          label: 'Descripción',
          type: 'textarea',
          validation: z
            .string()
            .min(5, 'El titulo debe tener al menos 5 caracteres'),
          default: '',
        },
      ],
    },
  }
}

// Lógica para manejar filtros
function filterProjects(projects, activeFilters) {
  return projects.filter((item) =>
    Object.entries(activeFilters).every(([key, value]) => {
      if (!value) return true
      if (key === 'users')
        return item.users.some((user) =>
          Array.isArray(value) ? value.includes(user._id) : user._id === value,
        )
      return item[key]?.toString().includes(value.toString())
    }),
  )
}

function handleFilterChange(setActiveFilters, key, value) {
  setActiveFilters((prev) => ({ ...prev, [key]: value }))
}

function handleResetFilter(setActiveFilters, defaultFilter) {
  setActiveFilters(defaultFilter)
}
