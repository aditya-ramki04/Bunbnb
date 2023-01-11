'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ReviewImages', [
      {
       reviewId: 1,
       url: 'random url 1'
      },
      {
        reviewId: 2,
        url: 'random url 2'
      },
       {
        reviewId: 3,
        url: 'random url 3'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
