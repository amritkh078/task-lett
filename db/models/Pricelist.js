const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const PriceList = sequelize.define('PriceList', {
  articleNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  description: {
    type: DataTypes.TEXT,
  }
});

module.exports = PriceList;
