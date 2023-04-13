import clientAxios from "../config/axios"

export const useProfileUsers = () => {
    const token = localStorage.getItem('AUTH_TOKEN'); 

    const getUserProfile = async (username) => {
      
    }//getUserProfile


    return [
        getUserProfile
    ]


}//useProfileUsers