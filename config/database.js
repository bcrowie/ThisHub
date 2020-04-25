const { Sequelize } = require("sequelize");
module.exports = new Sequelize("thishub", "hubadmin", "password1234", {
  host: "localhost",
  dialect: "postgres"
});
