//import
import axios from "axios";

//AxiosWithAuth function
const AxiosWithAuth = () => {
    const token = localStorage.getItem('token')
    console.log(token)
    return axios.create({
        baseURL: `http://localhost:5000`,
        headers: {
            authorization: token
        }
    })
}

//exporting
export default AxiosWithAuth