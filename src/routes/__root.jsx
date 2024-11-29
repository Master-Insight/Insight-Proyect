import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import Error404 from '../Layout/Error404'

export const Route = createRootRouteWithContext()({
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
