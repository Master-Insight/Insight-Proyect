import { createFileRoute } from '@tanstack/react-router'
import { LogOut } from '../../modules/auth/logout'

export const Route = createFileRoute('/_private/logout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LogOut />
}
