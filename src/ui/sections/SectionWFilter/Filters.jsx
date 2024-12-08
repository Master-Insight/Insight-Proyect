import { Icon } from "@iconify/react/dist/iconify.js";
import PropTypes from "prop-types";
import { icons, styles, variant } from "../../../../config/layout";

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
    <div className="w-1/5 p-4 border-r border-gray-200">
      <div>
        {filters.map((filter) => (
          <div key={filter.key} className="mb-4">

            {/* Muestra la etiqueta del filtro */}
            <label className="block mb-2">{filter.label}</label>

            {/* Campo de texto */}
            {filter.type === "text" && (
              <input
                id={filter.key}
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder={`Ingresa ${filter.label.toLowerCase()}`}
                value={activeFilters[filter.key] || ""} // Valor actual
                onChange={(e) => onFilterChange(filter.key, e.target.value)}
              />
            )}

            {/* Campo de selección */}
            {
              filter.type === "select" && (
                <select
                  id={filter.key}
                  className="w-full p-2 border border-gray-300 rounded"
                  multiple={filter.allowMultiple} // Habilitar selección múltiple si se especifica
                  value={
                    Array.isArray(activeFilters[filter.key])
                      ? activeFilters[filter.key]
                      : activeFilters[filter.key] || []
                  }
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                    onFilterChange(filter.key, selectedOptions.length > 0 ? selectedOptions : null);
                  }}
                >
                  {!filter.allowMultiple && (
                    <option value="">Por defecto</option>
                  )}
                  {filter.options && renderOptions(filter.options)}
                </select>
              )
            }
          </div>
        ))}
      </div>

      {/* Botón para resetear los filtros */}
      <button
        onClick={onReset}
        className={`${styles.button} ${variant.primary}`}
      >
        Limpiar Filtro
        <Icon icon={icons.reset} className="ml-2 inline-block" />
      </button>
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
      options: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            label: PropTypes.string.isRequired, // Nombre visible.
            value: PropTypes.any.isRequired, // Valor asociado.
          }),
        ])
      ), // Opciones para los select.
    })
  ).isRequired,
  onFilterChange: PropTypes.func.isRequired, // Función de manejo de cambio.
  onReset: PropTypes.func.isRequired, // Función de manejo del reseteo.
  isPending: PropTypes.bool, // Indica si el estado de carga está activo.
};

export default FilterSection;