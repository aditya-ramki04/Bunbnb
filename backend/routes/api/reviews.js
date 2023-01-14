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



//GET ALL REVIEWS OF THE CURRENT USER
router.get('/current', requireAuth, async(req,res) => { //need to add reviewImage column
  const { user } = req
  let allReviews = await Review.findAll({
    where: {
      userId: user.id
    },
    include: {
      model: Spot,ReviewImage
    }
  })


  res.json(allReviews)
})

  module.exports = router;
