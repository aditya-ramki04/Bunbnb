'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 4,
        address: '123 Bunny Lane',
        city: 'New Dop',
        state: 'New York',
        country: 'USA',
        lat: 40.7128,
        lng: 74.0060,
        name: 'Dawg House',
        description: 'A place for people with that dawg in em to gather...real ones only',
        price: 500
      },
      {
        ownerId: 4,
        address: '456 Gus Drive',
        city: 'Los Angeles',
        state: 'California',
        country: 'USA',
        lat: 78.7128,
        lng: 12.0060,
        name: 'The GUS house',
        description: 'Dogs with absurdly long legs only',
        price: 1000
      },
      {
        ownerId: 4,
        address: '789 Lucky Drive',
        city: 'Ballwin',
        state: 'Missouri',
        country: 'USA',
        lat: 37.7128,
        lng: 90.0060,
        name: 'Oompa',
        description: 'Welcome to asian dog household',
        price: 300
      },
      {
        ownerId: 5,
        address: '8342 Bolt Court',
        city: 'Houston',
        state: 'Texas',
        country: 'USA',
        lat: 24.1234,
        lng: 40.6575,
        name: 'Racing House',
        description: 'Fast dogs love it here',
        price: 200
      },
      {
        ownerId: 5,
        address: '456 Hopper Avenue',
        city: 'Sterling',
        state: 'Virginia',
        country: 'USA',
        lat: 40.7155,
        lng: 74.0059,
        name: 'Cats Lair',
        description: 'A cozy spot for feline enthusiasts to come together.',
        price: 550
      },
      {
        ownerId: 5,
        address: '789 Paws Street',
        city: 'Austin',
        state: 'Texas',
        country: 'USA',
        lat: 40.7180,
        lng: 74.0058,
        name: 'Birds Nest',
        description: 'A haven for avian lovers to share their passion.',
        price: 450
      },
      {
        ownerId: 6,
        address: '987 Woof Boulevard',
        city: 'Denver',
        state: 'Colorado',
        country: 'USA',
        lat: 40.7143,
        lng: 74.0061,
        name: 'Rabbit Hutch',
        description: 'A place where bunny enthusiasts can hop in joy.',
        price: 520
      },
      {
        ownerId: 6,
        address: '321 Meow Lane',
        city: 'Miami',
        state: 'Florida',
        country: 'USA',
        lat: 40.7122,
        lng: 74.0062,
        name: 'Purrfect Haven',
        description: 'An ideal spot for cat lovers to gather and exchange stories.',
        price: 490
      },
      {
        ownerId: 6,
        address: '654 Squeak Street',
        city: 'Seattle',
        state: 'Washington',
        country: 'USA',
        lat: 40.7175,
        lng: 74.0057,
        name: 'Rodent Retreat',
        description: 'A cozy nook for rodent enthusiasts to meet and mingle.',
        price: 530
      },
      {
        ownerId: 7,
        address: '321 Woof Avenue',
        city: 'Nashville',
        state: 'Tennessee',
        country: 'USA',
        lat: 40.7151,
        lng: 74.0063,
        name: 'Canine Corner',
        description: 'A dedicated space for dog lovers to connect and share their love for canines.',
        price: 510
      }
    ], {});
  },
  async down (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('Spots',null,{});
  }
};
