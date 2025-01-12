import { createFileRoute, Link } from '@tanstack/react-router'
import FrameAbs from '../../ui/Divs/FrameAbs'

export const Route = createFileRoute('/_publicit/introit')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <FrameAbs>
      <div className="bg-gradient-to-r from-gray-200 via-gray-100 via-20% to-white text-center py-16 rounded-3xl flex items-center flex-col">
        {/* Imagen Hero */}
        <div className="w-full">
          <img
            src="/img/Fondo2.webp"
            className="w-full h-60 object-cover rounded-3xl"
            alt="Desarrolladores Insight"
          />
        </div>

        {/* Título y Botones */}
        <div className="w-2/3 flex flex-col max-w-2xl mx-auto mt-8">
          <h1 className="text-4xl text-primary font-bold mb-4">
            Únete a Insight Developers
          </h1>
          <p className="mb-6 text-primary">
            Sé parte de una comunidad que valora el talento, la innovación y el crecimiento constante. Desarrolla tu potencial trabajando en proyectos que marcan la diferencia.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/participa"
              className="bg-primary hover:bg-primary-darker text-white py-2 px-4 rounded"
            >
              Aplica Ahora
            </Link>
            <Link
              to="/"
              className="bg-tertiary hover:bg-tertiary-darker text-white py-2 px-4 rounded"
            >
              o vuelve a la vista Clientes
            </Link>
          </div>
        </div>
      </div>

      {/* Sección Ventajas */}
      <section id="advantages" className="text-center py-16">
        <h2 className="text-3xl font-bold mb-4">¿Por qué unirte a Insight?</h2>
        <p className="mb-6">
          En Insight, nos enfocamos en el crecimiento de nuestros desarrolladores. Ofrecemos un entorno donde puedes colaborar, aprender y avanzar profesionalmente.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2 text-primary">Proyectos Retadores</h3>
            <p>Trabaja en soluciones innovadoras y escala tu conocimiento técnico.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2 text-primary">Colaboración Internacional</h3>
            <p>Únete a un equipo global de profesionales enfocados en el éxito colectivo.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2 text-primary">Aprendizaje Continuo</h3>
            <p>Accede a recursos y mentorías que te ayudarán a crecer día a día.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white text-center py-16 rounded-b-3xl">
        <h2 className="text-3xl font-bold mb-4">¿Estás listo para unirte?</h2>
        <p className="mb-6">
          Descubre las oportunidades que Insight tiene para ti. Juntos, podemos alcanzar nuevas alturas.
        </p>
        <Link
          to="/apply"
          className="bg-tertiary hover:bg-tertiary-darker text-white py-3 px-6 rounded"
        >
          Comienza Ahora
        </Link>
      </section>
    </FrameAbs>
  );
}