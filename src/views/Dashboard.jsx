import { useParams, Link,} from "react-router-dom"; 
import { useAuth } from "../hooks/useAuth";
import useFollowerUser from "../hooks/useFollowerUser";
import Spinner from "../components/Spinner";
import FailedtoLoad from "../components/FailedtoLoad";
import Post from "../components/Post";
import Swal from 'sweetalert2'
import {FiEdit, FiUsers} from "react-icons/fi"; 
import { choice } from "../helpers";
import useGetUserFollowing from "../hooks/useGetUserFollowing";
import useGetUserURLusername from "../hooks/useGetUserURLusername";

const Dashboard = ({title}) => {

  const {username} = useParams(); 
  const {user} = useAuth({middleware: 'guest'});
 
  const { followerUser, unfollowerUser} = useFollowerUser(); 

  const {data:userFollowing, error:errorFollowing, isLoading:isLoadingFollowing} = useGetUserFollowing(username);

  const {data:userVisit, error, isLoading} = useGetUserURLusername(username);
  
  if(isLoading) return (
    <Spinner text="Cargando Perfil..."/>
  ); 
  if (error) return (
    <FailedtoLoad text="No pudimos Cargar el Perfil"/>
  );


  const handleSubmitUnfollowerUser = async (e) => {
    e.preventDefault();
    unfollowerUser(username);
    Swal.fire(`Has Dejado de seguir al usuario ${username}`)
  }

  const handleSubmitFollowerUser = async (e) => {
    e.preventDefault();
    followerUser(username);
    Swal.fire(`Has comenzado a seguir al usuario ${username}`)
  }
 
  return (
    <>
      <h2 className="font-black text-center text-3xl mb-10">{title} {username}</h2>
  
     <div className='flex justify-center'>
          <div className='w-full md:w-8/12 lg:w-6/12 flex flex-col items-center md:flex-row'>
                  <div className='w-8/12 lg:w-6/12 px-5'>
                      <img className="rounded-full" src={userVisit?.image ? `${import.meta.env.VITE_API_URL}/profiles/${userVisit?.image}` : '/images/usuario.svg'} alt="Imagen Usuario" />
                  </div>
                  <div className='md:w-8/12 lg:w-6/12 px-5 flex flex-col items-center md:justify-center md:items-start py-10'>
                        <div className="flex items-center gap-3">
                          <p className="text-gray-700 text-2xl"> {username}</p>
                            {user?.id === userVisit?.id ? (
                              <Link to={`/${user?.username}/edit-profile`}>
                              <FiEdit className="hover:-translate-y-2 hover:text-2xl transition-all"/>
                              </Link>
                            ) : (
                              <FiUsers/>
                            )}
                        </div>
                        <p className="text-gray-800 text-sm mb-3 font-bold mt-5">
                            {userVisit?.NumberFollowers}
                            <Link to={`/${username}/followers`} className="font-normal"> {choice('Seguidor', 'Seguidores', userVisit?.NumberFollowers)}</Link>
                        </p>
                        <p className="text-gray-800 text-sm mb-3 font-bold">
                            {userVisit?.NumberFollowings}
                            {user?.id === userVisit?.id ? (
                            <Link to={`/${username}/following`} className="font-normal"> Siguiendo</Link>
                            ) : (
                            <span className="font-normal"> Siguiendo</span>
                            )}
                        </p>
                        <p className="text-gray-800 text-sm mb-3 font-bold">
                            {userVisit?.numPosts}
                            <span className="font-normal"> Posts</span>
                        </p>

                        {user && (<>

                          {user?.id !== userVisit?.id && (<>
                              {userFollowing?.siguiendo ? (
                                <form onSubmit={handleSubmitUnfollowerUser}>
                                  <input type="submit" value="Dejar Seguir" className="bg-red-500 text-white uppercase rounded-md px-3 py-1 text-sm font-bold cursor-pointer hover:bg-red-700 transition-all"/>
                                </form>
                              ) : (
                                <form onSubmit={handleSubmitFollowerUser}  >
                                  <input type="submit" value="Seguir" className="bg-blue-500 text-white uppercase rounded-md px-3 py-1 text-sm font-bold cursor-pointer hover:bg-blue-700 transition-all"/>
                                </form>
                              )}
                          </>)}

                        </>)}
                                  
                  </div>
          </div>
      </div>

      <section className="container mx-auto mt-10">
                <h2 className="text-4xl text-center font-black my-10">Publicaciones</h2>

                {userVisit?.posts.length === 0 ? (
                  <p className="text-gray-600 uppercase text-sm text-center font-bold">No hay Post</p>
                ): (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {userVisit?.posts.map(post => (
                  <Post 
                    key={post.image}
                    post={post}
                    username={username}
                  />
                ))}
                </div>
                )}

      </section>
    </>
  )
}

export default Dashboard