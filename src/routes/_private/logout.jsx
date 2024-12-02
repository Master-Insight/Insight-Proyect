import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LogOut } from '../../modules/auth/logout'

export const Route = createFileRoute('/_private/logout')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate({ from: '/logout' });

  return <LogOut navigate={navigate} />
}
