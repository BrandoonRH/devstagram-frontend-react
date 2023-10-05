import React, {createRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import MyDropzone from '../../components/Dropzone'
import usePost from '../../hooks/usePost'
import Alert from "../../components/Alert"
import { useAuth } from '../../hooks/useAuth'


const CreatePost = ({title}) => {
const navigate = useNavigate(); 
const {createPost, imagePost} = usePost(); 
const {user} = useAuth({middleware: 'auth', url: '/auth/login'}); 
const [errors, setErrors] = useState([]); 

const titleRef = createRef(); 
const descriptionRef = createRef();
const imageRef = createRef(); 
 
const handleSubmit = async e => {
    e.preventDefault(); 
    const data = {
     title: titleRef.current.value,
     description: descriptionRef.current.value,
     image: imageRef.current.value
    }
    const response = await createPost(data, setErrors)
    //console.log(response.status); 
   if(response?.status === 200){
        Swal.fire(
            `${response.data.message}!`,
            `Tú Post se a Subido a Desvstagram!`,
            'success'
        )
        navigate(`/${user.username}`)
    }

}
    

  return (
    <>
        <h2 className='font-black text-center text-3xl mb-10'>{title}</h2>

        <div className='md:flex md:items-center'>
            <div className='md:w-1/2 px-10'>
                <div className='border-dashed border-2 w-full h-96 rounded flex flex-col justify-center items-center'>
                 <MyDropzone/>
                </div>
            </div>
            <div className='md:w-1/2 p-10 bg-white rounded-lg shadow-xl mt-10 md:mt-0'>

            <form className="mb-5"  onSubmit={handleSubmit}>
            {errors ? errors.map((error, i)=> <Alert  key={i}>{error}</Alert>) : null }

                <div className='mb-5'>
                    <label className='mb-2 block uppercase text-gray-500 font-bold' htmlFor="title">Titulo:</label>
                    <input  ref={titleRef} className='border p-3 w-full rounded-lg ' placeholder='Titulo de la Publicación' type="text" name='title'/>
                </div>
                <div className='mb-5'>
                    <label className='mb-2 block uppercase text-gray-500 font-bold' htmlFor="description">Descripción:</label>          
                    <textarea ref={descriptionRef} className='border p-3 w-full rounded-lg ' name="description" id="description" placeholder='Descripción de la Publicación' cols="20" rows="5"></textarea>
                </div>
                <div className='mb-5'>
                    <input type="hidden" name="image" value={`${imagePost}`} ref={imageRef}/>
                </div>
                <input type="submit" value="Crear Post"  className='bg-sky-600 hover:bg-sky-800 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white rounded-lg'/>
            </form>              

            </div>   
        </div>
    </>
  )
}

export default CreatePost