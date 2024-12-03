import PropTypes from 'prop-types';
import { Link } from '@tanstack/react-router'
import ActionModal from '../../ui/modal/ActionModal';
import { styles, variant } from '../../../config/layout';

const cStyles = {
  button: " text-xs w-full"
}

const CardTask = ({ item, config }) => {
  const {
    _id,
    title,
    priority,
    status,
    teststatus,
    assignedTo,
    description
  } = item;

  // Helper para obtener los nombres de los asignados
  const renderAssignedToButtons = () => {
    if (!assignedTo || assignedTo.length === 0) {
      return (
        <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md text-xs">
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
    <div className="flex justify-between p-4 bg-white rounded-lg shadow-md mx-auto">
      {/* Header */}
      <div className="mb-4 w-4/5">
        <div className="mb-2 flex items-center">
          <h2 className="text-l font-semibold text-primary-darker">{title}</h2>
        </div>
        <div className=''>
          <div className='flex text-xs justify-between gap-2'>
            <p>Prioridad: {priority}</p>
            <p>Estado: {status}</p>
            <p>Testeo: {teststatus}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2">{renderAssignedToButtons()}</div>
        </div>
        {description && <p className="text-sm text-gray-600 mt-2">{description}</p>}
      </div>

      {/* Botones*/}
      <div className="w-28 flex flex-col mb-4  gap-1">
        {/* Botón abrir*/}
        <Link
          to={`/tasks/${item._id}`}
          rel="noopener noreferrer"
          className={styles.button + variant.primary + cStyles.button}>
          Ver tarea
        </Link>

        {/* Botón editar*/}
        <ActionModal
          title={"Editar"}
          fields={config.fields}
          functionApi={config.actions.putApi}
          defaultValues={item}
          cssbutton={styles.button + " " + variant.primary + cStyles.button}
        />

        {/* Botón eliminar*/}
        <button
          onClick={() => config.actions.delApi(item._id)}
          className={styles.button + variant.danger + cStyles.button}>
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