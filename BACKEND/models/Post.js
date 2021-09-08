const sequelize = require('./dbConnection'); // importe le module de connection
const { Sequelize, DataTypes, Model } = require('sequelize');
const User = require('./User');
const Comment = require('./Comment');
class Post extends Model {
	// getFullname() {
	// 	return [this.firstname, this.lastname].join(' ');
	// }
}
Post.init(
	{
		idPost: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		idUser: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'User',
				key: 'usersId',
			},
		},

		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},

		likes: {
			type: DataTypes.INTEGER,
			defaultValue: 5,
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

Post.associate = (models) => {
	// Post.belongsTo(sequelize.models.User, { foreignKey: 'idUser' });
	Post.belongsTo(models.User, { foreignKey: 'idUsers' });
};

Post.associate = (models) => {
	// Post.belongsTo(sequelize.models.User, { foreignKey: 'idUser' });
	Post.hasMany(models.Comment, { foreignKey: 'idComment' });
};
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
