'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.addColumn('typeof', 'icon', {
		type: Sequelize.STRING,
		allowNull: true,
		})
	},

	down: async (queryInterface, Sequelize) => {
		return Promise.all([queryInterface.removeColumn('typeofworks', 'icon')]);
	}
};
