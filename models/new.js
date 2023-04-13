'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  	class New extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			New.belongsTo(models.users),
			New.belongsToMany(models.tags, {
				through: 'tagnew',
			}),
			New.hasMany(models.tagnews, { as: 'tagnew' });
		}
 	}
  	New.init(
		{
			name: DataTypes.STRING,
			samary: DataTypes.STRING,
			content: DataTypes.STRING,
			avatar: DataTypes.STRING,
			userId: {
				type: DataTypes.INTEGER,
				references: {
				model: 'users',
				key: 'id',	
				},
			},
			status: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'news',
		},
	);
	return New;	
};
