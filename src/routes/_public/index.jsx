import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Frame from '../../ui/Divs/Frame'

export const Route = createFileRoute('/_public/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Frame>
      <h1 className="text-3xl font-bold text-center mb-8">Insight</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="col-span-1 md:col-span-2">
          <p className="text-lg mb-4">
            Bienvenido a <strong>Insight</strong> Proyects
          </p>
        </div>
        <div className="col-span-1">
          <img
            src="/logo.jpg"
            alt="Insight logo"
            className="w-full h-auto mx-auto"
          />
        </div>
      </div>
      <hr className="my-4" />
      <div className="text-lg text-center mb-4 italic">
        <p></p>
      </div>
    </Frame>
  )
}