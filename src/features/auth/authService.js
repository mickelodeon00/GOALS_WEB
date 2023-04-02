import axios from 'axios'
import envConfig from '../../utils/envConfig'
const API_URL = `${envConfig.backendUrl}/users/`

const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const login = async (userData) => {
    console.log(API_URL, "url")
    const response = await axios.post(API_URL + "login", userData)
    

    console.log(response,"rete")

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    console.log(response.data, "response")
    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}
export default authService