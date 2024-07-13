// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const Property = sequelize.define('Property', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

sequelize.sync();

module.exports = {
  sequelize,
  Property,
  User
};
