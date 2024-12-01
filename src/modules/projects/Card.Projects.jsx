import PropTypes from 'prop-types';
import { Link } from '@tanstack/react-router'

const CardProject = ({ item, config }) => {
  return (
    <div className="p-4 bg-white rounded shadow-lg mx-auto">
      {/* Area Header */}
      <div className="mb-4">
        <div className="mb-4 flex items-center">
          <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
        </div>
        <p className="text-sm italic text-gray-500">Autor: {item.users[0].full_name}</p>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>

      {/* Botónes abrir*/}
      <Link to={`/projects/${item._id}`} rel="noopener noreferrer" className="text-blue-600 underline">
        Ver proyecto
      </Link>
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