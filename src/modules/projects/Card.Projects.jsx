import PropTypes from 'prop-types';
import { Link } from '@tanstack/react-router'
import ActionModal from '../../ui/modal/ActionModal';

const CardProject = ({ item, config }) => {
  return (
    <div className="w-full p-4 bg-white rounded shadow-lg mx-auto">
      {/* Area Header */}
      <div className="mb-4">
        <div className="mb-4 flex items-center">
          <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
        </div>
        <p className="text-sm italic text-gray-500">Autor: {item.users[0].full_name}</p>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>

      {/* Area de Botones*/}
      <div className="flex space-x-4 mb-4">
        {/* Botónes abrir*/}
        <Link to={`/projects/${item._id}`} rel="noopener noreferrer" className="px-4 py-2 bg-primary hover:bg-primary-darker text-white rounded-md transition-all">
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
        <button onClick={() => config.actions.delApi(item._id)} className="px-4 py-2 bg-red-700 hover:bg-red-900 text-white rounded-md transition-all">
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

// Valor por defecto
// CardProject.defaultProps = {};

export default CardProject