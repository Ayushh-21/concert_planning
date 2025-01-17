const axios = require('axios')
require('dotenv').config()

const axiosInstance = axios.create({
    baseURL: process.env.MICROSERVICE_BASE_URL,
    headers: {
        CLIENT_KEY: process.env.CLIENT_KEY,
        CLIENT_SECRET: process.env.CLIENT_SECRET
    }
})

module.exports = axiosInstance;