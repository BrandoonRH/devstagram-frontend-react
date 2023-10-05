import useSWR from "swr"; 
import clientAxios from "../config/axios";
import { useParams, Link,} from "react-router-dom"; 
import {HiUserGroup} from "react-icons/hi"; 
import CardFollowers from "../components/CardFollowers";
import Spinner from "../components/Spinner";
import FailedtoLoad from "../components/FailedtoLoad";


const Following = ({title}) => {
  const {username} = useParams(); 
  const token = localStorage.getItem('AUTH_TOKEN'); 
  const configHeaders = {
    headers: {
        Authorization: `Bearer ${token}`
    }
  }

  const fetcherFollowing = () => clientAxios(`/${username}/following`, configHeaders ).then(data => data.data); 
  const {data, error, isLoading} = useSWR(`/${username}/following` , fetcherFollowing,  {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404) return
    }
  });

  if(isLoading) return (
    <Spinner text="Cargdando Segudores..."/>
  )

  if(error) return (
    <FailedtoLoad text="No Pudimos caragar los Segudores"/>
  )
  
  return (
    <>
          <div className="flex md:flex-row md:justify-center md:gap-3 md:items-baseline flex-col items-center gap-1 mb-10">
            <h2 className="font-black text-center text-3xl md:mb-10 mb-2">
              {title} 
                <span className="text-gray-400 font-medium underline shadow-md">
                  {username}
                </span> 
            </h2>
            <HiUserGroup size={25}/>
          </div>


          <div className="flex gap-2 items-center w-full">

            <div className="container mx-auto mt-5">

              {data?.followings.length === 0 ? (<p>Aún Nadie Sigue esta Cuenta</p>) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {data?.followings.map( follow => (
                    <CardFollowers
                      key={follow.id}
                      follow={follow}
                    />
                  ))}
                </div>
              )}

            </div>

          </div>
    </>
  )
}

export default Following