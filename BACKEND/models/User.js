const sequelize = require('./dbConnection'); // importe le module de connection
const { Sequelize, DataTypes, Model } = require('sequelize');

class User extends Model {
	// getFullname() {
	// 	return [this.firstname, this.lastname].join(' ');
	// }
}
User.init(
	{
		idUsers: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

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

const Post = require('./Post');
const Comment = require('./Comment');

User.associate = (models) => {
	User.hasMany(models.Post, { foreignKey: 'idPost' });
};

User.associate = (models) => {
	User.hasMany(models.Comment, { foreignKey: 'idComment' });
};
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
