import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/tasks/$cardId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_private/tasks/$cardId"!</div>
}
