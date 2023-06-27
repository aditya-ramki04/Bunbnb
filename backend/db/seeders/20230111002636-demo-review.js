'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 4,
        spotId: 8,
        review:'mid asf but great for price',
        stars: 3
      },
      {
        userId: 4,
        spotId: 9,
        review:'great spot my dog loved it',
        stars: 5
      },
      {
        userId: 4,
        spotId: 10,
        review:'great spot my dog kinda loved it',
        stars: 4
      },
      {
        userId: 5,
        spotId: 11,
        review:'my dog literally shat himself all over the place gl but still a good spot',
        stars: 4
      },
      {
        userId: 5,
        spotId: 8,
        review: 'Amazing spot with reasonable pricing!',
        stars: 5
      },
      {
        userId: 6,
        spotId: 9,
        review: 'Decent place for the price, could be better.',
        stars: 3
      },
      {
        userId: 6,
        spotId: 10,
        review: 'Great value for the money, but lacks amenities.',
        stars: 4
      },
      {
        userId: 7,
        spotId: 11,
        review: 'Not the best, but affordable option.',
        stars: 2
      },
      {
        userId: 7,
        spotId: 12,
        review: 'Average place with reasonable pricing.',
        stars: 3
      },
      {
        userId: 7,
        spotId: 13,
        review: 'Good value for the price, but cleanliness could be improved.',
        stars: 4
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Reviews',null,{});
  }
};
