import { createFileRoute, Outlet } from '@tanstack/react-router'
import config from '../../config/layout'
import NavBar from '../Layout/navbar/Navbar'
import Footer01 from '../Layout/Footer01'
import company from '../../config/company'
import { useEffect } from 'react'
import Spinner from '../ui/loading/Spinner'
import { alertMessage } from '../ui/messages/alerts'

export const Route = createFileRoute('/_private')({
  component: RouteComponent,
})

function RouteComponent() {
  const { currentUser, isLoading } = Route.useRouteContext()
  // console.log("Private: ", currentUser);

  const navigate = Route.useNavigate();

  useEffect(() => {
    if (!isLoading && (!currentUser || currentUser.data.role === 'public')) {
      alertMessage("Acceso denegado", "error", 2);
      navigate({ to: config.path.private });
    }
  }, [currentUser, isLoading, navigate]);

  if (isLoading) {
    return <div className={`p-2 text-2xl`}>Cargando... <Spinner /></div>
  }

  const navLinks = config.navbar.private
  // console.log("Layout: ", navLinks);

  return (
    <>
      <NavBar config={company} navLinks={navLinks} />
      <Outlet />
      <Footer01 config={company} />
    </>
  )
}
