'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
       userId: 1,
       spotId: 1,
       startDate: new Date('2023-01-01'),
       endDate: new Date('2023-01-10')
      },
      {
        userId: 2,
        spotId: 2,
        startDate: new Date('2023-01-15'),
        endDate: new Date('2023-01-23')
      },
      {
        userId: 3,
        spotId: 3,
        startDate: new Date('2023-02-18'),
        endDate: new Date('2023-02-23')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bookings',null,{});
  }
};
