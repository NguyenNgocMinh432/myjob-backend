'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TagNew extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
		TagNew.belongsTo(models.tags, {
			foreignKey: "tagId",
			targetKey: "id"
		});
		TagNew.belongsTo(models.news, {
			foreignKey: "newsId",
			targetKey: "id"
		})
    }
  	};
	TagNew.init({
		newsId: {
		type: DataTypes.INTEGER,
		references: {
			model: "news",
			key: "id"
		}
		},
		tagId: {
		type: DataTypes.INTEGER,
		references: {
			model: "tags",
			key: "id"
		}
		}
	}, {
		sequelize,
		modelName: 'tagnews',
	});
  return TagNew;
};