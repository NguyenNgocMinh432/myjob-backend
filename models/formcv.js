'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class FormCV extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
		FormCV.belongsToMany(models.tags, {
			through: "tagformcvs"
		}),
			FormCV.hasMany(models.tagformcvs, { foreignKey: 'formCVId', as: "tagform" })
		}
	};
	FormCV.init({
		name: DataTypes.STRING,
		avatar: DataTypes.STRING,
		status: DataTypes.INTEGER,
		content: DataTypes.TEXT
	}, {
		sequelize,
		modelName: 'formcvs',
	});
	return FormCV;
};