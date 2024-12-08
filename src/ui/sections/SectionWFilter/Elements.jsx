import PropTypes from 'prop-types';

// Mapea los elementos pasados y si no hay o estan cargando muestra un mensaje (el config es pasado a la card)
const ElementList = ({ data, config, isPending }) => {

  if (isPending) { return <div className="text-center text-gray-500">Cargando...</div>; }

  return (
    <>
      {data.length === 0 ? (
        <p>No hay elementos disponibles.</p>
      ) : (
        data.map((item) => (
          <config.card
            key={item._id}
            item={item}
            config={config}
          />
        ))
      )}
    </>
  );
};

ElementList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // ID único de cada elemento
    })
  ).isRequired, // Lista de datos
  config: PropTypes.shape({
    card: PropTypes.elementType.isRequired, // Componente a usar para renderizar cada elemento (debe ser un componente React)
  }).isRequired,
  isPending: PropTypes.bool, // Indica si los datos están cargándose
};

export default ElementList;
