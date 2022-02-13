import { useState, useEffect, useContext } from 'react'
import LayoutContext from '../context/LayoutContext'
import SuccessAlert from '../components/SuccessAlert'

let alertTimer

export default function Index() {
  const [creditos, setCreditos] = useState([])
  const [isSuccessAlert, setIsSuccessAlert] = useState(false)

  const layoutContext = useContext(LayoutContext)
  const { setPath } = layoutContext

  useEffect(() => {
    setPath(window.location.pathname)
    const fetchCreditos = async () => {
      const creditosData = await fetch(
        `${process.env.REACT_APP_BACKEND_REST_URL}/creditos/`
      )
      const creditos = await creditosData.json()
      setCreditos(creditos)
    }
    fetchCreditos()
  }, [])

  const handleApproveClic = async (indice) => {
    setCreditos((creditos) => {
      return creditos.filter((credito) => credito.id !== indice)
    })
    setIsSuccessAlert(true)
    if (alertTimer) clearTimeout(alertTimer)
    alertTimer = setTimeout(() => {
      setIsSuccessAlert(false)
      alertTimer = null
    }, 4000)
    const resData = await fetch(
      `${process.env.REACT_APP_BACKEND_REST_URL}/creditos/aprobar?id=` + indice
    )
    const res = await resData.text()
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
                    Fecha de solicitud
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Datos del solicitante
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Número de plazos
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Monto Solicitado
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
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {creditos.map(
                  ({
                    id,
                    fecha,
                    montoSolicitado,
                    plazosCredito,
                    cedulaPersona,
                    nombrePersona,
                  }) => (
                    <tr key={id}>
                      <td className='px-6 py-4 whitespace-nowrap'>{id}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-500'>{fecha}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>
                          {cedulaPersona}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {nombrePersona}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {plazosCredito}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {montoSolicitado}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                          No aprobado
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        <button
                          onClick={() => handleApproveClic(id)}
                          type='button'
                          className='w-full px-1 bg-green-600 border border-transparent rounded-md flex items-center justify-center text-base font-normal text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                        >
                          Aprobar
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <SuccessAlert
            message={'Se ha aprobado el crédito'}
            isSuccessAlert={isSuccessAlert}
            setIsSuccessAlert={setIsSuccessAlert}
            isErrorMessage={false}
          />
        </div>
      </div>
    </div>
  )
}
