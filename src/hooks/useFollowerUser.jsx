import { useContext } from "react";

import FollowerUserContext from "../context/FollowerUserProvider";

const useFollowerUser = () => {
    return useContext(FollowerUserContext)
}

export default useFollowerUser; 