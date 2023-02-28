'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
		User.belongsToMany(models.roles, {
			through: "UserRoles"
		}),
			User.belongsToMany(models.works, {
			through: "SaveWorks"
			}),
			User.belongsToMany(models.companies, {
			through: "Recruitments"
			}),
			User.belongsToMany(models.works, {
			through: "WorkApplies",
			as: "workapply"
			})
		User.belongsToMany(models.typeofworks, {
			through: "UserTypeOfWorks"
		}),
			User.belongsToMany(models.tags, {
			through: "UserTags"
			}),

			User.hasMany(models.notificationusers),
			User.hasMany(models.news),
			User.hasOne(models.candidates),
			User.hasMany(models.userroles,{as:"asUserRole"})
		User.hasMany(models.usertags)
    }
  };
	User.init({
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		address: DataTypes.STRING,
		phone: DataTypes.STRING,
		male: DataTypes.STRING,
		avatar: DataTypes.STRING,
		date: DataTypes.STRING,
		introduce: DataTypes.TEXT,
		banner: DataTypes.STRING(500),
		status: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'users',
	});
	return User;
};