'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class CV extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		// static associate(models) {
        //     CV.belongsToMany(models.tags, {
        //         through: "tagformcvs"
        //     }),
		// 	CV.hasMany(models.tagformcvs, { foreignKey: 'formCVId', as: "tagform" })
		// }
	};
	CV.init({
        userId:DataTypes.INTEGER,
		avatar: DataTypes.INTEGER,
        target: DataTypes.STRING,
		education: DataTypes.STRING,
		experience: DataTypes.STRING,
		action: DataTypes.INTEGER,
		certificate: DataTypes.TEXT,
        project: DataTypes.STRING,
        more: DataTypes.STRING,
		cvId: DataTypes.STRING

	}, {
		sequelize,
		modelName: 'cvs',
	});
	return CV;
};