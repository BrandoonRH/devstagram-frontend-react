import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'
import {MdReadMore} from "react-icons/md"
const Post = ({post, username}) => {
  const {user} = useAuth({middleware: 'guest'}); 

  return (
    <div className="rounded-md p-5 border-zinc-500 border">
        <a href={`/${username}/posts/${post.id}`} >
            <img src={`${import.meta.env.VITE_API_URL}/uploads/${post.image}`} className="rounded-lg transition  hover:-translate-y-6 shadow-lg" alt={`Imagen del Post ${post.image}`} />
        </a>
        <p className="text-gray-500 font-bold mt-2 text-center">{post.title}</p>
      
          <Link to={`/${username}/posts/${post.id}`} className="flex justify-center">
              <MdReadMore size={25} className="text-gray-400  hover:text-gray-700 mt-2"/>
          </Link>
     
    </div>
  )
}

export default Post