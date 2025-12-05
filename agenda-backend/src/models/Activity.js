const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Activity = sequelize.define("Activity", {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.STRING },
  inicio: { type: DataTypes.DATE, allowNull: false },
  fim: { type: DataTypes.DATE, allowNull: false },
  status: {
    type: DataTypes.ENUM("pendente", "concluída", "cancelada"),
    defaultValue: "pendente"
  }
});

User.hasMany(Activity, { foreignKey: "userId" });
Activity.belongsTo(User, { foreignKey: "userId" });

module.exports = Activity;
