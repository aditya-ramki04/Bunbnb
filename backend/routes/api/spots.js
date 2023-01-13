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

//VALIDATIONS
const validateSpotInfo = [
  body('address')
    .isString()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid address.'),
  body('city')
    .isString()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid city.'),
  body('state')
    .exists({ checkFalsy: true })
    .isString()
    .withMessage('Please provide a valid state.'),
  body('country')
    .isString()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid country'),
  body('lat')
    .isFloat()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid latitude'),
  body('lng')
    .isFloat()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid longitude'),
  body('name')
    .isString()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid name'),
  body('description')
    .isString()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid description'),
  body('price')
    .isFloat()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid price'),
  handleValidationErrors
];

const validateReview = [
  body('review')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Please provide a valid review.'),
  body('stars')
      .exists({ checkFalsy: true })
      .isInt({ min: 1, max: 5 })
      .withMessage('Please provide a valid rating.'),
  handleValidationErrors
];


//CREATE A SPOT
router.post('/', requireAuth, validateSpotInfo, async (req, res) => {
  const { user } = req
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const newSpot = await Spot.create({
    address, city, state, country, lat, lng, name, description, price, ownerId: user.id
  });

  res.json(newSpot)
})

//ADD IMAGE TO SPOT BASED ON SPOT ID
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const {user} = req
  const {url, preview} = req.body
  const spot = await Spot.findByPk(req.params.spotId)

  if(spot){
    if(user.id === spot.ownerId)
    {
      const newSpotImage = await SpotImage.create({
        url,preview,spotId: req.params.spotId
      })
      res.json(newSpotImage)
    }
    else
    res.json('Spot must belong to current user')
  }
  else
  {
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
  })
  }
})



//EDIT A SPOT
router.put('/:spotId', requireAuth, validateSpotInfo, async(req,res) => {
  const { user } = req
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const spot = await Spot.findByPk(req.params.spotId)

  if(spot){
    if(user.id === spot.ownerId){
      const updateSpot = await Spot.update({
        address, city, state, country, lat, lng, name, description, price, ownerId: user.id
      }, {where: {id: req.params.spotId}});
      res.json(updateSpot)
    }
    else
    res.json('Spot must belong to current user')
  }
  else
  {
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
  })
  }
})

//GET ALL SPOTS OWNED BY CURRENT USER
router.get('/current', requireAuth, async(req,res) => {
  const { user } = req
  let allSpots = await Spot.findAll({
    where: {
      ownerId: user.id
    },
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
spotDetails.avgStarRating = (await Review.sum(('stars'),{ //alright tristan
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

//DELETE A SPOT
router.delete('/:spotId', requireAuth, async(req,res) => {
  const { user } = req
  const spot = await Spot.findByPk(req.params.spotId)

  if(spot){
    if(user.id === spot.ownerId){
      await Spot.destroy({
        where: {
          id: req.params.spotId
        }
      })
      res.json({
        message: "Successfully deleted",
        statusCode: 200
      })
    }
    else
    res.json('Spot must belong to current user')
  }
  else
  {
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
  })
  }
})

module.exports = router;
