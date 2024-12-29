import { Icon } from "@iconify/react/dist/iconify.js";
import PropTypes from "prop-types";
import { icons, styles, variant } from "../../../../config/layout";
import { useState } from "react";

/**
 * Componente que renderiza una sección de filtros.
 * Permite manejar diferentes tipos de filtros (texto, selección, etc.)
 *
 * @param {Object} props - Props del componente.
 * @param {Boolean} props.active - Indica si esta o no el componente activo
 * @param {Array} props.filters - Lista de configuraciones de filtros.
 * @param {Object} props.activeFilters - Filtros actualmente activos.
 * @param {Function} props.onFilterChange - Función para manejar cambios en los filtros.
 * @param {Function} props.onReset - Función para manejar el reseteo de filtros.
 * @param {boolean} props.isPending - Indica si los filtros están cargando.
 */

const FilterSection = ({ active = true, activeFilters, filters, onFilterChange, onReset, isPending }) => {
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar visibilidad en pantallas pequeñas

  if (isPending) { return <div className="text-center text-gray-500">Cargando...</div>; }

  // Renderiza las opciones de un filtro tipo `select`.
  const renderOptions = (options) => {
    return options.map((option) =>
      typeof option === "object" ? (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ) : (
        <option key={option} value={option}>
          {option}
        </option>
      )
    );
  };

  if (active) return (
    <div className="w-full md:w-2/5 lg:w-1/5 p-4 border-r border-gray-200">
      {/* Area especial en pantallas pequeñas*/}
      <div className="flex md:hidden items-center justify-between w-full ">

        {/* Botón para mostrar/ocultar los filtros */}
        <button
          className="px-4 py-2 text-primary font-semibold"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? "Ocultar Filtros" : "Mostrar Filtros"}
          {/* TODO Icono a mejorar */}
          <Icon
            icon={isVisible ? icons.collapse : icons.expand}
            className="ml-2 text-lg"
          />
        </button>

        {/* Botón para resetear los filtros */}
        <div className="flex justify-center items-center">
          <button
            onClick={onReset}
            className={`${styles.button} ${variant.primary} w-full sm:w-auto`}
          >
            Limpiar Filtro
            {/* TODO Icono a mejorar */}
            <Icon icon={icons.reset} className="ml-2 inline-block " />
          </button>
        </div>
      </div>

      {/* Contenedor de filtros */}
      <div className={`${isVisible ? "block" : "hidden"} md:block mt-4 transition-all`}>
        <h3 className="text-lg font-semibold mb-4">Filtros</h3>

        {filters.map((filter) => (
          <div key={filter.key} className="mb-4 flex md:block">
            <label className="mb-2 pr-4 w-5/12 sm:w-1/4 md:w-full">{filter.label}</label>

            {filter.type === "text" && (
              <input
                id={filter.key}
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder={`Ingresa ${filter.label.toLowerCase()}`}
                value={activeFilters[filter.key] || ""}
                onChange={(e) => onFilterChange(filter.key, e.target.value)}
              />
            )}

            {filter.type === "select" && (
              <select
                id={filter.key}
                className="w-full p-2 border border-gray-300 rounded"
                multiple={filter.allowMultiple}
                value={
                  filter.allowMultiple
                    ? activeFilters[filter.key] || []
                    : activeFilters[filter.key] || ""
                }
                onChange={(e) => {
                  const selectedOptions = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  onFilterChange(
                    filter.key,
                    filter.allowMultiple
                      ? selectedOptions
                      : selectedOptions[0] || ""
                  );
                }}
              >
                {!filter.allowMultiple && (
                  <option value="">Por defecto</option>
                )}
                {filter.options && renderOptions(filter.options)}
              </select>
            )}
          </div>
        ))}
      </div>

      {/* Botón para resetear los filtros */}
      <div className="hidden md:flex justify-center items-center">
        <button
          onClick={onReset}
          className={`${styles.button} ${variant.primary} w-full sm:w-auto`}
        >
          Limpiar Filtro
          {/* TODO Icono a mejorar */}
          <Icon icon={icons.reset} className="ml-2 inline-block " />
        </button>
      </div>
    </div>
  );

  return null
};

FilterSection.propTypes = {
  active: PropTypes.bool, // Indica si la sección está activa.
  activeFilters: PropTypes.object.isRequired, // Filtros activos actualmente.
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired, // Clave única del filtro.
      label: PropTypes.string.isRequired, // Etiqueta mostrada al usuario.
      type: PropTypes.oneOf(["text", "select"]).isRequired, // Tipo de filtro.
      allowMultiple: PropTypes.bool, // Permite múltiples selecciones.
      options: PropTypes.arrayOf(PropTypes.any), // Opciones para los select.
    })
  ).isRequired,
  onFilterChange: PropTypes.func.isRequired, // Función de manejo de cambio.
  onReset: PropTypes.func.isRequired, // Función de manejo del reseteo.
  isPending: PropTypes.bool, // Indica si el estado de carga está activo.
};

export default FilterSection;