const sequelize = require('./dbConnection'); // importe le module de connection
const { Sequelize, DataTypes, Model } = require('sequelize');
const User = require('./User');
const Comment = require('./Comment');
class Post extends Model {
	static associate(models) {
		models.Post.belongsTo(models.User, { foreignKey: 'idUsers', as: 'idUser' });
	}
}
Post.init(
	{
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},

		imageUrl: {
			type: DataTypes.STRING,
		},

		date: {
			type: DataTypes.DATE,
			// allowNull defaults to true
		},
	},
	{ modelName: 'Post', sequelize }
);

// Example:
// Post.build({ content: 'hello', lastname: 'bar' }).getFullname(); // 'foo bar'

// User.hasMany(Post, {foreignKey: 'user_id'}) Post.belongsTo(User, {foreignKey: 'user_id'}) Post.find({ where: { ...}, include: [User]})

// Post.findAll({
// 	include: [
// 		{
// 			model: User,
// 		},
// 	],
// })
// 	.then((user) => {
// 		res.status(200).json(user);
// 	})
// 	.catch((error) => res.status(400).json({ error }));

module.exports = Post;
