import { Icon } from "@iconify/react/dist/iconify.js";
import PropTypes from "prop-types";
import { icons, styles, variant } from "../../../../config/layout";

/**
 * Componente que renderiza una sección de filtros.
 * Permite manejar diferentes tipos de filtros (texto, selección, etc.)
 * 
 * @param {Object} props - Props del componente.
 * @param {Array} props.filters - Lista de configuraciones de filtros.
 * @param {Function} props.onFilterChange - Función para manejar cambios en los filtros.
 * @param {boolean} props.isPending - Indica si los filtros están cargando.
 */

const FilterSection = ({ active, filters, onFilterChange, onReset, isPending }) => {

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
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                    onFilterChange(filter.key, filter.allowMultiple ? selectedOptions : selectedOptions[0]);
                  }}
                >
                  <option value="" disabled>
                    -- Selecciona --
                  </option>
                  {filter.options && renderOptions(filter.options)}
                </select>
              )
            }
          </div>
        ))}
      </div>
      <button
        onClick={onReset}
        className={`${styles.button} ${variant.primary}`}>
        Limpiar Filtro
        <Icon icon={icons.reset} className="ml-2 inline-block" />
      </button>
    </div>
  );

  return null
};

FilterSection.propTypes = {
  active: PropTypes.bool.isRequired, //Indica si se habilitan o no
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired, // Clave única del filtro.
      label: PropTypes.string.isRequired, // Etiqueta mostrada al usuario.
      type: PropTypes.oneOf(["text", "select"]).isRequired, // Tipo de filtro.
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
