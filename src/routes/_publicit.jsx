import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import Footer01 from '../Layout/Footer01'
import company from '../../config/company'
import NavBar from '../Layout/navbar/Navbar'
import config from '../../config/layout'
import Spinner from '../ui/loading/Spinner'
import { useEffect } from 'react'

export const Route = createFileRoute('/_publicit')({
  component: RouteComponent,
})

function RouteComponent() {
  const { currentUser, isLoading } = Route.useRouteContext()
  // console.log("Public: ", currentUser);

  // const navigate = Route.useNavigate();

  // useEffect(() => {
  //   if (!isLoading && currentUser?.data.role !== 'public') {
  //     // Si no es público, redirigir al privado
  //     navigate({ to: config.path.login });
  //   }
  // }, [currentUser, isLoading, navigate])

  if (isLoading) {
    return <div className={`p-2 text-2xl`}>Cargando... <Spinner /></div>
  }

  return (
    <>
      <NavBar config={company} navLinks={config.navbar.public_It} />
      <Outlet />
      <Footer01 config={company} />
    </>
  )
}
