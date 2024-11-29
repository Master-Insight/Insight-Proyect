import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import Error404 from '../Layout/Error404'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: Error404,
})

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  )
}
