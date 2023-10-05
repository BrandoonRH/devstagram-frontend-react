import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useGetPost = (username, post) => {
    const {data, error, isLoading} = useSWR(`/${username}/posts/${post}`, fetcher, {
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

export default useGetPost;