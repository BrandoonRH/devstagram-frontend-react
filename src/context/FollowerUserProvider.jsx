import { createContext, useState } from "react";
import clientAxios from "../config/axios";
const FollowerUserContext = createContext(); 

const FollowerUserProvider = ({children}) => {
      //Config Peticiones HTTP 
      const token = localStorage.getItem('AUTH_TOKEN'); 
      const configHeaders = {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }

const followerUser = async (username) => {
        try {
            const response = await clientAxios.post(`/${username}/follow`, null, configHeaders);
            console.log(response)
        } catch (error) {
            console.log(error); 
        }
}

const unfollowerUser = async (username) => {
    try {
        const response = await clientAxios.delete(`/${username}/unfollow`, configHeaders);
        console.log(response)
    } catch (error) {
        console.log(error); 
    }
}

    return (
        <FollowerUserContext.Provider
            value={{
                followerUser, 
                unfollowerUser,
            }}
        >
                {children}
        </FollowerUserContext.Provider>
    )
}

export {
    FollowerUserProvider
}

export default FollowerUserContext; 