import useSWR from "swr"; 
import clientAxios from "../config/axios";
import { useParams, Link,} from "react-router-dom"; 
import {HiUserGroup} from "react-icons/hi"; 
import CardFollowers from "../components/CardFollowers";
import Spinner from "../components/Spinner";
import FailedtoLoad from "../components/FailedtoLoad";


const Follower = ({title}) => {

const {username} = useParams(); 
const token = localStorage.getItem('AUTH_TOKEN'); 
const configHeaders = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}
    

  const fetcherFollowing = () => clientAxios(`/${username}/followers`, configHeaders ).then(data => data.data); 
  const {data, error, isLoading} = useSWR(`/${username}/followers` , fetcherFollowing,  {
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
console.log(data); 
  return (
    <>
         <h2 className="font-black text-center text-3xl md:mb-10 mb-2">
              {title} 
                <span className="text-gray-400 font-medium underline shadow-md">
                  {username}
                </span> 
        </h2>

        <div className="flex gap-2 items-center w-full">

            <div className="container mx-auto mt-5">

            {data?.followers.length === 0 ? (<p>Aún no Sigues a Nadie {username}</p>) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data?.followers.map( follow => (
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

export default Follower