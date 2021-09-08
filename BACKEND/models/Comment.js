const sequelize = require('./dbConnection'); // importe le module de connection
const { Sequelize, DataTypes, Model } = require('sequelize');
const User = require('./User');
const Post = require('./Post');

class Comment extends Model {}
Comment.init(
	{
		idComment: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		idUser: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		idPost: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{ modelName: 'Comment', sequelize }
);

Comment.associate = (models) => {
	// Post.belongsTo(sequelize.models.User, { foreignKey: 'idUser' });
	Comment.belongsTo(models.User, { foreignKey: 'idUsers' });
};
Comment.associate = (models) => {
	// Post.belongsTo(sequelize.models.User, { foreignKey: 'idUser' });
	Comment.belongsTo(models.Post, { foreignKey: 'idPost' });
};

module.exports = Comment;
