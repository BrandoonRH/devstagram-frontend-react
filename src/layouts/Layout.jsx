import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { date } from "../helpers"
import { useAuth } from "../hooks/useAuth"
import {AiOutlinePlusCircle} from "react-icons/ai"; 

const Layout = () => {
  const {logout, user} = useAuth({middleware: 'guest'}); 

  return (
    <>
        <header className="p-5 border-b bg-white shadow">
                <div className="container mx-auto flex justify-between items-center">
                     <Link to="/" className="text-3xl font-black">
                        Devstagram
                     </Link>
                     {user ? (
                       <div className="flex gap-2 items-center">
                          <Link to="/posts/create" className="flex items-center gap-2 bg-white border p-2 text-gray-600 rounded hover:bg-gray-600 hover:text-white text-sm uppercase font-bold cursor-pointer">
                            <AiOutlinePlusCircle/>
                            Crear
                          </Link>
                          <Link to={`/${user.username}`} className="text-gray-600 font-bold  text-sm">
                            Hola: 
                            <span className="font-normal"> {user.username}</span>
                          </Link>
                          <button
                            type="button"
                            className='text-center rounded-md bg-red-500 hover:bg-red-700  p-1 px-2 font-bold text-white truncate'
                            onClick={logout}
                          >Cerrar Sesión</button>
                       </div>
                     ):(
                      <nav className="flex gap-2 items-center">
                      <Link to="/auth/login" className="font-bold uppercase text-gray-600 text-sm hover:-translate-y-2 transition-all">Login</Link>
                      <Link to="/auth/register" className="font-bold uppercase text-gray-600 text-sm hover:-translate-y-2 transition-all">Register</Link>
                      </nav>
                     )}
                   
                </div>
        </header>  
        <main className="container mx-auto mt-10">
              <Outlet/>
        </main>

        <footer className="text-center mt-16 p-5 text-gray-500 font-bold uppercase">
            devstagram - todos los derechos reservados {date()}
        </footer>
        
    </>
  )
}

export default Layout