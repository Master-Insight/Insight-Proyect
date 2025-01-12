import { createFileRoute, Link } from '@tanstack/react-router';
import FrameAbs from '../../ui/Divs/FrameAbs';
import BackButton from '../../ui/buttons/BackButton2';
import { useState } from 'react';

export const Route = createFileRoute('/_publicit/participa')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <FrameAbs>
      {/* Botón de volver atrás */}
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>

      {/* Nuestra Oferta */}
      <div className="flex flex-col items-center justify-center px-4 py-8 bg-gray-100">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          ¿Eres un desarrollador IT?
        </h1>
        <p className="mt-4 text-lg text-center text-gray-700">
          Te invitamos a formar parte de una asociación con un propósito claro:
          crear oportunidades y promover la colaboración profesional bajo un
          estándar de excelencia. Aquí, tú puedes concentrarte en lo que amas
          hacer mientras nosotros te conectamos con nuevas oportunidades.
        </p>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          <BenefitCardWithInfo
            title="Participa en proyectos"
            description="El concepto no se basa en tu experiencia, sino en tu dedicación. Si estás listo para ponerte en acción, nosotros te brindamos un espacio con proyectos reales de fines comerciales. ¿Estás preparado para asumir el reto?"
            infoContent="Al unirte, tendrás acceso a proyectos desafiantes donde podrás trabajar con empresas reales, desarrollando habilidades en un entorno profesional con fines comerciales."
          />
          <BenefitCardWithInfo
            title="Únete a nuestra Comunidad"
            description="Un espacio que fomenta el progreso colectivo, promoviendo la cooperación y el crecimiento. Demuestra tus habilidades, respáldate con nuestra marca y forma parte de una red de profesionales valorados."
            infoContent="Nuestra comunidad está diseñada para impulsar tu visibilidad y profesionalismo. Podrás conectar con otros expertos, intercambiar ideas, colaborar en proyectos y fortalecer tu reputación con el apoyo de nuestra marca."
          />
          <BenefitCardWithInfo
            title="Impulsa tus proyectos"
            description="Convierte tus ideas en oportunidades. Con Insight, conectamos tus soluciones con clientes interesados, mientras tú te enfocas en lo que mejor haces."
            infoContent="Te ayudamos a transformar tus proyectos existentes en soluciones reutilizables y comercializables. Gana exposición en el mercado y amplía tu alcance con el respaldo de nuestra plataforma."
          />
        </div>

        {/* Nuestros Valores */}
        <ValuesSection />

        {/* Despedida */}
        <div className="mt-8">
          <a
            href="https://forms.gle/P4PvKjpNs5NN7wFDA"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-lg font-semibold text-white bg-primary rounded-md shadow-md hover:bg-primary-darker"
          >
            ¡Únete ahora y transforma tu carrera!
          </a>
        </div>
      </div>
    </FrameAbs>
  );
}

function BenefitCardWithInfo({ title, description, infoContent }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="mt-2 text-gray-600">{description}</p>
      <button
        className="mt-4 text-blue-600 underline hover:text-blue-800"
        onClick={() => setShowInfo(!showInfo)}
      >
        {showInfo ? 'Ocultar detalles' : 'Más información'}
      </button>
      {showInfo && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-300 rounded-md">
          <p className="text-sm text-gray-700">{infoContent}</p>
        </div>
      )}
    </div>
  );
}

function ValuesSection() {
  return (
    <div className="mt-12 w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-center text-blue-500">
        ¿Por qué unirte a nosotros?
      </h2>
      <ul className="mt-6 space-y-4">
        <ValueItem
          icon="🌟"
          title="Excelencia Garantizada"
          description="Nos enfocamos en la calidad, respetando los estándares más altos en cada proyecto."
        />
        <ValueItem
          icon="🤝"
          title="Colaboración Real"
          description="Fomentamos un entorno de apoyo y trabajo en equipo donde todos crecen."
        />
        <ValueItem
          icon="📈"
          title="Oportunidades de Crecimiento"
          description="Tendrás acceso a proyectos desafiantes que impulsarán tu carrera profesional."
        />
        <ValueItem
          icon="🔒"
          title="Transparencia y Confianza"
          description="Actuamos con integridad, asegurando un ambiente confiable y profesional."
        />
      </ul>
    </div>
  );
}

function ValueItem({ icon, title, description }) {
  return (
    <li className="flex items-start">
      <div className="text-3xl">{icon}</div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </li>
  );
}
