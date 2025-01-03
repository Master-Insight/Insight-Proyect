import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/resources')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_private/resources"!</div>
}
