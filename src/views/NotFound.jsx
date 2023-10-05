import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className='container flex flex-col justify-center '>
        <h1 className='text-center font-bold text-4xl text-gray-700 shadow-lg'>404 - Not Found</h1>
        <Link to="/" className='text-center font-bold text-md text-gray-400 hover:text-gray-700 hover:underline mx-auto mt-5'>Volver al Inicio</Link>
    </div>
  )
}

export default NotFound