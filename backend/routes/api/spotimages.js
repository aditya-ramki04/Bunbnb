const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage, SpotImage, User, Booking, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { body } = require('express-validator');
const { query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {user} = require('../../db/models/user');
const { Op } = require('sequelize');

const router = express.Router();

//Delete a spot image
router.delete('/:spotImagesid', requireAuth, async (req, res) => {
    const { spotImagesid } = req.params
    const {user} = req
    const spotImage = await SpotImage.findByPk(spotImagesid)
    if (!spotImage) {
        res.statusCode = 404
        res.json({
            message: "Spot image couldn't be found",
            statusCode: 404
        })
    }
    const spot = await spotImage.getSpot({
        attributes: ["ownerId"]
    })
    if(user.id !== spot.ownerId) res.json({message: "Only the owner of the spot can delete a spot image"})

    await spotImage.destroy()
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
  })

module.exports = router;
