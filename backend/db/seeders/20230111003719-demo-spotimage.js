'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
      {
       spotId: 1,
       url: 'random url 1',
       preview: true
      },
      {
        spotId: 2,
        url: 'random url 2',
        preview: true
       },
       {
        spotId: 3,
        url: 'random url 3',
        preview: true
       }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
