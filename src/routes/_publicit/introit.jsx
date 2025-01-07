import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_publicit/introit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_publicit/introit"!</div>
}
