import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../hooks/useAuth"
import useFollowerUser from "../hooks/useFollowerUser";
import { useParams, Link, useNavigate } from "react-router-dom"; 
import clientAxios from "../config/axios";
import Post from "../components/Post";
import {FiEdit, FiUsers} from "react-icons/fi"
import { choice } from "../helpers";



const Dashboard = ({title}) => {
  const navigate = useNavigate(); 
  const {username} = useParams(); 
  const {user} = useAuth({middleware: 'guest'});
  const { followerUser, unfollowerUser, ifFollowUser} = useFollowerUser(); 
  

  const [userGetURL, setuUserGetURL ] = useState({});
  const [postsUser, setPostsUser] = useState([]);
  const [iffollowUser, setIfFollowUser] = useState(true); 
  

  const getUser = async () => {
    try {
      const {data} =  await clientAxios(`/${username}`); 
      //console.log(data); 
      setPostsUser(data.posts)
      setuUserGetURL(data);
    } catch (error) {
      console.log(error); 
      if(error.response.status === 404){
        navigate('/404'); 
    } 
    }

  }//finish getUser


  const handleSubmitFollowerUser = async(e) => {
    e.preventDefault();
    await followerUser(username); 
    window.location.reload();
  }
  const handleSubmitUnfollowerUser = async(e) => {
    e.preventDefault();
    await unfollowerUser(username); 
    window.location.reload();
  }


  useEffect(() => {
      getUser(); 

      async function getFollowUser(){
        setIfFollowUser(await ifFollowUser(username)); 
      }

      getFollowUser(); 
      
  }, [username, iffollowUser])
  return (
    <>
      <h2 className="font-black text-center text-3xl mb-10">{title} {username}</h2>
        <div className='flex justify-center'>
            <div className='w-full md:w-8/12 lg:w-6/12 flex flex-col items-center md:flex-row'>
                    <div className='w-8/12 lg:w-6/12 px-5'>
                        <img className="rounded-full" src={userGetURL.image ? `${import.meta.env.VITE_API_URL}/profiles/${userGetURL.image}` : '/images/usuario.svg'} alt="Imagen Usuario" />
                    </div>
                    <div className='md:w-8/12 lg:w-6/12 px-5 flex flex-col items-center md:justify-center md:items-start py-10'>
                      <div className="flex items-center gap-3">
                         <p className="text-gray-700 text-2xl"> {username}</p>
                          {user?.id === userGetURL?.id ? (
                            <Link to={`/${user?.username}/edit-profile`}>
                            <FiEdit className="hover:-translate-y-2 hover:text-2xl transition-all"/>
                            </Link>
                          ) : (
                            <FiUsers/>
                          )}
                      </div>
                       <p className="text-gray-800 text-sm mb-3 font-bold mt-5">
                          {userGetURL.NumberFollowers}
                          <span className="font-normal"> {choice('Seguidor', 'Seguidores', userGetURL.NumberFollowers)}</span>
                       </p>
                       <p className="text-gray-800 text-sm mb-3 font-bold">
                          {userGetURL.NumberFollowings}
                          <span className="font-normal"> Siguiendo</span>
                       </p>
                       <p className="text-gray-800 text-sm mb-3 font-bold">
                          {userGetURL.numPosts}
                          <span className="font-normal"> Posts</span>
                       </p>
                      {user && (<>
                        {user?.id !== userGetURL?.id && (<>
                            {iffollowUser ? (
                              <form onSubmit={handleSubmitUnfollowerUser}>
                                <input type="submit" value="Dejar Seguir" className="bg-red-500 text-white uppercase rounded-md px-3 py-1 text-sm font-bold cursor-pointer hover:bg-red-700 transition-all"/>
                              </form>
                            ) : (
                              <form onSubmit={handleSubmitFollowerUser} >
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

           {postsUser.length === 0 ? (
              <p className="text-gray-600 uppercase text-sm text-center font-bold">No hay Post</p>
           ): (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {postsUser.map(post => (
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