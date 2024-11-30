import * as React from 'react'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import config from '../../config/layout'
import NavBar from '../Layout/navbar/Navbar'
import Footer01 from '../Layout/Footer01'
import company from '../../config/company'

export const Route = createFileRoute('/_private')({
  beforeLoad: ({ currentUser }) => {
    if (!currentUser || currentUser.data.given_name === 'public') {
      console.log('Acceso denegado, redirigiendo a /login');
      throw redirect({ to: '/login', });
    }
    console.log('Acceso permitido');
  },
  loader: ({ context }) => {
    console.log("Privated: ", context.currentUser)
    return context.currentUser
  },
  component: RouteComponent,
})

function RouteComponent() {

  const data = Route.useLoaderData()
  console.log(data);

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
