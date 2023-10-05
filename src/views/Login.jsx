import { createRef,  useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../components/Alert"
import { useAuth } from "../hooks/useAuth"
import Spinner from "../components/Spinner"


const Login = ({title}) => {
  const [routeUser, setRouteUser] = useState('/muro');
  
    const {login} = useAuth({
      middleware: 'guest',
      url: `/${routeUser}`
      //url: '/muro'
    }); 

    
    const emailRef = createRef(); 
    const passwordRef= createRef(); 

    const [errors, setErrors] = useState([]); 
  
    const handleSubmit = async e => {
      e.preventDefault(); 
      //setLoading(true);
      const data = {  
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }
      const response = await login(data, setErrors);
      setRouteUser(response); 
  }//fin handleSubmit

  return (
    <>
            <h2 className="font-black text-center text-3xl mb-10">{title}</h2>
            <div className='md:flex md:justify-center md:gap-10 md:items-center'>
                <div className='md:w-6/12 p-4'>
                  <img className='shadow-2xl rounded-xl"' src="/images/login.jpg" alt="Imagen de registro Usuarios" />
                </div>
                <div className='md:w-4/12 bg-white p-6 rounded-xl shadow-2xl'>
                    
                      <form 
                        onSubmit={handleSubmit}
                        noValidate
                        className="mb-5"
                      >
                        {errors ? errors.map((error, i)=> <Alert key={i}>{error}</Alert>) : null }
                          <div className='mb-5'>
                              <label className='mb-2 block uppercase text-gray-500 font-bold' htmlFor="email">Email:</label>
                              <input ref={emailRef} className='border p-3 w-full rounded-lg ' placeholder='Tú Email de Registro' type="email" name='email'/>
                          </div>
                          <div className='mb-5'>
                              <label className='mb-2 block uppercase text-gray-500 font-bold' htmlFor="password">Password:</label>
                              <input ref={passwordRef} className='border p-3 w-full rounded-lg ' placeholder='Tú Password de Registro' type="password" name='password'/>
                          </div>
                          <input type="submit" value="Iniciar Sesión"  className='bg-sky-600 hover:bg-sky-800 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white rounded-lg'/>
                      </form>
                      <Link to="/auth/register" className="text-sm  text-gray-500 hover:text-gray-300 font-bold">¿Aún no tienes cuenta? Registratre Aquí</Link>
                    
                  
                </div>
            </div>
    </>
  )
}

export default Login