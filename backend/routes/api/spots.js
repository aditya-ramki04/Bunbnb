const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage, SpotImage, User, Booking, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');
const { Op } = require('sequelize');

const router = express.Router();


//GET ALL SPOTS AUTH FALSE
router.get('/', async(req,res) => {
    let allSpots = await Spot.findAll({

      //add avgRating
      attributes: {
        include: [
            [
              sequelize.fn("AVG", sequelize.col('Reviews.stars')), "avgRating"
            ],
        ],
      },
        include: {
            model: Review,
            attributes: []
        },
        group: ['Spot.id']
    })
    res.json(allSpots)
})


//GET DETAILS OF A SPOT FROM AN ID
router.get('/:spotId', async(req,res) => {

  //basic details of spot
  let spotInfo = await Spot.findByPk(Number(req.params.spotId));

  if(!spotInfo){
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
  })
  }
  const spotDetails = spotInfo.toJSON()

  //numReviews
  spotDetails.numReviews = await Review.count({
    where: {
      spotId : Number(req.params.spotId)
    }
  })
  //avgStarRating
spotDetails.avgStarRating = (await Review.sum(('stars'),{
  where: {
    spotId : Number(req.params.spotId)
  }
})) / spotDetails.numReviews;

  //SpotImages
  spotDetails.SpotImages = await SpotImage.findByPk(Number(spotInfo.ownerId),{
    attributes: ['id', 'url','preview']
  })

  //find owner
  spotDetails.owner = await User.findByPk(Number(spotInfo.ownerId),{
    attributes: ['id', 'username','email']
  })

  res.json(spotDetails)
})



module.exports = router;
