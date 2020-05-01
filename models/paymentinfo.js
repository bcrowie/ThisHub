"use strict";
module.exports = (sequelize, DataTypes) => {
  const PaymentInfo = sequelize.define(
    "PaymentInfo",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      StreetNumber: DataTypes.NUMBER,
      StreetName: DataTypes.STRING,
      Zip: DataTypes.INTEGER,
      City: DataTypes.STRING,
      State: DataTypes.STRING,
      CardNumber: DataTypes.BIGINT,
      Expiration: DataTypes.STRING,
      UserId: DataTypes.INTEGER
    },
    {}
  );
  PaymentInfo.associate = function(models) {
    PaymentInfo.belongsTo(models.User, { foreignKey: "UserId" });
  };
  return PaymentInfo;
};
