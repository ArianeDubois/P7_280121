const sequelize = require('./dbConnection'); // importe le module de connection
const { Sequelize, DataTypes, Model } = require('sequelize');

class User extends Model {
	// getFullname() {
	// 	return [this.firstname, this.lastname].join(' ');
	// }
}
User.init(
	{
		// idUser: {
		// 	type: DataTypes.INTEGER,
		// 	primaryKey: true,
		// 	autoIncrement: true,
		// },

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
		isAdmin: {
			type: DataTypes.BOOLEAN,
		},
	},
	{ modelName: 'User', sequelize }
);

module.exports = User;
