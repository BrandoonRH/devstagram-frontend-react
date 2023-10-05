import { createContext, useState } from "react";
import clientAxios from "../config/axios";
const PostContext = createContext(); 
import useSWR from 'swr';
import Swal from "sweetalert2";

const PostProvider = ({children}) => {
    //Config Peticiones HTTP 
    const token = localStorage.getItem('AUTH_TOKEN'); 
    const configHeaders = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const configSWR = {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }

    const [imagePost, setImagePost] = useState('');

  
    const createPost = async (data, setErrors) => {
            try {
                const response = await clientAxios.post('/posts/create', data, configHeaders);
                setErrors([]); 
            
                return response
            } catch (error) {
                setErrors(Object.values(error.response.data.errors)); 
            }
    }//createPost

    const addComenatrioPost = async (data, post, username, setErrors) => {
      try {
            const response = await clientAxios.post(`/${username}/posts/${post}`, data, configHeaders);
            setErrors([]);
           const message =  response.data.message
           return message
        } catch (error) {
            setErrors(Object.values(error.response.data.errors)); 
        }
       /* const fetcherAddCommentPost = () => clientAxios.post(`/${username}/posts/${post}`, data, configHeaders).then(data => data.data); 
        const {data, error, isLoading} = useSWR(`/${username}/posts/${post}`)*/
    }//addComenatrioPost

    const getComentariosPost = async (post, setComentariosPost) => {
            try {
                const response = await clientAxios(`/posts/${post}`)
                //console.log(response.data.comentariosPost);
                setComentariosPost(response.data.comentariosPost);
            } catch (error) {
                console.log(error)
            }
    }

    const deletePost = async (post) => {
        try {
            const response = await clientAxios.delete(`/posts/${post}`, configHeaders); 
            //console.log(response)
        } catch (error) {
            console.log(error)
        }
    } 

    const likePost = async (post) => {
        try {
            const response = await clientAxios.post(`/posts/${post}/likes`, null, configHeaders); 
            //console.log(response); 
        } catch (error) {
            console.log(error);
        }
    }

    const deleteLikePost = async (post) => {
        try {
            const response = await clientAxios.delete(`/posts/${post}/likes`, configHeaders); 
            //console.log(response); 
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <PostContext.Provider
            value={{
                createPost,
                imagePost,
                setImagePost,
                addComenatrioPost,
                getComentariosPost,
                deletePost,
                likePost,
                deleteLikePost,    
            }}
        >
            {children}
        </PostContext.Provider>
    )
}

export {
    PostProvider
}

export default PostContext