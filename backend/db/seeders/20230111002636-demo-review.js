'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 1,
        review:'mid asf but great for price',
        stars: 3
      },
      {
        userId: 2,
        spotId: 2,
        review:'great spot my dog loved it',
        stars: 5
      },
      {
        userId: 1,
        spotId: 2,
        review:'great spot my dog kinda loved it',
        stars: 4
      },
      {
        userId: 3,
        spotId: 3,
        review:'my dog literally shat himself all over the place gl but still a good spot',
        stars: 4
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Reviews',null,{});
  }
};
