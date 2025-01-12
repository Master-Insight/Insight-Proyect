import { createFileRoute } from '@tanstack/react-router'
import FrameAbs from '../../ui/Divs/FrameAbs';

export const Route = createFileRoute('/_publicit/aboutit')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <FrameAbs>
      {/* Sección About Us */}
      <section id="about" className="bg-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Acerca de Nosotros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-4 text-primary">
                Nuestra Comunidad
              </h3>
              <p className="mb-4">
                Insight es un espacio exclusivo para desarrolladores y
                profesionales de la tecnología que valoran el compromiso,
                la integridad y la colaboración. Nos enfocamos en
                construir una comunidad donde puedas crecer, compartir
                tus habilidades y trabajar en proyectos que marcan la
                diferencia.
              </p>
              <h3 className="text-xl font-bold mb-4 text-primary">
                ¿Qué nos hace únicos?
              </h3>
              <p>
                Somos más que un grupo de profesionales: somos una red
                que trabaja unida para lograr metas comunes. Te
                brindamos respaldo, oportunidades y un entorno donde
                tu talento y dedicación son valorados y potenciados.
              </p>
            </div>
            <div>
              <img
                src="/img/riccardo-annandale-7e2pe9wjL9M-unsplash.jpg"
                alt="Comunidad Insight"
                className="rounded-3xl shadow-lg mx-auto w-full"
              />
            </div>
          </div>
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold mb-4 text-primary">
              Nuestra Filosofía
            </h3>
            <p className="max-w-3xl mx-auto mb-4">
              En Insight creemos en el poder de la colaboración y el
              crecimiento mutuo. Nuestro objetivo es proporcionar un
              espacio donde los desarrolladores puedan conectarse,
              aprender y construir soluciones significativas.
            </p>
            <p className="max-w-3xl mx-auto">
              Aquí, luchamos por proyectos que tienen un propósito real
              y valoramos a cada miembro por su esfuerzo y compromiso.
              La transparencia, el respeto y el trabajo en equipo son
              los pilares de nuestra comunidad.
            </p>
          </div>
        </div>
      </section>
    </FrameAbs>
  );
}
