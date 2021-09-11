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
		idUser: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: 'id',
			},
			allowNull: false,
		},

		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},

		imageUrl: {
			type: DataTypes.STRING,
		},
	},
	{ modelName: 'Post', sequelize }
);
module.exports = Post;
