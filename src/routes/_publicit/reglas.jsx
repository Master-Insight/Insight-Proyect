import { createFileRoute } from '@tanstack/react-router';
import Frame from '../../ui/Divs/Frame';

export const Route = createFileRoute('/_publicit/reglas')({
  component: RouteComponent,
});

function RouteComponent() {
  const reglas = [
    {
      title: "Compromiso y Cumplimiento",
      items: [
        "Responsabilidad: Cada miembro debe cumplir con los compromisos asumidos en términos de tiempo, calidad y alcance. No se permite abandonar un proyecto o tarea sin previo aviso y sin buscar una solución adecuada.",
        "Calidad: Los trabajos y servicios deben ser entregados con los más altos estándares de calidad. No se permiten resultados a medias o mal realizados.",
        "Evitar Sobrecarga: No se permite aceptar más trabajo del que se puede entregar, ya que esto puede perjudicar al equipo y la reputación de la asociación.",
      ],
    },
    {
      title: "Transparencia y Comunicación",
      items: [
        "Claridad en las Propuestas: Los miembros deben ser claros y honestos al proponer soluciones, delimitando lo que es posible y lo que no. No se permiten promesas vacías.",
        "Flujo de Información: La retención de información relevante está prohibida. Toda información útil para el desarrollo de proyectos o tareas debe ser compartida con los miembros del equipo cuando sea necesario.",
      ],
    },
    {
      title: "Cooperación y Trabajo en Equipo",
      items: [
        "Compartir Conocimiento: Los miembros deben estar dispuestos a compartir sus conocimientos, herramientas y técnicas con el grupo.",
        "Apoyo Mutuo: Se espera que los miembros estén dispuestos a ayudar a otros en sus proyectos cuando sea necesario, promoviendo un ambiente de apoyo y cooperación.",
      ],
    },
    {
      title: "Crecimiento y Desarrollo Personal",
      items: [
        "Formación Continua: Los miembros deben comprometerse a mantener su crecimiento personal y profesional mediante la educación continua.",
        "Contribución al Grupo: Cada miembro debe aportar activamente al crecimiento de la asociación.",
      ],
    },
    {
      title: "Ética y Profesionalismo",
      items: [
        "Confidencialidad: La información confidencial de los clientes o de los miembros debe ser respetada y protegida.",
        "Integridad: Los miembros deben actuar con honestidad e integridad en todas sus actividades profesionales.",
        "Neutralidad y Respeto: Las decisiones dentro de la asociación deben ser tomadas de manera justa y neutral.",
      ],
    },
    {
      title: "Evaluación y Retroalimentación",
      items: [
        "Revisión de Proyectos: Se implementarán revisiones periódicas de los proyectos para asegurar que los estándares de calidad y compromiso se mantengan.",
        "Mejora Continua: Las evaluaciones y la retroalimentación deben ser utilizadas para mejorar continuamente los procesos y resultados dentro de la asociación.",
      ],
    },
    {
      title: "Compromiso con la Misión y Visión",
      items: [
        "Alineación: Todos los miembros deben alinearse con la misión, visión y valores de la asociación.",
      ],
    },
    {
      title: "Membresía Exclusiva y Expulsión",
      items: [
        "Selección Rigurosa: Solo aquellos que demuestren un alto nivel de integridad, compromiso y profesionalismo podrán unirse a la asociación.",
        "Consecuencias por Incumplimiento: Los miembros que no cumplan con las reglas o estándares de la asociación serán expulsados.",
      ],
    },
  ];

  return (
    <Frame className="p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Reglas de la Asociación</h1>
      <div className="space-y-8">
        {reglas.map((regla, index) => (
          <section key={index} className="bg-white shadow p-6 rounded-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary">{regla.title}</h2>
            <ul className="list-disc list-inside space-y-2">
              {regla.items.map((item, i) => {
                const [boldText, regularText] = item.split(':');
                return (
                  <li key={i} className="text-gray-700">
                    <span className="font-bold text-tertiary">{boldText}:</span>
                    {regularText && ` ${regularText}`}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </Frame>
  );
}
