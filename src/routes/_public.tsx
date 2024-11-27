import * as React from 'react'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <React.Fragment>
      <header>
        <p>header</p>
      </header>
      <Outlet />
      <footer>
        <p>footer</p>
      </footer>
    </React.Fragment>
  )
}
