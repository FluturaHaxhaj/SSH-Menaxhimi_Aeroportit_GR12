'use strict'

const router = require('express').Router()
const FlightController = require('../controllers/FlightController')

const flight = new FlightController()

router.get('/flight', flight.listAll.bind(flight))
router.get('/flight/:id', flight.find.bind(flight))
router.post('/flight', flight.createFlight.bind(flight))
router.put('/flight/:id', flight.updateFlight.bind(flight))
router.patch('/flight/:id', flight.updateFlight.bind(flight))
router.delete('/flight/:id', flight.deleteFlight.bind(flight))

module.exports = router
