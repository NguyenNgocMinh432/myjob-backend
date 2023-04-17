'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  	class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
		Tag.belongsToMany(models.news, {
			through: "tagnews"
		}),
		// Tag.belongsToMany(models.candidates, {
		// 	through: "tagcandidates"
		// }),
		Tag.belongsToMany(models.works, {
			through: "tagworks"
		})
		Tag.belongsToMany(models.users, {
			through: "usertags"
		}),
		Tag.belongsToMany(models.formcvs, {
			through: "tagformcvs"
		})
    }
  	};
	Tag.init({
		name: DataTypes.STRING,
		status: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'tags',
	});
  return Tag;
};