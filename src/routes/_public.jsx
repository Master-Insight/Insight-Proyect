import * as React from 'react'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import Footer01 from '../ui/Layout/Footer01'
import company from '../../config/company'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <header>
        <p>header</p>
      </header>
      <Outlet />
      <Footer01 config={company} />
    </>
  )
}
