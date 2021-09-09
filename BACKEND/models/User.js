const sequelize = require('./dbConnection'); // importe le module de connection
const { Sequelize, DataTypes, Model } = require('sequelize');

class User extends Model {
	// getFullname() {
	// 	return [this.firstname, this.lastname].join(' ');
	// }
}
User.init(
	{
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		biographie: {
			type: DataTypes.TEXT,
			// allowNull defaults to true
		},
	},
	{ modelName: 'User', sequelize }
);

// Example:
// Post.build({ firstname: 'foo', lastname: 'bar' }).getFullname(); // 'foo bar'

module.exports = User;

// User.findAll({
// 	include: [
// 		{
// 			model: Post,
// 		},
// 	],
// })
// 	.then((user) => {
// 		console.log(user);
// 	})
// 	.catch((error) => res.status(400).json({ error }));
