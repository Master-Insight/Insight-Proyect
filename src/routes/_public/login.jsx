import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Login from '../../modules/auth/login'

export const Route = createFileRoute('/_public/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate({ from: '/login' });
  return <Login navigate={navigate} />
}
