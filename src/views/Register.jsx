import { createRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";


const Register = ({title}) => {

  const [routeUser, setRouteUser] = useState('/auth/register');

  const {register} = useAuth({
    middleware: 'guest',
    url: `/${routeUser}`
    //url: '/muro'
  }); 

  const nameRef = createRef(); 
  const usernameRef = createRef(); 
  const emailRef = createRef(); 
  const passwordRef= createRef(); 
  const passwordConfirmationRef = createRef();  


  const [errors, setErrors] = useState([]); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async e => {
    e.preventDefault(); 
    setLoading(true);
    const data = {
      name: nameRef.current.value, 
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    }
    const response = await register(data, setErrors);  
    setRouteUser(response); 
  }

  return (
    <>
            <h2 className="font-black text-center text-3xl mb-10">{title}</h2>
            <div className='md:flex md:justify-center md:gap-10 md:items-center'>
                <div className='md:w-6/12 p-4'>
                  <img className='shadow-2xl rounded-xl"' src="/images/registrar.jpg" alt="Imagen de registro Usuarios" />
                </div>
                {loading ? (
                  <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                    <Spinner text="Cargando..."/>
                  </div>
                ):(
                  <div className='md:w-4/12 bg-white p-6 rounded-xl shadow-2xl'>
                      <form onSubmit={handleSubmit} noValidate className="mb-5">
                      {errors ? errors.map((error, i)=> <Alert  key={i}>{error}</Alert>) : null }
                          <div className='mb-5'>
                              <label className='mb-2 block uppercase text-gray-500 font-bold' htmlFor="name">Nombre:</label>
                              <input ref={nameRef}   className='border p-3 w-full rounded-lg ' placeholder='Tú Nombre' type="text" name='name'/>
                          </div>
                          <div className='mb-5'>
                              <label className='mb-2 block uppercase text-gray-500 font-bold' htmlFor="username">Username:</label>
                              <input ref={usernameRef} className='border p-3 w-full rounded-lg ' placeholder='Tú Nombre de Usuario' type="text" name='username'/>
                          </div>
                          <div className='mb-5'>
                              <label className='mb-2 block uppercase text-gray-500 font-bold' htmlFor="email">Email:</label>
                              <input ref={emailRef} className='border p-3 w-full rounded-lg ' placeholder='Tú Email de Registro' type="email" name='email'/>
                          </div>
                          <div className='mb-5'>
                              <label className='mb-2 block uppercase text-gray-500 font-bold' htmlFor="password">Password:</label>
                              <input ref={passwordRef} className='border p-3 w-full rounded-lg ' placeholder='Tú Password de Registro' type="password" name='password'/>
                          </div>
                          <div className='mb-5'>
                              <label className='mb-2 block uppercase text-gray-500 font-bold' htmlFor="password_confirmation">Confirma tú Password:</label>
                              <input ref={passwordConfirmationRef} className='border p-3 w-full rounded-lg ' placeholder='Repite Password de Registro' type="password" name='password_confirmation'/>
                          </div>
                          <input type="submit" value="Crear Cuenta"  className='bg-sky-600 hover:bg-sky-800 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white rounded-lg'/>
                      </form>
                      <Link to="/auth/login" className="text-sm  text-gray-500 hover:text-gray-300 font-bold">¿Ya tienes Cuenta? Inicia Sesión Aquí</Link>
                  </div>
                )}
               
            </div>
    </>
  )
}

export default Register