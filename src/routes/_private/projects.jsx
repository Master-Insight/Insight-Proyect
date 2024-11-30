import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/projects')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_private/projects"!</div>
}
