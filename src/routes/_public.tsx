import * as React from 'react'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import Footer01 from '../ui/Layout/FooterTS01'

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
      <Footer01 config={} />
    </React.Fragment>
  )
}
