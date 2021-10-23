import axios from 'axios'

export default axios.create({
    baseURL: "https://metals-api.com/api/",
})