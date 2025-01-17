const {
    concert: concertModel,
    afterParties: afterPartiesModel,
    merchandiseStalls: merchandiseStallsModel,
    tour: tourModel,
    tourItem: tourItemModel
} = require('../models')

const createTour = async (req, res) => {
    try {
        const { concerts, afterParties, merchandiseStalls, name } = req.body
        const newTour = await tourModel.create({ name })

        if (concerts && concerts.length > 0) {
            for (const concert of concerts) {
                const savedConcert = await concertModel.create(concert)
                await tourItemModel.create({
                    tourId: newTour.id,
                    itemId: savedConcert.id,
                    type: 'concert'
                })
            }
        }

        if (merchandiseStalls && merchandiseStalls.length > 0) {
            for (const merchandise of merchandiseStalls) {
                const savedMerchandiseStalls = await merchandiseStallsModel.create(merchandise)
                await tourItemModel.create({
                    tourId: newTour.id,
                    itemId: savedMerchandiseStalls.id,
                    type: "merchandiseStalls"
                })
            }
        }

        if (afterParties && afterParties.length > 0) {
            for (const afterParty of afterParties) {
                const savedAfterParties = await afterPartiesModel.create(afterParty)
                await tourItemModel.create({
                    tourId: newTour.id,
                    itemId: savedAfterParties.id,
                    type: "afterParties"
                })
            }
        }

        res.status(201).json({ message: "Tour created", tour: newTour })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to create tour" })
    }
}

const getTour = async (req, res) => {
    try {
        const tour = await tourModel.findByPk(req.params.id)
        if (!tour) return res.status(404).json({ error: "tour not found" })

        const items = await tourItemModel.findAll({
            where: { tourId: tour.id }
        })

        const concerts = []
        const merchandiseStalls = []
        const afterParties = []

        for (const item of items) {
            if (item.type === "concert") {
                const concert = await concertModel.findByPk(item.itemId)
                if (concert) concerts.push(concert)
            } else if (item.type === "merchandiseStalls") {
                const merchandise = await merchandiseStallsModel.findByPk(item.itemId)
                if (merchandise) merchandiseStalls.push(merchandise)
            } else if (item.type === "afterParties") {
                const party = await afterPartiesModel.findByPk(item.itemId)
                if (party) afterParties.push(party)
            }
        }

        res.json({
            tour,
            concerts,
            merchandiseStalls,
            afterParties
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to retrieve tour" })
    }
}

module.exports = { createTour, getTour }