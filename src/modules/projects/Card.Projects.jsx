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

  // Obtener iniciales
  function obtenerIniciales(nombreCompleto) {
    // Dividir el nombre en palabras
    const palabras = nombreCompleto.trim().split(/\s+/);

    // Obtener la primera letra de cada palabra y convertirla a mayúscula
    const iniciales = palabras.map(palabra => palabra[0].toUpperCase()).join('');

    return iniciales;
  }

  // Helper para obtener los nombres de los asignados
  const renderAssignedToButtons = () => {
    if (!users || users.length === 0) {
      return (
        <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md text-xs ">
          No asignado
        </span>
      );
    }

    return users.map((person, index) => {
      return (
        <span
          key={index}
          className="inline-block px-3 py-1 bg-green-200 text-green-800 rounded-md text-xs"
        >
          {person.full_name ? obtenerIniciales(person.full_name) : 'Nombre no disponible'}
        </span>
      )
    });

  };

  // Renderizado componente
  return (
    <div className="w-full px-4 py-2 bg-white rounded shadow-lg mx-auto flex flex-col">
      <div className="w-full grid grid-cols-12 grid-rows-1 gap-4">
        {/* Links */}
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

        {/* Titulo Col*2 */}
        <h2 className="col-span-5 text-xl font-semibold mb-1 text-primary-darker">{title}</h2>


        {/* Participantes */}
        <div className="col-span-3 flex flex-wrap justify-end items-center gap-2 italic">
          {renderAssignedToButtons()}
        </div>

        {/* Area de Botones*/}
        <div className="col-span-3 flex flex-wrap justify-end gap-2">
          {/* Botónes abrir*/}
          <Link
            to={`/projects/${_id}`} rel="noopener noreferrer"
            className="px-3 py-1 bg-primary hover:bg-primary-darker text-white rounded-md text-xs transition-all">
            <Icon icon={"icon-park-outline:eyes"} className=' size-4 ' />
          </Link>

          {/* Botónes editar*/}
          {!config.blockEdit && <ActionModal
            fields={config.fields}
            functionApi={config.actions.putApi}
            defaultValues={item}
            extraCssbutton="px-3 py-1 bg-primary hover:bg-primary-darker text-white rounded-md text-xs transition-all"
          />}

          {/* Botónes eliminar*/}
          {!config.blockEdit && <button
            onClick={() => config.actions.delApi(_id)}
            className="px-3 py-1 bg-red-700 hover:bg-red-900 text-white rounded-md transition-all"
          >
            <Icon icon={"material-symbols:delete"} className=' size-4 ' />
          </button>}

        </div>
      </div>
      {description && <p className="mt-2 text-sm text-gray-500 italic">{description}</p>}
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