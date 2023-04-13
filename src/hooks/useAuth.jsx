import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';     
import useSWR from 'swr'
import clientAxios from "../config/axios";

export const useAuth = ({middleware, url, usernameUrl}) =>{

    const token = localStorage.getItem('AUTH_TOKEN'); 
    const configHeaders = {
      headers: {
          Authorization: `Bearer ${token}`
      }
    }
    const configHeadersImage = {
      headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
      }
    }
    const usernameLocal = localStorage.getItem('USERNAME'); 
    const navigate = useNavigate(); 

    const {data:user, error, mutate, isLoading} = useSWR('/user',  () => 
        clientAxios('/user', configHeaders)
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    ); 

   
    const login = async (data, setErrors) => {

      try {
        const response = await clientAxios.post('/login', data); 
        localStorage.setItem('AUTH_TOKEN', response.data.token); 
        localStorage.setItem('USERNAME', response.data.user.username);
        setErrors([]); 
        await mutate(); 
        return response.data.user.username;
        } catch (error) {
            setErrors(Object.values(error.response.data.errors));  
        }

    }//fin login


    const register = async (data, setErrors) => {
        try {
            const response = await clientAxios.post('/register', data); 
            // console.log(response.data.token); 
            localStorage.setItem('AUTH_TOKEN', response.data.token); 
            setErrors([]); 
            await mutate(); 
            return response.data.user.username;
          } catch (error) {
            setErrors(Object.values(error.response.data.errors)); 
          }
    }//fin Register

    const logout = async () => {
      try {
        await clientAxios.post('/logout', null, configHeaders); 
        localStorage.removeItem('AUTH_TOKEN'); 
       await mutate(undefined); 
      } catch (error) {
        throw Error(error?.response?.data?.errors)
      }
    }//fin Logout

    const editProfile = async (data, username, setErrors) => {
      try {
        const response = await clientAxios.post(`/${username}/edit-profile`, data, configHeadersImage);
        //console.log(response.data.user.username); 
        return response.data.user.username
      } catch (error) {
        setErrors(Object.values(error.response.data.errors)); 
      }
    }

  
   useEffect(() => {
      if(middleware === 'guest' && url && user){
          navigate(url); 
      }
      if(middleware === 'auth' && error){
          navigate('/auth/login'); 
      }
      
    
    }, [user, error ]); 
   

    return{
      login, 
      register,
      logout,
      user,
      error,
      editProfile
    }

}