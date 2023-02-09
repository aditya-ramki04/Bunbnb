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

//CREATE BOOKING BASED ON SPOT ID
router.post('/:spotId/bookings', requireAuth, async(req,res) => {
  const { user } = req
  const spot = await Spot.findByPk(req.params.spotId)
  const {startDate, endDate} = req.body
  let start = Date.parse(startDate)
  let end = Date.parse(endDate)
  let now = Date.now()

  //check end date validation
  if (end <= start) {
     res.json({
      message: "Checkout date cannot be before the check-in date",
      statusCode: 400,
      errors: {
        "endDate": "End Date cannot before Start Date"
      }
    })
  }

  //start date validation
  if (start < now) {
    res.statusCode = 400
    return res.json({
      message: "Can't make a booking before today",
      statusCode: 400,
      errors: {
        "Check-in": "Check-in can't be before today"
      }
    })
  }

  if(spot){
    if(user.id !== spot.ownerId){

      let startDateError = 0;
      let endDateError = 0;
      let bothDateError = 0;

      const bookedDates = await Booking.findAll({
        attributes: ["startDate", "endDate"]
      })

      for(let i = 0; i < bookedDates.length; i++){
        if(start >=Date.parse(bookedDates[i].startDate) && start<=Date.parse(bookedDates[i].endDate)) startDateError++
        else if(end >=Date.parse(bookedDates[i].startDate) && end <=Date.parse(bookedDates[i].endDate)) endDateError++
        else if(start<=Date.parse(bookedDates[i].startDate) && end>=Date.parse(bookedDates[i].endDate)) bothDatesError++
      }
      if(bothDateError > 0){
        return res.json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          errors: {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking"
          }
        })
      }
      else if(startDateError > 0){
        return res.json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          errors: {
            startDate: "Start date conflicts with an existing booking"
          }
        })
      }

      else if(endDateError > 0){
        return res.json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          errors: {
            endDate: "End date conflicts with an existing booking"
          }
        })
      }
      //create new booking
      const newBooking = await Booking.create({
         userId: user.id, spotId: req.params.spotId,startDate,endDate
      })
      res.json(newBooking)
    }
    else{
      return res.json({
        message: "Spot must NOT belong to the current user"
    })
    }
  }
  else{
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
  })
  }
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
      res.json(await Spot.findByPk(req.params.spotId))
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


//Create a Review for a Spot based on the Spot's Id
router.post('/:spotId/reviews', requireAuth, validateReview, async(req,res) => {
  const {user} = req
  const {review,stars} = req.body
  const spot = await Spot.findByPk(req.params.spotId)

  //if user already submitted review
  const findReview = await Review.findAll({
    where: {spotId: req.params.spotId, userId: user.id}
  })
  if(findReview.length > 0){
    res.statusCode = 403
    return res.json({message: "review already exists from current user",
  statusCode: 403})
  }

    //spot exists
  if(spot){
      const newReview = await Review.create({
        review,stars, userId: user.id, spotId: req.params.spotId
      })
      res.json(newReview)
  }
  else{
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
  })
  }
})


//GET ALL REVIEWS BY A SPOT'S ID
router.get('/:spotId/reviews', async(req,res) => { //need to add reviewImage column
  const spot = await Spot.findByPk(req.params.spotId)

  if(spot){
    const allReviews = await Review.findAll({
      where: {
        spotId: req.params.spotId
      },
      include: {
        model: User,ReviewImage
      }
    })
    res.json(allReviews)
  }
  else{
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
  })
  }
})


//GET ALL BOOKINGS BASED ON SPOT ID
router.get('/:spotId/bookings', requireAuth, async(req,res) => {
  const { user } = req
  const spot = await Spot.findByPk(req.params.spotId)

  if(spot){
    if(spot.ownerId === user.id){
      const allBookings = await Booking.findAll({
        where: {
          spotId: req.params.spotId
        },
        include: {
          model: user
        }
      })
      res.json(allBookings)
    }
    else{
      const allBookings = await Booking.findAll({
        where: {
          spotId: req.params.spotId
        },
        attributes: ['spotId', 'startDate', 'endDate']
      })
      res.json(allBookings)
    }
  }
  else{
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
  })
  }
})



module.exports = router;
