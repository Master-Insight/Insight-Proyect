import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/codes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_private/codes"!</div>
}
