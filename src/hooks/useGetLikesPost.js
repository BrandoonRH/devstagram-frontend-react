import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useGetLikesPost = (post) => {
    const {data, error, isLoading} = useSWR(`/posts/${post}/likes`, fetcher, {
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

export default useGetLikesPost;