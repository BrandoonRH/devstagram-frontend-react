import useSWR from "swr"; 
import fetcher from "../lib/fetcher";

const useGetUserURLusername = (username) => {
    const {data, error, isLoading} = useSWR(`/${username}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }); 
    return {
        data, 
        error,
        isLoading
    }
}

export default useGetUserURLusername; 