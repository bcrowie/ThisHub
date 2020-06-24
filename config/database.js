const { Sequelize } = require("sequelize");
module.exports = new Sequelize("thishub", "hubadmin", "password1234", {
  host: "localhost",
  dialect: "postgres",
});
// module.exports = new Sequelize(
//   "dj1hjp9pufe4",
//   "blgmtauhottfis",
//   "32725cabbb89b831e6b8f11d846df98531d71e6d6c5d6cd16026ef9069c96c63",
//   {
//     host: "localhost",
//     dialect: "postgres",
//   }
// );
