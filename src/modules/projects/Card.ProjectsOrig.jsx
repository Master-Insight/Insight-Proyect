import PropTypes from 'prop-types';
import { Link } from '@tanstack/react-router'
import ActionModal from '../../ui/modal/ActionModal';
import { icons } from '../../../config/layout';
import { Icon } from '@iconify/react/dist/iconify.js';

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
    <div className="w-full md:w-5/12 p-4 bg-white rounded shadow-lg mx-auto flex flex-col">
      {/* Area Header */}
      <div className="mb-4">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-semibold mb-1 text-primary-darker">{title}</h2>
          <div className='flex items-center text-primary-light'>
            {item.deploy
              ? <Link to={item.deploy} title={`Deploy: ${item.deploy}`} target="_blank" >
                <Icon icon={icons.deploy} className=' size-6 ' />
              </Link>
              : null
            }
            {item.repository
              ? <Link to={item.repository} title={`Repository: ${item.repository}`} target="_blank" >
                <Icon icon={icons.repository} className=' size-6 ' />
              </Link>
              : null
            }
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2 italic">Participantes: {renderAssignedToButtons()}</div>
        {description && <p className="mt-4 text-sm text-gray-500 italic">{description}</p>}
      </div>

      {/* Area de Botones*/}
      <div className="flex space-x-4 mb-4 justify-center">
        {/* Botónes abrir*/}
        <Link to={`/projects/${_id}`} rel="noopener noreferrer" className="px-4 py-2 bg-primary hover:bg-primary-darker text-white rounded-md transition-all">
          Ver proyecto
        </Link>

        {/* Botónes editar*/}
        {!config.blockEdit && <ActionModal
          title={"Editar"}
          fields={config.fields}
          functionApi={config.actions.putApi}
          defaultValues={item}
        />}

        {/* Botónes eliminar*/}
        {!config.blockEdit && <button onClick={() => config.actions.delApi(_id)} className="px-4 py-2 bg-red-700 hover:bg-red-900 text-white rounded-md transition-all">
          Eliminar
        </button>}
      </div>
    </div>
  )
}

CardProject.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    deploy: PropTypes.string,
    repository: PropTypes.string,
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