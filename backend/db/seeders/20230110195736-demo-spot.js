'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Bunny Lane',
        city: 'New Dop',
        state: 'New York',
        country: 'USA',
        lat: '40.7128',
        lng: '74.0060',
        name: 'Dawg House',
        description: 'A place for people with that dawg in em to gather...real ones only',
        price: 500
      },
      {
        ownerId: 2,
        address: '456 Gus Drive',
        city: 'Los Angeles',
        state: 'California',
        country: 'USA',
        lat: '78.7128',
        lng: '12.0060',
        name: 'The GUS house',
        description: 'Dogs with absurdly long legs only',
        price: 1000
      },
      {
        ownerId: 3,
        address: '789 Lucky Drive',
        city: 'Ballwin',
        state: 'Missouri',
        country: 'USA',
        lat: '237.7128',
        lng: '09.0060',
        name: 'Oompa',
        description: 'Welcome to asian dog household',
        price: 300
      },
      {
        ownerId: 3,
        address: '8342 Bolt Court',
        city: 'Houston',
        state: 'Texas',
        country: 'USA',
        lat: '124.1234',
        lng: '40.6575',
        name: 'Racing House',
        description: 'Fast dogs love it here',
        price: 200
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('Spots',null,{});
  }
};
