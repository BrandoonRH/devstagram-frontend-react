import clientAxios from "../config/axios";
const token = localStorage.getItem('AUTH_TOKEN'); 
const configHeaders = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}
const fetcher = (url) => clientAxios.get(url, configHeaders).then((res) => res.data); 
export default fetcher;