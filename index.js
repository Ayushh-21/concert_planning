const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { createTour, getTour } = require('./controller/dataController')
const {getConcerts, getMerchandiseStalls, getAfterParties} = require('./controller/tourController')
const { sequelize } = require('./models')

const app = express()
app.use(express.json())
app.use(cors())


app.post('/tour', createTour)
app.get('/tour/:id', getTour)

app.get('/data/concerts', getConcerts)
app.get('/data/merchandiseStalls', getMerchandiseStalls)
app.get('/data/afterParties', getAfterParties)


sequelize
    .authenticate()
    .then(() => {
        console.log("Database Conneted.....")
    })
    .catch((error) => {
        console.log('Unable to connect to the database:', error)
    })

const PORT = 3000

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port, http://localhost:${process.env.PORT || PORT}`);
})    


















// axiosInstance
//     .get('/health')
//     .then((response) => console.log(response.data))
//     .catch((error) => console.log("Error fetching the axios health", error))

    
// const getConcertsByArtistAndCity = async (artist, city) => {
//     try {
//         const response = await axiosInstance.get('/concerts/search', {
//             params: {
//                 artist: artist,
//                 city: city
//             }
//         })

//         return response.data
//     } catch (error) {
//         console.log(error)
//     }
// }

// getConcertsByArtistAndCity("Taylor Swift", "Las Vegas")
//     .then((concerts => console.log(concerts)))
//     .catch(error => console.log(error))


