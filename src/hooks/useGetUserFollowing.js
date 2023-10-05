import useSWR from "swr"; 
import fetcher from "../lib/fetcher";

const useGetUserFollowing = (username) => {
    const {data, error, isLoading} = useSWR(`/${username}/follow`, fetcher, {
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

export default useGetUserFollowing; 