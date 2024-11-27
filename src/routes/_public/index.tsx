import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='bg-red-400'>
      <div >Hello "/index _public/"!</div>

    </main>
  )
}