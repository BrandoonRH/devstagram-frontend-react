import { useEffect, useState, createRef } from "react";
import { useAuth } from "../../hooks/useAuth"
import { useParams, Link, useNavigate } from "react-router-dom"; 
import Alert from "../../components/Alert";


const EditProfile = ({title}) => {

    const navigate = useNavigate(); 
    const {username} = useParams(); 
    const {user, editProfile} = useAuth({middleware: 'auth'}); 

    const [errors, setErrors] = useState([]); 
    const [imagen, setImagen] = useState(null);
    const [usernameState, setUsernameNew] = useState(user?.username);


    const handleChangeImage = (evento) => {
      setImagen(evento.target.files[0]);
    };
    const handleChange = (e) => {
      setUsernameNew(e.target.value)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('image', imagen);
      formData.append('username', usernameState)
      /*const data = {
        username: usernameRef.current.value,
        image: formData
      } */
    //console.log(formData  ); 
     const usernameNew = await editProfile(formData, username, setErrors); 
     navigate(`/${usernameNew}`)
    }


    useEffect(() => {
        if(username !== user?.username){
            navigate(`/${username}`)
        }
    })

  return (
    <>
        <h1 className='text-2xl font-bold text-center text-gray-600'>{title} <span className="text-gray-400">{user?.username}</span></h1>
        <div className="md:flex md:justify-center">
            <div className="md:w-1/2 bg-white shadow p-6">
                <form className="mt-10 md:mt-0" onSubmit={handleSubmit}>
                {errors ? errors.map((error, i)=> <Alert  key={i}>{error}</Alert>) : null }
                    <div className='mb-5'>
                        <label className='mb-2 block uppercase text-gray-500 font-bold' htmlFor="username">Username:</label>
                        <input   onChange={handleChange} className='border p-3 w-full rounded-lg '  placeholder='Tú Nombre de Usuario' id="username" type="text" name='username'/>
                    </div>
                    <div className='mb-5'>
                        <label className='mb-2 block uppercase text-gray-500 font-bold' htmlFor="image">Imagen:</label>
                        <input onChange={handleChangeImage}  className='border p-3 w-full rounded-lg ' id="image" type="file" name='image'/>
                    </div>
                    <input type="submit" value="Editar Información"  className='bg-sky-600 hover:bg-sky-800 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white rounded-lg'/>
                </form>
            </div>
        </div>
    </>
  )
}

export default EditProfile