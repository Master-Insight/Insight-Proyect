import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/projectsv2')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_private/projectsv2"!</div>
}
