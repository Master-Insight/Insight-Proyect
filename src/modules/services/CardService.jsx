import dayjs from "dayjs";

const CardService = ({ item, config }) => {
  const {
    slug,
    title,
    description,
    image,
    price,
    characteristics,
    tags,
  } = item;

  // Renderizado componente
  return (
    <div className="w-full p-4 bg-white rounded shadow-lg flex flex-col sm:flex-row gap-4 hover:shadow-xl transition-shadow">
      {/* Imagen del servicio */}
      <img
        src={image}
        alt={`Imagen de ${title}`}
        className="h-32 w-32 sm:h-40 sm:w-40 object-cover rounded"
      />

      {/* Información del servicio */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          {/* Título */}
          <h3 className="font-bold text-xl text-primary mb-2">{title}</h3>

          {/* Descripción */}
          <p className="text-gray-700 mb-4">{description}</p>

          {/* Características */}
          <ul className="text-sm text-gray-600 mb-4 list-disc pl-5">
            {characteristics && characteristics.split(", ").map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          {/* Etiquetas */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Precio */}
        <div className="mt-4 sm:mt-0">
          <p className="text-lg font-semibold text-green-600">
            Precio: ${price.toLocaleString()} ➡️ (esto luego ocultar)
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardService;