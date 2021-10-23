import axios from 'axios'

export default axios.create({
    baseURL: "http://api.exchangeratesapi.io/v1/latest?access_key=d8b7b04ef045ffadfc23928f041423df",
})