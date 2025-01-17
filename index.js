const axiosInstance = require('./lib/axios')
require('dotenv').config()

axiosInstance
    .get('/health')
    .then((response) => console.log(response.data))
    .catch((error) => console.log("Error fetching the axios health", error))


const getConcertsByArtistAndCity = async (artist, city) => {
    try {
        const response = await axiosInstance.get('/concerts/search', {
            params: {
                artist: artist,
                city: city
            }
        })

        return response.data
    } catch (error) {
        console.log(error)
    }
}

getConcertsByArtistAndCity("Taylor Swift", "Las Vegas")
    .then((concerts => console.log(concerts)))
    .catch(error => console.log(error))

