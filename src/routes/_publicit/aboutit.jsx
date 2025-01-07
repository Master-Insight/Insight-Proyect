import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_publicit/aboutit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_publicit/aboutit"!</div>
}
