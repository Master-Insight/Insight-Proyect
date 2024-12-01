import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { icons } from "../../../config/layout";
import { Icon } from '@iconify/react';

// Es una section que muestra "cards" y filtradas tipo "tienda online" y un boton para agregar mas elementos

// Subcomponentes
import ElementList from "./SectionWFilter/Elements";
import FilterSection from "./SectionWFilter/Filters";
import ActionModal from "../modal/ActionModal";

const SectionWFilters = ({
  title,
  data,
  isFilterPending = false,
  isElementPending = false,
  config = {
    activeFilter: {},
    filters: [],
    fields: [],
    actions: {}
  },
  filter = true,
}) => {

  const [filteredData, setFilteredData] = useState(data);
  const [activeFilters, setActiveFilters] = useState(config.activeFilter || {});

  //console.log("data: ",filteredData);
  // console.log("activeFilters: ",activeFilters);
  // Maneja cambios en los filtros
  const handleFilterChange = (filterKey, filterValue) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: filterValue,
    }));
  };

  // Filtra los datos cada vez que los filtros cambian
  useEffect(() => {
    const applyFilters = () => {
      let filtered = data;

      Object.keys(activeFilters).forEach((filterKey) => {
        const filterValue = activeFilters[filterKey];

        if (filterValue) {
          filtered = filtered.filter((item) => {
            if (filterKey === "user") {
              // Filtrar por el ID del usuario contribuyente
              return item.contributedBy && item.contributedBy._id === filterValue;
            } else {
              // Filtrar por los demás campos
              const itemValue = item[filterKey];
              return itemValue && itemValue.includes(filterValue);
            }
          });
        }
      });
      setFilteredData(filtered);
    };

    applyFilters();
  }, [activeFilters, data]);

  // Handler Reset Filter
  const handleResetFilter = () => {
    setActiveFilters({});
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold mb-2">{title}</h2>
        <ActionModal
          title={"Agregar nuevo elemento"}
          fields={config.fields}
          functionApi={config.actions.postApi}
        >
          Contribuir <Icon icon={icons.plus} className="ml-2" />
        </ActionModal>
      </div>
      <div className="flex">
        {/* Sección de filtros */}
        {
          filter && (
            <div className="w-1/4 p-4 border-r border-gray-200">
              <FilterSection filters={config.filters} onFilterChange={handleFilterChange} isPending={isFilterPending} />
              <button onClick={handleResetFilter}
                className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center hover:bg-blue-600 transition-all">
                Limpiar Filtro <Icon icon={icons.plus} className="ml-2" />
              </button>
            </div>
          )
        }

        {/* Sección de elementos */}
        <div className="w-3/4 p-4">
          <ElementList data={filteredData} config={config} isPending={isElementPending} />
        </div>
      </div>
    </>
  );
};

SectionWFilters.propTypes = {
  title: PropTypes.string.isRequired, // El título de la sección
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // ID único de cada elemento
      // Puedes agregar más propiedades aquí según los elementos
    })
  ).isRequired,
  isFilterPending: PropTypes.bool, // Indica si los filtros están cargando
  isElementPending: PropTypes.bool, // Indica si los elementos están cargando
  config: PropTypes.shape({
    activeFilter: PropTypes.object, // Filtros activos
    filters: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string,
      })
    ), // Configuración de los filtros
    fields: PropTypes.arrayOf(PropTypes.object), // Campos para el modal
    actions: PropTypes.shape({
      postApi: PropTypes.func, // Función API para agregar un nuevo elemento
    }),
  }).isRequired,
  filter: PropTypes.bool // muestra o no los filtros
};

export default SectionWFilters;