import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import FrameAbs from '../../ui/Divs/FrameAbs'

export const Route = createFileRoute('/_public/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (<FrameAbs>

    {/* Sección About Us */}
    <section id="about" className="bg-gray-100 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">¿Quiénes Somos?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4 text-primary">Nuestra Esencia</h3>
            <p className="mb-4">
              Somos una asociación exclusiva de profesionales que comparten una visión de compromiso, integridad y colaboración. Nos destacamos por nuestra calidad, claridad en la comunicación y profundo respeto por el trabajo en equipo.
            </p>
            <h3 className="text-xl font-bold mb-4 text-primary">Nuestra Diferenciación</h3>
            <p>
              Nos diferenciamos al superar las expectativas de nuestros clientes mediante transparencia y soluciones basadas en datos. Solo aceptamos a los mejores, asegurando que cada miembro de nuestro equipo sea confiable y comprometido con la excelencia.
            </p>
          </div>
          <div>
            <img
              src="/img/riccardo-annandale-7e2pe9wjL9M-unsplash.jpg"
              alt="Equipo Insight"
              className="rounded-3xl shadow-lg mx-auto w-full"
            />
          </div>
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-xl font-bold mb-4 text-primary">Nuestra Verdad</h3>
          <p className="max-w-3xl mx-auto mb-4">
            Creemos en la profesionalización basada en datos, fomentando un entorno de crecimiento personal y colectivo. Nuestro objetivo es ser íntegros y confiables, cumpliendo promesas alcanzables sin comprometer la calidad.
          </p>
          <p className="max-w-3xl mx-auto">
            En Insight, luchamos contra sistemas que no satisfacen necesidades reales y promovemos la transparencia como clave del éxito colectivo.
          </p>
        </div>
      </div>
    </section>

  </FrameAbs>)
}
