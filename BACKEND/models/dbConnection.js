// require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('groupomania', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',
	port: '8889',
	define: {
		timestamps: false,
	},
});

module.exports = sequelize;
