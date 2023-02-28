'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkApply extends Model {

		static associate(models) {
			WorkApply.belongsTo(models.works, {
				foreignKey: "workId",
				targetKey: "id"
			});
			WorkApply.belongsTo(models.users, {
				foreignKey: "userId",
				targetKey: "id"
			})
		}
  };
	WorkApply.init({
		workId: DataTypes.INTEGER,
		userId: DataTypes.INTEGER,
		message: DataTypes.STRING,
		link: DataTypes.STRING,
		status: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'workapplies',
	});
  return WorkApply;
};