import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useGetCommentsPost = (post) => {
    const {data, error, isLoading} = useSWR(`/posts/${post}`, fetcher, {
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

export default useGetCommentsPost;