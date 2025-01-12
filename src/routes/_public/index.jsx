import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import FrameAbs from '../../ui/Divs/FrameAbs'

export const Route = createFileRoute('/_public/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <FrameAbs>
      {/* Hero inicial */}
      <div className="bg-gradient-to-r from-gray-200 via-gray-100 via-20% to-white
      text-white text-center py-16 rounded-3xl flex items-center flex-col">
        <div className="w-full">
          <img src="/img/Fondo1.webp" className="w-full h-60 object-cover rounded-3xl" alt="Fondo Insight" />
        </div>
        <div className="w-2/3 flex flex-col max-w-2xl mx-auto mt-8">
          <h1 className="text-4xl text-primary font-bold mb-4">
            Bienvenido a Insight
          </h1>
          <p className="mb-6 text-primary">
            Transformamos ideas en soluciones digitales. Únete a nosotros o
            descubre cómo podemos llevar tu negocio al siguiente nivel.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/services" className="bg-primary hover:bg-primary-darker text-white py-2 px-4 rounded">
              Descubre nuestros servicios
            </Link>
            <Link to="/introit" className="bg-tertiary hover:bg-tertiary-darker text-white py-2 px-4 rounded">
              Únete como Desarrollador IT
            </Link>
          </div>
        </div>
      </div>

      {/* 2da Sección */}
      <section id="home" className="text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Por qué elegir Insight</h2>
        <p className="mb-6">
          Somos un equipo de expertos en tecnología dedicados a crear soluciones que impulsen tu negocio.
          Y como nos tomamos muy en serio tu necesidad y tu tiempo, queremos hacer las soluciones más simples y efectivas para superar tus expectativas.
        </p>
        <p>Redoblemos la apuesta juntos.</p>
        <img src="/img/maxim-hopman-8vn4KvfU640-unsplash.jpg" alt="Innovación Insight" className="mx-auto w-1/3 rounded-lg shadow-lg" />
      </section>

      {/* Sección Servicios */}
      <section id="services" className="bg-gray-50 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Desarrollo Web</h3>
            <p>Aplicaciones personalizadas con tecnologías modernas.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Diseño UX/UI</h3>
            <p>Experiencias visuales únicas y centradas en el usuario.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Marketing Digital</h3>
            <p>Estrategias efectivas para aumentar tu presencia online.</p>
          </div>
        </div>
      </section>

      {/* Sección Portafolio */}
      <section id="portfolio" className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Nuestro Portafolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
          <img src="/assets/project1.jpg" alt="Proyecto 1" className="rounded-lg shadow" />
          <img src="/assets/project2.jpg" alt="Proyecto 2" className="rounded-lg shadow" />
          <img src="/assets/project3.jpg" alt="Proyecto 3" className="rounded-lg shadow" />
          <img src="/assets/project4.jpg" alt="Proyecto 4" className="rounded-lg shadow" />
        </div>
      </section>
    </FrameAbs>
  )
}