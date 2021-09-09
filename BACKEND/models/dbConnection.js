// require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('groupomania', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',
	port: '8889',
	// define: {
	// 	timestamps: false,
	// },
});

// const models = {
// 	User: User.init(sequelize, Sequelize),
// 	Post: Post.init(sequelize, Sequelize),
// };

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
// 	host: process.env.DB_HOST,
// 	dialect: 'mysql',
// 	port: process.env.DB_PORT,
// 	define: {
// 		timestamps: false,
// 	},
// });

// Run `.associate` if it exists,
// // ie create relationships in the ORM
// Object.values(models)
// 	.filter((model) => typeof model.associate === 'function')
// 	.forEach((model) => model.associate(models));

// const db = {
// 	...models,
// 	sequelize,
// };

module.exports = sequelize;
