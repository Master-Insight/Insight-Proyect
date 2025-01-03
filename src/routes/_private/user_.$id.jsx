import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/user_/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return <div>
    <p>
      Hello "/_private/user_/$id"
    </p>
    <p>
      Id seleccionado: {id}
    </p>

  </div>
}
