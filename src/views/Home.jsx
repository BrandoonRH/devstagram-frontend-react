import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"
import clientAxios from "../config/axios";
import Post from "../components/Post";

const Home = ({title}) => {
useAuth({middleware: 'auth'});
const [posts , setPosts] = useState([]);
const token = localStorage.getItem('AUTH_TOKEN'); 
const configHeaders = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}
  const getPostsFromUsersFollow = async () => {
        try {
          const response = await clientAxios('/postsFollow', configHeaders); 
          //console.log(response.data.posts); 
          setPosts(response.data.posts)
        } catch (error) {
          console.log(error); 
        }
  }

  useEffect(() => {
    getPostsFromUsersFollow(); 
  },[token])

  return (
    <>
          <h2 className="font-black text-center text-3xl mb-10">{title}</h2>

          <section className="container mx-auto mt-10">
         

           {posts.length === 0 ? (
              <p className="text-gray-600 uppercase text-sm text-center font-bold">No hay Post</p>
           ): (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {posts.map(post => (
              <Post 
                key={post.image}
                post={post}
                username={post.user.username}
              />
            ))}
            </div>
           )}
         
        </section>

    </>
  )
}

export default Home