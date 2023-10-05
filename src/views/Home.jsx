import { useAuth } from "../hooks/useAuth"
import Post from "../components/Post";
import Spinner from '../components/Spinner';
import FailedtoLoad from '../components/FailedtoLoad';
import usePostsFollow from '../hooks/usePostsFollow';

const Home = ({title}) => {

const {user} = useAuth({middleware: 'auth'});

const {data:posts, error, isLoading} = usePostsFollow(); 

if(isLoading) return (
  <Spinner text="Cargando Publicaciones..."/>
); 
if (error) return (
  <FailedtoLoad text="No pudimos Cargar los Posts"/>
);
  
  return (
    <>
          <h2 className="font-black text-center text-3xl mb-10">{title}</h2>

          <section className="container mx-auto mt-10">
         
           {posts?.posts.length === 0 ? (
              <p className="text-gray-600 uppercase text-sm text-center font-bold">No hay Post, Sigue a alguien para ver sus Publicaciones {user?.username}</p>
           ): (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {posts?.posts.map(post => (
              <Post 
                key={post?.image}
                post={post} 
                username={post?.user.username}
              />
            ))}
            </div>
           )}
         
        </section>

    </>
  )
}

export default Home