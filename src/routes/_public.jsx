import { createFileRoute, Outlet } from '@tanstack/react-router'
import Footer01 from '../Layout/Footer01'
import company from '../../config/company'
import NavBar from '../Layout/navbar/Navbar'
import config from '../../config/layout'

export const Route = createFileRoute('/_public')({
  // loader: ({ context }) => console.log("Public: ", context.currentUser),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <NavBar config={company} navLinks={config.navbar.default} />
      <Outlet />
      <Footer01 config={company} />
    </>
  )
}
