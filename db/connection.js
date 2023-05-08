// imports
const { Sequelize, DataTypes } = require("sequelize");

//create an instance of the database call it db
const db = new Sequelize("sqlite::memory", {
  logging: false,
});

//export
module.exports = { db, DataTypes };
