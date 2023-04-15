'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class FeedBack extends Model {
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
	FeedBack.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_Id:DataTypes.INTEGER,
		content: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: 'feedbacks',
	});
	return FeedBack;
};