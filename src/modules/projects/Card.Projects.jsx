import PropTypes from 'prop-types';
import { Link } from '@tanstack/react-router'
import ActionModal from '../../ui/modal/ActionModal';

const CardProject = ({ item, config }) => {
  const {
    _id,
    title,
    users,
    description,
  } = item;

  // Helper para obtener los nombres de los asignados
  const renderAssignedToButtons = () => {
    if (!users || users.length === 0) {
      return (
        <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md text-xs ">
          No asignado
        </span>
      );
    }

    return users.map((person, index) => (
      <span
        key={index}
        className="inline-block px-3 py-1 bg-green-200 text-green-800 rounded-md text-sm mr-2 mb-2"
      >
        {person.full_name || 'Nombre no disponible'}
      </span>
    ));
  };

  return (
    <div className="w-full lg:w-5/12 p-4 bg-white rounded shadow-lg mx-auto">
      {/* Area Header */}
      <div className="mb-4">
        <div className="mb-4 flex items-center">
          <h2 className="text-xl font-semibold mb-1">{title}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2 italic">Participantes: {renderAssignedToButtons()}</div>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>

      {/* Area de Botones*/}
      <div className="flex space-x-4 mb-4">
        {/* Botónes abrir*/}
        <Link to={`/projects/${_id}`} rel="noopener noreferrer" className="px-4 py-2 bg-primary hover:bg-primary-darker text-white rounded-md transition-all">
          Ver proyecto
        </Link>

        {/* Botónes editar*/}
        <ActionModal
          title={"Editar"}
          fields={config.fields}
          functionApi={config.actions.putApi}
          defaultValues={item}
        />

        {/* Botónes eliminar*/}
        <button onClick={() => config.actions.delApi(_id)} className="px-4 py-2 bg-red-700 hover:bg-red-900 text-white rounded-md transition-all">
          Eliminar
        </button>
      </div>
    </div>
  )
}

CardProject.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        full_name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  config: PropTypes.object,
};

export default CardProject