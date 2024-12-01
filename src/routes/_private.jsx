import * as React from 'react'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import config from '../../config/layout'
import NavBar from '../Layout/navbar/Navbar'
import Footer01 from '../Layout/Footer01'
import company from '../../config/company'
import { alertMessage } from '../ui/messages/alerts'

export const Route = createFileRoute('/_private')({
  // TODO Corregir cuando se Hace F5 y estas en Private, debe seguir ne Private
  beforeLoad: async ({ context }) => {
    const currentUser = context.currentUser
    if (!currentUser || currentUser.data.given_name === 'public') {
      alertMessage("Acceso denegado", "error", 2);
      throw redirect({ to: '/login', });
    }
  },
  loader: async ({ context }) => {
    console.log("Privated: ", context.currentUser)
    return context.currentUser
  },
  component: RouteComponent,
})

function RouteComponent() {

  const data = Route.useLoaderData()

  const navLinks = config.navbar.default
  // console.log("Layout: ", navLinks);

  return (
    <>
      <NavBar navLinks={navLinks} />
      <Outlet />
      <Footer01 config={company} />
    </>
  )
}
