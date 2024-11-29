import { createFileRoute, Outlet } from '@tanstack/react-router'
import Footer01 from '../Layout/Footer01'
import company from '../../config/company'
import NavBar from '../Layout/navbar/Navbar'
import config from '../../config/layout'

export const Route = createFileRoute('/_public')({
  loader: ({ context }) => {
    console.log(context.user)
  },
  component: RouteComponent,
})

function RouteComponent() {
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
