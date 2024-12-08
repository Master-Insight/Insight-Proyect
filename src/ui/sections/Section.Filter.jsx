import PropTypes from "prop-types";
import { Icon } from '@iconify/react';
import { useState, useEffect } from "react";
import { icons } from "../../../config/layout";
import ElementList from "./SectionWFilter/Elements";
import FilterSection from "./SectionWFilter/Filters";
import ActionModal from "../modal/ActionModal";

/**
 * Componente principal que gestiona una sección con filtros y lista de elementos.
 */

const SectionWFilters = ({ title, data,
  isFilterPending = false, isElementPending = false, filter = true,
  config = {
    activeFilter: {},
    filters: [],
    fields: [],
    actions: {}
  }, }) => {

  // Estados de control
  const [activeFilters, setActiveFilters] = useState(config.activeFilter || {}); // Objeto con Filtros activos
  const [filteredData, setFilteredData] = useState(data); // Array de Datos filtrados
  console.log("activeFilters:", activeFilters);

  // Handler de cambios en los filtros
  const handleFilterChange = (filterKey, filterValue) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: filterValue,
    }));
  };

  // Handler que Reinicia todos los filtros activos
  const handleResetFilter = () => {
    setActiveFilters(config.activeFilter);
  };

  // useEffect que actualiza los datos cada vez que los filtros cambian
  useEffect(() => {
    const applyFilters = () => {
      // Copia de los datos originales
      let filtered = [...data];

      Object.entries(activeFilters).forEach(([filterKey, filterValue]) => {
        if (filterValue) {
          filtered = filtered.filter((item) => {
            const itemValue =
              filterKey === "user"
                ? item.contributedBy?._id
                : item[filterKey];

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
      setFilteredData(filtered);
    };

    applyFilters();
  }, [activeFilters, data]);

  return (
    <>
      {/* Encabezado (titulo y boton de agregar elemento)*/}
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
      {/* Cuerpo ( filtros / mapero de card )*/}
      <div className="flex">
        {/* Filtros */}
        <FilterSection
          active={filter}
          activeFilters={activeFilters}
          filters={config.filters}
          onFilterChange={handleFilterChange}
          isPending={isFilterPending}
          onReset={handleResetFilter}
        />

        {/* Mapeo de cards */}
        <div className="w-4/5 p-4 flex flex-col gap-2">
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
        label: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["text", "select"]),
        options: PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.any,
            }),
          ])
        ),
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