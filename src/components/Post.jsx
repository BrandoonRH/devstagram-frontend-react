import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Post = ({post, username}) => {
  const {user} = useAuth({middleware: 'guest'}); 

  return (
    <div>
        <a href={`/${username}/posts/${post.id}`}>
            <img src={`${import.meta.env.VITE_API_URL}/uploads/${post.image}`} alt={`Imagen del Post ${post.image}`} />
        </a>
    </div>
  )
}

export default Post