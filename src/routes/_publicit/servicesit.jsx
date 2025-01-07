import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_publicit/servicesit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_publicit/servicesit"!</div>
}
