'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
      {
       spotId: 8,
       url: 'https://vetmed.tamu.edu/news/wp-content/uploads/sites/9/2018/05/20150804-doghouse.jpg',
       preview: true
      },
      {
        spotId: 9,
        url: 'https://blythewoodworks.com/wp-content/uploads/2018/09/Brittany-Michelles-pup-and-his-Goliath-dog-house.jpg',
        preview: true
       },
       {
        spotId: 10,
        url: 'https://nationaltoday.com/wp-content/uploads/2021/06/shutterstock_695423926-min.jpg',
        preview: true
       },
       {
        spotId: 11,
        url: 'https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/dog-house-ideas-2023-section-4.jpg',
        preview: true
       },
       {
        spotId: 12,
        url: 'https://www.thesprucepets.com/thmb/iMhrSgFljm5wouxpt8XAfCJ3kXI=/1500x0/filters:no_upscale():strip_icc()/PetsfitOutdoorCatHouse-ls-7b67b26901bb4c1294de1cc74d91c668.jpg',
        preview: true
       },
       {
        spotId: 13,
        url: 'https://m.media-amazon.com/images/I/71um4L3dM3L._AC_UF1000,1000_QL80_.jpg',
        preview: true
       },
       {
        spotId: 14,
        url: 'https://agro4africa.com/wp-content/uploads/2020/10/proper-rabbit-housing-system-1.jpg',
        preview: true
       },
       {
        spotId: 15,
        url: 'https://hips.hearstapps.com/hmg-prod/images/91k-mjflbhl-ac-sl1500-1656009089.jpg',
        preview: true
       },
       {
        spotId: 16,
        url: 'https://i.pinimg.com/736x/65/62/22/656222430aa0a08536d9e3b2f0311a40.jpg',
        preview: true
       },
       {
        spotId: 17,
        url: 'https://www.marthastewart.com/thmb/FDN3aLOMaCE1D79jhAz93ghQ0tA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sauder-rufus-dog-house-1120-aa273ce4e19141fab13bc4e16c530f28.jpg',
        preview: true
       }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
