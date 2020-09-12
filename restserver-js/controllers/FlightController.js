'use strict'

const createError = require('http-errors')
const HttpStatus = require('http-status-codes')
const Flight = require('../models/Flight')

class FlightController {
  constructor() {
    /** @type {Array<Flight>} */
    this.list = []
  }

  listAll (req, res) {
    return res.status(HttpStatus.OK).json(this.list)
  }

  find (req, res, next) {
    try {
      const id = parseInt(req.params.id, 10)
      const flight = this.list.find(x => x.id === id)
      if (!flight) throw new createError.NotFound()

      return res.status(HttpStatus.OK).json(flight)
    } catch (err) {
      next(err)
    }
  }

  createFlight (req, res, next) {
    try {
      const { fname,dcity,acity,ddate,adate,price } = req.body
      const id = this.list.length > 0 ? this.list[this.list.length - 1].id + 1 : 1
      const flight = new Flight({ id, fname ,dcity,acity,ddate,adate,price})
      this.list.push(flight)

      return res.status(HttpStatus.CREATED).json(id)
    } catch (err) {
      next(err)
    }
  }

  updateFlight (req, res, next) {
    try {
      const id = parseInt(req.params.id, 10)
      const { fname,dcity,acity,ddate,adate,price } = req.body
      const flight = this.list.find(x => x.id === id)
      if (!flight) throw new createError.NotFound()
      flight.fname = fname
      flight.dcity = dcity
      flight.acity = acity
      flight.ddate = ddate
      flight.adate = adate
      flight.price = price

      return res.status(HttpStatus.OK).end()
    } catch (err) {
      next(err)
    }
  }

  deleteFlight (req, res, next) {
    try {
      const id = parseInt(req.params.id, 10)
      const flight = this.list.find(x => x.id === id)
      if (!flight) throw new createError.NotFound()
      this.list = this.list.filter(x => x.id !== id)

      return res.status(HttpStatus.OK).end()
    } catch (err) {
      next(err)
    }
  }
}

module.exports = FlightController
