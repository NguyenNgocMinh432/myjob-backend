'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class UserTag extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
		UserTag.belongsTo(models.tags, {
			foreignKey: "tagId",
			targetKey: "id"
		});
		UserTag.belongsTo(models.users, {
			foreignKey: "userId",
			targetKey: "id"
		})
		}
  	};
	UserTag.init({
		tagId: DataTypes.INTEGER,
		userId: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'usertags',
	});
  return UserTag;
};