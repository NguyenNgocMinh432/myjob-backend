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
		Tag.belongsToMany(models.candidates, {
		through: "TagCandidates"
		}),
		Tag.belongsToMany(models.works, {
		through: "TagWorks"
		})
		Tag.belongsToMany(models.users, {
			through: "UserTags"
		}),
		Tag.belongsToMany(models.formcvs, {
		through: "TagFormCVs"
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