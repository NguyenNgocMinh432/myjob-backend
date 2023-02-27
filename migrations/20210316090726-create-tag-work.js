'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('tagworks', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		tagId: {
			type: Sequelize.INTEGER,
			references: {
			model: "Tags",
			key: "id"
			},
			onDelete: 'CASCADE'
		},
		workId: {
			type: Sequelize.INTEGER,
			references: {
			model: "works",
			key: "id"
			},
			onDelete: 'CASCADE'
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE
		}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('tagworks');
	}
};