const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Terms = sequelize.define('Terms', {
  language: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['en', 'sv']],
    },
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  }
});

module.exports = Terms;
