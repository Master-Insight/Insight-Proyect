import { createFileRoute } from '@tanstack/react-router';
import { serviceByIdQueryOptions } from '../../data/Services.Data';
import { useSuspenseQuery } from '@tanstack/react-query';
import Frame from '../../ui/Divs/Frame';
import BackButton from '../../ui/buttons/BackButton2';

export const Route = createFileRoute('/_public/services_/$slug')({
  loader: async ({ context: { queryClient }, params: { slug } }) => {
    const service = await queryClient.ensureQueryData(serviceByIdQueryOptions(slug));
    return { service };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const slug = Route.useParams().slug;
  const { data: service, isLoading } = useSuspenseQuery(serviceByIdQueryOptions(slug)); // SERVICES

  if (isLoading) {
    return <Frame><p>Cargando detalles del servicio...</p></Frame>;
  }

  const {
    title,
    description,
    image,
    characteristics,
    tags,
    price,
    maintenance,
  } = service;

  return (
    <Frame>
      <BackButton />
      <div className="p-4">
        {/* Imagen del servicio */}
        <img
          src={image}
          alt={`Imagen de ${title}`}
          className="w-full max-w-md mx-auto rounded shadow-custom mb-6 object-cover"
        />

        {/* Título del servicio */}
        <h1 className="text-3xl font-title text-primary-dark mb-4">{title}</h1>

        {/* Descripción */}
        <p className="text-lg font-subtitle text-gray-700 mb-6">{description}</p>

        {/* Características */}
        <h2 className="text-xl font-semibold text-tertiary mb-2">Características:</h2>
        <ul className="text-gray-600 list-disc pl-5 mb-6">
          {characteristics && characteristics.split(", ").map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        {/* Precio y Mantenimiento */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-primary mb-2">Precio: <span className="text-black">${price}</span></p>
          {maintenance && (
            <p className="text-lg font-semibold text-tertiary">Costo de mantenimiento: <span className="text-black">${maintenance}</span></p>
          )}
        </div>

        {/* Etiquetas */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}
