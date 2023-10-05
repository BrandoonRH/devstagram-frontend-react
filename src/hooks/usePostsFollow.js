import useSWR from "swr"; 
import fetcher from "../lib/fetcher";

const usePostsFollow = () => {
    const {data, error, isLoading} = useSWR('/postsFollow', fetcher, {
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

export default usePostsFollow;