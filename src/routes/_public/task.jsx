import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import useAuthStore from '../../store/useAuthStore'
import myAxios from '../../api/axiosInstance'

export const Route = createFileRoute('/_public/task')({
  component: RouteComponent,
})

function RouteComponent() {
  const { accessToken, setAccessToken, clearAccessToken } = useAuthStore()

  const fetchData = async () => {
    try {
      const response = await myAxios.get('/')
      console.log('Respuesta de Axios:', response.data)
    } catch (error) {
      console.error('Error al realizar la petición:', error)
    }
  }

  return (
    <div>
      <h2 className="text-3xl">Test Token</h2>
      <div>
        <p className=" m-4">Token actual: {accessToken || 'No hay token'}</p>
        <button
          className="bg-primary m-4"
          onClick={() => setAccessToken('mi-token-de-prueba')}
        >
          Guardar Token
        </button>
        <button className="bg-primary m-4" onClick={clearAccessToken}>
          Eliminar Token
        </button>
      </div>
      <hr></hr>
      <h2 className="text-3xl">Test Axios</h2>
      <button className="bg-primary m-4" onClick={fetchData}>
        Probar Axios
      </button>
    </div>
  )
}
