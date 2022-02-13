import { useContext, useEffect, useState } from 'react'

import LayoutContext from '../context/LayoutContext'
import SuccessAlert from '../components/SuccessAlert'

let alertTimer
const ESTADOS_CAJERO = {
  aprobado: 'Aprobado',
  negado: 'Negado',
  pendiente: 'Pendiente',
}

export default function Cajeros() {
  const [cajeros, setCajeros] = useState([])
  const [isSuccessAlert, setIsSuccessAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const layoutContext = useContext(LayoutContext)
  const { setPath } = layoutContext

  useEffect(() => {
    setPath(window.location.pathname)
    const fetchCreditos = async () => {
      const cajerosData = await fetch(
        `${process.env.REACT_APP_BACKEND_REST_URL}/cajero/`
      )
      const cajeros = await cajerosData.json()
      setCajeros(cajeros)
    }
    fetchCreditos()
  }, [])

  const handleApproveClic = async (id, indiceEnArray) => {
    const newCajeros = [...cajeros]
    const newCajero = { ...newCajeros[indiceEnArray] }
    newCajero.estado = ESTADOS_CAJERO.aprobado
    newCajeros[indiceEnArray] = newCajero
    setCajeros(newCajeros)
    setIsSuccessAlert(true)
    setAlertMessage('Se aprobó el cajero')
    if (alertTimer) clearTimeout(alertTimer)
    alertTimer = setTimeout(() => {
      setIsSuccessAlert(false)
      alertTimer = null
    }, 4000)
    const resData = await fetch(
      `${process.env.REACT_APP_BACKEND_REST_URL}/cajero/aprobarCajero?id=` + id
    )
    const res = await resData.text()
    console.log(res)
  }

  const handleRejectClic = async (id, indiceEnArray) => {
    const newCajeros = [...cajeros]
    const newCajero = { ...newCajeros[indiceEnArray] }
    newCajero.estado = ESTADOS_CAJERO.negado
    newCajeros[indiceEnArray] = newCajero
    setCajeros(newCajeros)
    setIsSuccessAlert(true)
    setAlertMessage('Se negó el cajero')
    if (alertTimer) clearTimeout(alertTimer)
    alertTimer = setTimeout(() => {
      setIsSuccessAlert(false)
      alertTimer = null
    }, 4000)
    const resData = await fetch(
      `${process.env.REACT_APP_BACKEND_REST_URL}/cajero/negarCajero?id=` + id
    )
    const res = await resData.json()
    console.log(res)
  }

  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Id
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Cédula
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Estado
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Aprobar
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Rechazar
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {cajeros.map(({ id, cedula, estado }, indiceEnArray) => (
                  <tr key={id}>
                    <td className='px-6 py-4 whitespace-nowrap'>{id}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-500'>{cedula}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          estado === ESTADOS_CAJERO.aprobado
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {estado}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {estado === ESTADOS_CAJERO.pendiente && (
                        <button
                          onClick={() => handleApproveClic(id, indiceEnArray)}
                          type='button'
                          className='px-4 bg-green-600 border border-transparent rounded-md flex items-center justify-center text-base font-normal text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                        >
                          Aprobar
                        </button>
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {estado === ESTADOS_CAJERO.pendiente && (
                        <button
                          onClick={() => handleRejectClic(id, indiceEnArray)}
                          type='button'
                          className='px-4 bg-red-600 border border-transparent rounded-md flex items-center justify-center text-base font-normal text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                        >
                          Rechazar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SuccessAlert
            message={alertMessage}
            isSuccessAlert={isSuccessAlert}
            setIsSuccessAlert={setIsSuccessAlert}
            isErrorMessage={false}
          />
        </div>
      </div>
    </div>
  )
}
