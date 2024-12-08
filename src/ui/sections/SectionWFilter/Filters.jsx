import PropTypes from "prop-types";

/**
 * Componente que renderiza una sección de filtros.
 * Permite manejar diferentes tipos de filtros (texto, selección, etc.)
 * 
 * @param {Object} props - Props del componente.
 * @param {Array} props.filters - Lista de configuraciones de filtros.
 * @param {Function} props.onFilterChange - Función para manejar cambios en los filtros.
 * @param {boolean} props.isPending - Indica si los filtros están cargando.
 */

const FilterSection = ({ filters, onFilterChange, isPending }) => {

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

  return (
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
          {filter.type === "select" && (
            <select
              id={filter.key}
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
            >
              <option value="">-- Selecciona --</option>
              {filter.options && renderOptions(filter.options)}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};

FilterSection.propTypes = {
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
  isPending: PropTypes.bool, // Indica si el estado de carga está activo.
};

export default FilterSection;
