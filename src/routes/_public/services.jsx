import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query';
import { servicesListQueryOptions } from '../../data/Services.Data'
import FrameAbs from '../../ui/Divs/FrameAbs';
import CardService from '../../modules/services/CardService';
import BackButton from '../../ui/buttons/BackButton2';
import ElementList from '../../ui/sections/SectionWFilter/Elements';

export const Route = createFileRoute('/_public/services')({
  loader: async ({ context: { queryClient } }) => {
    const [servicesList] = await Promise.all([
      queryClient.ensureQueryData(servicesListQueryOptions),
    ])
    return { servicesList }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { currentUser, queryClient } = Route.useRouteContext()
  const isUser = currentUser.data.role === 'User'

  const { data: services, isLoading } = useSuspenseQuery(servicesListQueryOptions) // SERVICES
  console.log(services);

  // Configuración inicial
  const configElements = {
    currentUserId: currentUser.data._id,
    card: CardService,
    actions: {
      postApi: (value) => { console.log(value) },
      putApi: (predata) => { console.log(predata) },
      delApi: (id) => { console.log(id) },
    },
    blockEdit: isUser, // bloquear si es usuario (cliente no programador)
    // Fields muestra los campos para crear (boton) / editar (card)
    fields: [],
  }

  return (
    <FrameAbs>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div className="flex">
          <BackButton />
          <h2 className="text-3xl font-semibold ml-2">Nuestros servicios</h2>
        </div>
      </div>

      <section className="w-full flex mt-4 flex-col md:flex-row ">
        {/* ------------ ELEMENTOS ------------ */}
        <div className="w-full justify-center lg:w-4/5 p-4 gap-2 flex flex-col">
          <ElementList
            data={services}
            config={configElements}
            isPending={isLoading}
          />
        </div>
      </section>
    </FrameAbs>
  )
}
