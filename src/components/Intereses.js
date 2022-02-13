import { useState, useEffect, useContext, useRef } from 'react'
import LayoutContext from '../context/LayoutContext'

export default function Intereses() {
  const [ciudades, setCiudades] = useState([])
  const [isSuccessAlert, setIsSuccessAlert] = useState(false)

  const ciudadRef = useRef()

  const layoutContext = useContext(LayoutContext)
  const { setPath } = layoutContext

  useEffect(() => {
    setPath(window.location.pathname)
    const fetchCiudades = async () => {
      const ciudadesData = await fetch(
        `${process.env.REACT_APP_BACKEND_REST_URL}/ciudad/`
      )
      const ciudades = await ciudadesData.json()
      setCiudades(ciudades)
    }
    fetchCiudades()
  }, [])

  return (
    <div className='mt-10 sm:mt-0'>
      <div className='md:grid md:grid-cols-3 md:gap-6'>
        <div className='md:col-span-1'>
          <div className='px-4 sm:px-0'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Cambio de intereses
            </h3>
            <p className='mt-1 text-sm text-gray-600'>
              Seleccione la ciudad, un interés y presione guardar
            </p>
          </div>
        </div>
        <div className='mt-5 md:mt-0 md:col-span-2'>
          <form action='#' method='POST'>
            <div className='shadow overflow-hidden sm:rounded-md'>
              <div className='px-4 py-5 bg-white sm:p-6'>
                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-6 sm:col-span-4'>
                    <label
                      htmlFor='country'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Ciudad
                    </label>
                    <select
                      ref={ciudadRef}
                      className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    >
                      {ciudades.map(({ id, nombre }) => (
                        <option key={id}>{nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                    <label
                      htmlFor='city'
                      className='block text-sm font-medium text-gray-700'
                    >
                      City
                    </label>
                    <input
                      type='text'
                      name='city'
                      id='city'
                      autoComplete='address-level2'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>
              <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                <button
                  type='submit'
                  className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}