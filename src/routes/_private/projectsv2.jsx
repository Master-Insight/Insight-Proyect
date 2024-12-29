'use client'

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

// Componente principal
function RouteComponent() {
  const { currentUser, queryClient } = Route.useRouteContext()

  // Carga de data PROYECTS
  const { data: projects, isLoading } = useSuspenseQuery(projectsQueryOptions)
  const usersProjectsQuery = useSuspenseQuery(usersProjectsQueryOptions) // USERS asigned PROYECTS (se usa con los Filtros)
  const usersListQuery = useSuspenseQuery(usersListQueryOptions) // USERS (se usa al crear projects)

  // Mutaciones PROYECTS
  const postMutation = usePostProjectMutation(queryClient)
  const updateMutation = useUpdateProjectMutation(queryClient)
  const deleteMutation = useDeleteProjectMutation(queryClient)


  // Configuración inicial
  const { configFilters, fields, configElements } = getConfig(
    currentUser,
    usersListQuery.data, // lista de usuarios
    queryClient,
    postMutation, updateMutation, deleteMutation // mutaciones
  )



  // Carga de data USERS asigned PROYECTS (se usa con los Filtros)
  const users = usersProjectsQuery.data
  const userOptions = users.map((user) => ({ label: user.full_name, value: user._id, }));

  // Carga de data USERS (se usa al crear projects)
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
        icon: icons.deploy,
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
        icon: icons.repository,
        type: 'generic',
        itemType: 'text',
        validation: z
          .string()
          .url(),
        default: '',
      },
      {
        name: 'description',
        label: 'Descripción',
        type: 'textarea',
        validation: z
          .string()
          .min(5, 'El titulo debe tener al menos 5 caracteres'),
        default: "",
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

  // ELEMENTOS ----------------------------------------------------------
  // Estados de control
  const [filteredData, setFilteredData] = useState(projects); // Array de Datos filtrados

  // FILTROS ----------------------------------------------------------
  const [activeFilters, setActiveFilters] = useState(config.activeFilter || {}); // Objeto con Filtros activos

  // Handler de cambios en los filtros
  const handleFilterChange = (filterKey, filterValue) => {
    setActiveFilters((prevFilters) => ({ ...prevFilters, [filterKey]: filterValue, }));
  };

  // Handler que Reinicia todos los filtros activos
  const handleResetFilter = () => { setActiveFilters(config.activeFilter); };

  // useEffect que actualiza los datos cada vez que los filtros cambian
  useEffect(() => {
    const applyFilters = () => {
      // Copia de los datos originales
      let filtered = [...filteredData];

      Object.entries(activeFilters).forEach(([filterKey, filterValue]) => {
        if (filterValue) {
          filtered = filtered.filter((item) => {
            // Condición especial para el filtro de "users"
            if (filterKey === "users") {
              // Si el filtro es un array (selección múltiple)
              if (Array.isArray(filterValue)) {
                // Comprobar si al menos uno de los usuarios del item está en los seleccionados
                return item.users.some(user => filterValue.includes(user._id));
              }
              // Si el filtro no es un array, comparar directamente con un único valor
              return item.users.some(user => user._id === filterValue);
            }

            if (filterKey === "assignedTo") {
              // Si el filtro es un array (selección múltiple)
              if (Array.isArray(filterValue)) {
                // Comprobar si al menos uno de los usuarios del item está en los seleccionados
                return item.assignedTo.some(user => filterValue.includes(user._id));
              }
              // Si el filtro no es un array, comparar directamente con un único valor
              return item.assignedTo.some(user => user._id === filterValue);
            }

            // Para filtros simples (como texto o selección única)
            const itemValue = item[filterKey];
            if (Array.isArray(filterValue)) {
              // Si el filtro es un array (multi-selección), verificamos si incluye el valor
              return filterValue.includes(itemValue?.toString());
            } else {
              // Para filtros simples (string/number)
              return itemValue?.toString().includes(filterValue.toString());
            }
          });
        }
      });

      // Establecer los datos filtrados
      setFilteredData(filtered);
    };

    applyFilters();
  }, [activeFilters, filteredData]);


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
        <FilterSection
          active={true}
          activeFilters={activeFilters}
          filters={config.filters}
          onFilterChange={handleFilterChange}
          isPending={isLoading}
          onReset={handleResetFilter}
        />

        {/* ------------ ELEMENTOS ------------ */}
        <div className="w-full justify-center lg:w-4/5 p-4 gap-2 flex flex-col">
          <ElementList data={filteredData} config={config} isPending={isLoading} />
        </div>
      </section>


    </FrameAbs>
  )
}

// Configuración dinámica del componente
function getConfig(currentUser, usersList, queryClient, postMutation, updateMutation, deleteMutation) {
  const isUser = currentUser.data.role === 'User'
  return {
    configFilters: {
      activeFilter: { users: currentUser.data._id },
      filters: [
        { key: "title", label: "Título", type: "text" },
        ...(isUser
          ? []
          : [
            {
              key: "users",
              label: "Asignado a",
              type: "select",
              options: usersList.map(user => ({ label: user.full_name, value: user._id }))
            }
          ])
      ],
    },

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
        displayField: "full_name",
        valueField: "_id",
        default: [currentUser.data._id],
      },
      {
        name: 'deploy',
        label: 'URL Deploy',
        icon: icons.deploy,
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
        icon: icons.repository,
        type: 'generic',
        itemType: 'text',
        validation: z
          .string()
          .url(),
        default: '',
      },
      {
        name: 'description',
        label: 'Descripción',
        type: 'textarea',
        validation: z
          .string()
          .min(5, 'El titulo debe tener al menos 5 caracteres'),
        default: "",
      },
    ],

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
    }
  }
}