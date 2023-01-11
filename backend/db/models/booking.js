'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, {foreignKey: 'userId'})
      Booking.belongsTo(models.Spot, {foreignKey: 'spotId'})
    }
  }
  Booking.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Users'},
      onDelete: 'CASCADE'
    },
    spotId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Users'},
      onDelete: 'CASCADE'
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
