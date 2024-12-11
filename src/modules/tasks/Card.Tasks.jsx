import PropTypes from 'prop-types';
import { Link } from '@tanstack/react-router'
import ActionModal from '../../ui/modal/ActionModal';
import { styles, variant } from '../../../config/layout';
import { TASK_PRIORITY, TASK_PRIORITY_COLOR, TASK_PRIORITY_ICO, TASK_STATUS, TASK_STATUS_COLOR } from './mapValues';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

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

  const [userChanged, setUserChanged] = useState(false);
  const [data, setData] = useState({
    _id,
    status,
    teststatus,
    priority
  })

  const statusOptions = TASK_STATUS
  const priorityOptions = TASK_PRIORITY

  // Helper para obtener los nombres de los asignados
  const renderAssignedToButtons = () => {
    if (!assignedTo || assignedTo.length === 0) {
      return (
        <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md text-xs ">
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

  // Función genérica para manejar cambios en cualquier select
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setUserChanged(true);
  };

  // useEffect para invocar putApi solo cuando data cambie y el usuario haya hecho un cambio
  useEffect(() => {
    if (userChanged && data) {
      // Aquí se incluye un debounce para limitar las llamadas.
      const timeout = setTimeout(() => {
        console.log("card: ", data);
        config.actions.putApi(data);
        setUserChanged(false);
      }, 300); // Espera 300 ms después del último cambio antes de ejecutar putApi

      return () => clearTimeout(timeout);
    }
  }, [data, userChanged, config.actions]);


  return (
    <div className="w-full lg:w-5/12 flex flex-col md:flex-row justify-between p-4 bg-white rounded-lg shadow-md mx-auto">
      {/* Header */}
      <div className="mb-4 w-4/5">
        <div className="mb-2 flex items-center">
          <h2 className="text-l font-semibold text-primary-darker">{title}</h2>
        </div>
        <div className=''>
          <div className='flex text-xs justify-between gap-2'>

            {/* Prioridad */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <p>Prioridad:</p>
                <span className={`${TASK_PRIORITY_COLOR[data.priority]} font-medium flex items-center`}>
                  <Icon icon={TASK_PRIORITY_ICO[data.priority]} className="mr-1" /> {/* Ícono dinámico */}
                  {data.priority} {/* Texto dinámico */}
                </span>
              </div>

              {/* Select con ícono */}
              <div className="relative flex items-center">
                <select
                  name='priority'
                  id='priority'
                  value={data.priority}
                  onChange={handleSelectChange}
                  className='w-3'
                >
                  {priorityOptions.map((elem) => (<option key={"priority" + elem} value={elem}> {elem} </option>))}
                </select>
              </div>
            </div>

            {/* Estado */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <p>Estado:</p>
                <span className={`${TASK_STATUS_COLOR[data.status]} p-1 rounded font-medium flex items-center`}>
                  {data.status} {/* Texto dinámico */}
                </span>
              </div>

              {/* Select con ícono */}
              <div className="relative flex items-center">
                <select
                  name='status'
                  id='status'
                  value={data.status}
                  onChange={handleSelectChange}
                  className='w-3'
                >
                  {statusOptions.map((elem) => (<option key={"status" + elem} value={elem}> {elem} </option>))}
                </select>
              </div>
            </div>

            {/* Testeo */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <p>Testeo:</p>
                <span className={`${TASK_STATUS_COLOR[data.teststatus]} p-1 rounded font-medium flex items-center`}>
                  {data.teststatus} {/* Texto dinámico */}
                </span>
              </div>

              {/* Select con ícono */}
              <div className="relative flex items-center">
                <select
                  name='teststatus'
                  id='teststatus'
                  value={data.teststatus}
                  onChange={handleSelectChange}
                  className='w-3'
                >
                  {statusOptions.map((elem) => (<option key={"teststatus" + elem} value={elem}> {elem} </option>))}
                </select>
              </div>
            </div>

          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2">{renderAssignedToButtons()}</div>
        </div>
        {description && <p className="text-sm text-gray-600 mt-2">{description}</p>}
      </div>

      {/* Botones*/}
      <div className="md:w-28 flex md:flex-col justify-between mb-4  gap-1">
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
      }),
    ),
    priority: PropTypes.string,
    status: PropTypes.string,
    teststatus: PropTypes.string,
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