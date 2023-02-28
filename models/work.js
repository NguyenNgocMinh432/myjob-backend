'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Work.belongsTo(models.companies),
        // Work.belongsTo(models.TypeOfWork),
        Work.belongsToMany(models.users, {
          through: "saveworks"
        }),
        Work.belongsToMany(models.users, {
          through: "workapplies",
          as: "workapply2"
        }),
        Work.belongsToMany(models.tags, {
          through: "tagworks"
        }),
        Work.belongsToMany(models.typeofworks, {
          through: "worktypeofWorks"
        }),
        Work.hasMany(models.tagworks, { foreignKey: 'workId', as: "tagWork" }),
        Work.hasMany(models.workapplies, { foreignKey: 'workId'}),
        Work.hasMany(models.worktypeofworks, { foreignKey: 'workId', as: "workType" })
    }
  };
  Work.init({
    companyId: {
      type: DataTypes.INTEGER,
      references: {
        model: "companies",
        key: "id"
      }
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    addressGoogle: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    price1: DataTypes.INTEGER,
    price2: DataTypes.INTEGER,
    request: DataTypes.STRING,
    interest: DataTypes.STRING,
    dealtime: DataTypes.STRING,
    nature: DataTypes.STRING,
    exprience: DataTypes.STRING,
    description: DataTypes.STRING,
    form: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'works',
  });
  return Work;
};