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
})

//EDIT A REVIEW
router.put('/:reviewId', requireAuth, validateReview, async(req,res) => {
  const { user } = req
  const {review, stars} = req.body
  const checkReview = await Review.findByPk(req.params.reviewId)
  if(checkReview){
    if(checkReview.userId === user.id){
      const updateReview = await Review.update({review,stars},
        {
          where: {
            id: req.params.reviewId
          }
        }
        )
      res.json(await Review.findByPk(req.params.reviewId))
    }
  }
  else
  {
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404
  })
  }
})

//DELETE REVIEW
router.delete('/:reviewId', requireAuth, async(req,res) => {
  const { user } = req
  const review = await Review.findByPk(req.params.reviewId)

  if(review){
    if(user.id === review.userId){
      await Review.destroy({
        where: {
          id: req.params.reviewId
        }
      })
      res.json({
        message: "Successfully deleted",
        statusCode: 200
      })
    }
    else
    res.json('Review must belong to current user')
  }
  else
  {
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404
  })
  }
})

module.exports = router;
