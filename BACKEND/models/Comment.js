const sequelize = require('./dbConnection'); // importe le module de connection
const { Sequelize, DataTypes, Model } = require('sequelize');
const User = require('./User');
const Post = require('./Post');

class Comment extends Model {}
Comment.init(
	{
		idPost: {
			type: DataTypes.INTEGER,
			references: {
				model: Post,
				key: 'id',
			},
			allowNull: false,
		},
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
	},
	{ modelName: 'Comment', sequelize }
);

module.exports = Comment;
