const { default: axios } = require('axios')
const { axiosInstance } = require('../lib/axios')

const getConcerts = async (req, res) => {
    try {
        const response = await axiosInstance.get('/concerts')
        res.json(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to fetch concerts" })
    }
}

const getMerchandiseStalls = async (req, res) => {
    try {
        const response = await axiosInstance.get('/merchandiseStalls')
        res.json(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to fetch merchandiseStalls" })
    }
}

const getAfterParties = async (req, res) => {
    try {
        const response = await axiosInstance.get('/afterParties')
        res.json(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to fetch afterParties" })
    }
}

module.exports = { getConcerts, getMerchandiseStalls, getAfterParties }