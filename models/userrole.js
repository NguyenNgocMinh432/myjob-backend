'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class UserRole extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
		UserRole.belongsTo(models.users, {
			foreignKey: "userId",
			targetKey: "id"
		})
		}
	};
	UserRole.init({
		userId: {
		type: DataTypes.INTEGER,
		references: {
			model: "users",
			key: "id"
		}
		},
		roleId: {
		type: DataTypes.INTEGER,
		references: {
			model: "Role",
			key: "id"
		}
		}
	}, {
		sequelize,
		modelName: 'userroles',
	});
  return UserRole;
};