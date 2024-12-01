import PropTypes from 'prop-types';
import { Link } from '@tanstack/react-router'
import ActionModal from '../../ui/modal/ActionModal';

const CardTask = ({ item, config }) => {
  const { _id, title, description, assignedTo } = item;

  // Helper para obtener los nombres de los asignados
  const renderAssignedToButtons = () => {
    if (!assignedTo || assignedTo.length === 0) {
      return (
        <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md text-sm">
          No asignado
        </span>
      );
    }

    return assignedTo.map((person, index) => (
      <span
        key={index}
        className="inline-block px-3 py-1 bg-green-200 text-green-800 rounded-md text-sm mr-2 mb-2"
      >
        {person.full_name || 'Nombre no disponible'}
      </span>
    ));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="mb-4">
        <div className="mb-4 flex items-center">
          <h2 className="text-xl font-semibold text-primary-darker">{title}</h2>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">{renderAssignedToButtons()}</div>
        {description && <p className="text-sm text-gray-600 mt-2">{description}</p>}
      </div>

      {/* Botones*/}
      <div className="flex space-x-4 mb-4">
        {/* Botón abrir*/}
        <Link
          to={`/tasks/${item._id}`}
          rel="noopener noreferrer"
          className="px-4 py-2 bg-primary hover:bg-primary-darker text-white rounded-md transition-all">
          Ver tarea
        </Link>

        {/* Botón editar*/}
        <ActionModal
          title={"Editar"}
          fields={config.fields}
          functionApi={config.actions.putApi}
          defaultValues={item}
        />

        {/* Botón eliminar*/}
        <button onClick={() => config.actions.delApi(item._id)} className="px-4 py-2 bg-red-700 hover:bg-red-900 text-white rounded-md transition-all">
          Eliminar
        </button>
      </div>
    </div>
  )
}

CardTask.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    assignedTo: PropTypes.arrayOf(
      PropTypes.shape({
        full_name: PropTypes.string,
      })
    ),
  }).isRequired,
  config: PropTypes.shape({
    fields: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      putApi: PropTypes.func.isRequired,
      delApi: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CardTask;