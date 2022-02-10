import { XIcon } from '@heroicons/react/outline'

export default function SuccessAlert({ isSuccessAlert, setIsSuccessAlert }) {
  return (
    <div
      className={` mx-auto fixed z-10 bottom-0 p-2 transition-opacity ease-in delay-200 ${
        isSuccessAlert ? 'opacity-100' : 'opacity-0 invisible'
      }`}
      onClick={() => setIsSuccessAlert(false)}
    >
      <div className='bg-green-200 px-4 py-4 rounded-md border border-b-2 border-green-600 text-lg flex items-center'>
        <span>
          <svg
            viewBox='0 0 24 24'
            className='text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3'
          >
            <path
              fill='currentColor'
              d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
            ></path>
          </svg>
        </span>
        <p className='text-green-800 text-base leading-4 pr-6'>
          Se ha aprobado el crédito
        </p>
        <button
          onClick={() => {
            window.scroll({
              top: 5000,
              behavior: 'smooth',
            })
            setIsSuccessAlert(false)
          }}
          className='text-white bg-black border rounded-md p-2'
        >
          <XIcon className='w-6 h-6' />
        </button>
      </div>
    </div>
  )
}
