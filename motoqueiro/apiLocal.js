import axios from 'axios'

const apiLocal = axios.create({
    baseURL: 'http://10.152.46.28:3333'
})

export default apiLocal