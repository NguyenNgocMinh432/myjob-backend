'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class NotificationCompany extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
		NotificationCompany.belongsTo(models.companies)
		}
	};
	NotificationCompany.init({
		companyId: {
		type: DataTypes.INTEGER,
		references: {
			model: "companies",
			key: "id"
		}
		},
		messager: DataTypes.STRING,
		link: DataTypes.STRING,
		status: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'notificationcompanies',
	});
	return NotificationCompany;
};