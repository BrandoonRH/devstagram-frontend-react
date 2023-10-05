import { useState, createRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import {HiOutlineHeart} from "react-icons/hi"
import {diffForHumans, getRandomInt}from "../../helpers"
import usePost from "../../hooks/usePost";
import Alert from "../../components/Alert"
import Comentario from "../../components/Comentario";
import Spinner from "../../components/Spinner";
import { choice } from "../../helpers";
import useGetPost from "../../hooks/useGetPost";
import useGetLikesPost from "../../hooks/useGetLikesPost";
import useGetCommentsPost from "../../hooks/useGetCommentsPost";


const Show = () => {

  const navigate = useNavigate(); 
  const {user} = useAuth({middleware: 'guest', url: ''}); 
  const {addComenatrioPost, deletePost,  likePost,  deleteLikePost} = usePost(); 
  const {post, username} = useParams(); 
  
  const [errors, setErrors] = useState([]);  
  const [messageSucces, setMessageSucces ] = useState('');   

  const comentarioRef = createRef(); 
  const formComentario = createRef(); 

  
  const {data:Post, error:errorPost, isLoading:loadingPost} = useGetPost(username, post);
  const {data:likesPost, error:errorLikesPost, isLoading:loadingLikesPost} = useGetLikesPost(post);
  const {data:commentsPost, error:errorCommentsPost, isLoading:loadingCommentsPost} = useGetCommentsPost(post);

  if(loadingPost || loadingCommentsPost || loadingLikesPost) return (
    <Spinner text="Cargando Post..."/>
  )
  if(errorPost || errorCommentsPost || errorLikesPost) return navigate('/404'); 

  const handleSubmitComment = async e => {
    e.preventDefault(); 
    const data = {
     comentario: comentarioRef.current.value
    }
    const message = await addComenatrioPost(data, post, username, setErrors); 
    setMessageSucces(message); 
    setTimeout(() => {
      setMessageSucces(''); 
    }, 2000);
    formComentario.current.reset(); 
  }

  const handleSubmitDeletePost = async e => {
    e.preventDefault(); 
    Swal.fire({
      title: '¿Seguro que deseas Eliminar el Post?',
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Publicación Eliminada!', '', 'success')
        deletePost(post); 
        navigate(`/${user.username}`)
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }//handleSubmitDeletePost

  const handleSubmitDisLikePost = async (e) => {
    e.preventDefault(); 
    await deleteLikePost(post);
  }

  const handleSubmitLikePost= async (e) =>{
    e.preventDefault(); 
    await likePost(post); 
  }
  
  return (
    <>
         <h2 className="font-black text-center text-3xl mb-10">{Post?.post.title}</h2>

       
         <div className="container mx-auto md:flex">
            <div className="md:w-1/2">
                    <img src={`${import.meta.env.VITE_API_URL}/uploads/${Post?.post.image}`} alt={`Imagen del Post: ${Post?.post.title}`}  className="rounded-lg"/>
                    <div className="p-3 flex items-center gap-4">
                            {user && (
                                <>
                                    {likesPost?.userLike ? (
                                       <form onSubmit={handleSubmitDisLikePost}>
                                          <div className="my-4">
                                              <button type="submit">
                                                <HiOutlineHeart className="h-6 w-7 text-red-500 font-extrabold hover:-translate-y-2"/>
                                              </button>
                                          </div>
                                       </form>
                                    ) : (
                                      <form  onSubmit={handleSubmitLikePost}>
                                        <div className="my-4">
                                            <button type="submit">
                                              <HiOutlineHeart className="h-6 w-7 hover:-translate-y-2"/>
                                            </button>
                                        </div>
                                      </form>
                                    )}
                                </>
                            )}
                            <p className="font-bold text-gray-700">
                              {likesPost?.numLikesPost} 
                              <span className="font-normal text-gray-500">  {choice('Like', 'Likes', likesPost.numLikesPost)}</span>
                            </p>
                    </div>
                    <div className="">
                            <Link to={`/${Post?.userPost[0].username}`} className="font-bold hover:text-gray-600 transition-all ">{Post?.userPost[0].username}</Link>
                            <p className="text-sm text-gray-500">{diffForHumans(Post?.post.created_at)}</p>
                            <p className="mt-5">
                                {Post?.post.description}
                            </p>
                           {user && (
                             <>
                                {Post?.post.user_id === user?.id && (
                                     <form 
                                     onSubmit={handleSubmitDeletePost}
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
                          onSubmit={handleSubmitComment}
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
                        {commentsPost?.comentariosPost.length === 0 ? (
                          <p className="p-10 text-center">No hay Comentarios aún para está Publicación</p>
                        ):(
                         <>
                            {commentsPost?.comentariosPost.map((comentario) => (
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