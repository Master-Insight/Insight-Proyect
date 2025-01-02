import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/asociates')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_private/asociates"!</div>
}
