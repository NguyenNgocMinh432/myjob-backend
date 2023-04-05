'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class TagWork extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
		TagWork.belongsTo(models.works, {
			foreignKey: "workId",
			targetKey: "id"
		})
		}
  	};
	TagWork.init({
		tagId: {
			type: DataTypes.INTEGER,
			references: {
				model: "tags",
				key: "id"
			}
		},
		workId: {
		type: DataTypes.INTEGER,
		references: {
			model: "works",
			key: "id"
		}
		},
	}, {
		sequelize,
		modelName: 'tagworks',
	});
  return TagWork;
};