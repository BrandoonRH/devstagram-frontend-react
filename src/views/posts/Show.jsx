import { useEffect, useState, createRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import clientAxios from "../../config/axios";
import { useAuth } from "../../hooks/useAuth";
import {HiOutlineHeart} from "react-icons/hi"
import {diffForHumans, getRandomInt}from "../../helpers"
import usePost from "../../hooks/usePost";
import Alert from "../../components/Alert"
import Comentario from "../../components/Comentario";

const Show = () => {
    const navigate = useNavigate(); 
    const {user} = useAuth({middleware: 'guest', url: ''}); 
    const {addComenatrioPost, getComentariosPost, deletePost,  likePost,  deleteLikePost} = usePost(); 
    const {post, username} = useParams(); 
    const token = localStorage.getItem('AUTH_TOKEN'); 
    const configHeaders = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
    //console.log(user)

    const [postSatate, setPostState] = useState({});
    const [comentariosPost, setComentariosPost] = useState([]); 
    const [userPostState, setUserPostState] = useState({});
    const [errors, setErrors] = useState([]);  
    const [messageSucces, setMessageSucces ] = useState(''); 
    const [userLike, setUserLike] = useState(false); 
    const [likesPost, setLikesPost] = useState(0); 

    const comentarioRef = createRef(); 
    const formComentario = createRef(); 

    const getPost = async () => {
        try {
            const {data} =  await clientAxios(`/${username}/posts/${post}`); 
         setUserPostState(data.userPost[0])
         setPostState(data.post); 
          } catch (error) {
            //console.log(error);
            if(error.response.status === 404){
                navigate('/404'); 
            } 
            
          }
    }

    const getUserLikesPost= async () => {
      try {
        const response = await clientAxios(`/posts/${post}/likes`, configHeaders); 
        //console.log(response.data.userLike);
        setUserLike(response.data.userLike);
        setLikesPost(response.data.numLikesPost);
      } catch (error) {
        console.log(error)
      }
    }


    const handleSubmit = async e => {
      e.preventDefault(); 
      const data = {
       comentario: comentarioRef.current.value
      }
      const message = await addComenatrioPost(data, post, username, setErrors); 
      setMessageSucces(message); 
      formComentario.current.reset(); 
    }

    const handleSubmitDeletePost = async e => {
      e.preventDefault(); 
      await deletePost(post); 
      navigate(`/${user.username}`)
    }

    const handleSubmitLikePost= async (e) =>{
      e.preventDefault(); 
      likePost(post); 
    }

    const handleSubmitDisLikePost = async (e) => {
      e.preventDefault(); 
      await deleteLikePost(post);
    }

    useEffect(() => {
        getPost(); 
        getComentariosPost(post, setComentariosPost);
        getUserLikesPost(); 
    },[username, post])
  
  return (
    <>
         <h2 className="font-black text-center text-3xl mb-10">{postSatate.title}</h2>
         <div className="container mx-auto md:flex">
            <div className="md:w-1/2">
                    <img src={`${import.meta.env.VITE_API_URL}/uploads/${postSatate.image}`} alt={`Imagen del Post: ${postSatate.title}`}  className="rounded-lg"/>
                    <div className="p-3 flex items-center gap-4">
                            {user && (
                                <>
                                    {userLike ? (
                                       <form onSubmit={handleSubmitDisLikePost}>
                                          <div className="my-4">
                                              <button type="submit" className="bg-red-600 rounded-full ">
                                                <HiOutlineHeart className="h-6 w-7 "/>
                                              </button>
                                          </div>
                                       </form>
                                    ) : (
                                      <form onSubmit={handleSubmitLikePost}>
                                        <div className="my-4">
                                            <button type="submit" className="bg-white">
                                              <HiOutlineHeart className="h-6 w-7 "/>
                                            </button>
                                        </div>
                                      </form>
                                    )}
                                </>
                            )}
                            <p className="font-bold text-gray-700">
                              {likesPost} 
                              <span className="font-normal text-gray-500">  Likes</span>
                            </p>
                    </div>
                    <div className="">
                            <p className="font-bold">{userPostState.username}</p>
                            <p className="text-sm text-gray-500">{diffForHumans(postSatate.created_at)}</p>
                            <p className="mt-5">
                                {postSatate.description}
                            </p>
                           {user && (
                             <>
                                {postSatate.user_id === user.id && (
                                     <form onSubmit={handleSubmitDeletePost}
                                     noValidate>
                                     <input type="submit" value="Eliminar Publicación" className="bg-red-500 hover:bg-red-700 p-2 rounded-md text-white font-bold mt-4 cursor-pointer"/>
                                   </form>
                                )}
                             </>
                           )}
                    </div>

            </div>
            <div className="md:w-1/2 p-5">
                <div className="shadow-md bg-white p-5 mb-5">
                  {user ? (
                    <>
                      <p className="text-xl font-bold text-center mb-4">Agrega un Nuevo Comentario</p>
                      {errors ? errors.map((error, i)=> <Alert  key={getRandomInt(1, 15)}>{error}</Alert>) : null }
                      {messageSucces ? <Alert error={false} key={1} >{messageSucces}</Alert> : null}
                        <form
                          onSubmit={handleSubmit}
                          noValidate
                          ref={formComentario}
                        >
                            <div className="mb-5">
                                <label className='mb-2 block uppercase text-gray-500 font-bold' htmlFor="comentario">Comentario:</label>         
                                <textarea ref={comentarioRef} className='border p-3 w-full rounded-lg ' name="comentario" id="comentario" placeholder='Comentario Aquí' cols="20" rows="5"></textarea>
                            </div>
                            <input type="submit" value="Comentar"  className='bg-sky-600 hover:bg-sky-800 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white rounded-lg'/>              
                        </form>
                    </>
                  ):(
                  <>
                    <p className="text-gray-600 font-bold text-xl">Crea una Cuenta para Comentar está Publicación</p>
                  </>
                  )}
                    <div className="bg-white shadow-lg mb-5 max-h-96 overflow-y-scroll">
                        {comentariosPost.length === 0 ? (
                          <p className="p-10 text-center">No hay Comentarios aún para está Publicación</p>
                        ):(
                         <>
                            {comentariosPost.map((comentario) => (
                                <Comentario
                                  comentario={comentario}
                                  key={comentario.id}
                                />
                            ))}
                         </>
                        )}
                    </div>
                </div>
            </div>
         </div>
    </>
  )
}

export default Show