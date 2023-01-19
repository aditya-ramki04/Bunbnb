const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage, SpotImage, User, Booking, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { body } = require('express-validator');
const { query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {user} = require('../../db/models/user');
const { Op, where } = require('sequelize');

const router = express.Router();


//GET CURRENT USERS BOOKINGS
router.get('/current', requireAuth, async(req,res) => {
    const { user } = req
    let allBookings = await Booking.findAll({
        where: {
            userId : user.id
        },
        include: {
            model: Spot
        }
    })
    res.json(allBookings)
})



//DELETE A BOOKING
router.delete('/:bookingid', requireAuth, async (req, res) => {
    const { bookingid } = req.params
    const booking = await Booking.findByPk(bookingid)
    if (booking) {
      await booking.destroy()
      res.json({
        message: "Successfully deleted",
        statusCode: 200
      })
    }
    else {
      res.statusCode = 404
      res.json({
        message: "Booking couldn't be found",
        statusCode: 404
      })
    }
  })

module.exports = router;
