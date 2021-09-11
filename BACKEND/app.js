const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const sequelize = require('./models/dbConnection');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

//ASSOCIATION

User.hasMany(Post, { foreignKey: 'idPost' });
User.hasMany(Comment, { foreignKey: 'idComment' });
Post.belongsTo(User, { foreignKey: { name: 'idUser', allowNull: false }, onDelete: 'CASCADE' });
Post.hasMany(Comment, { foreignKey: 'idComment' });
Comment.belongsTo(User, { foreignKey: { name: 'idUser', allowNull: false } });
Comment.belongsTo(Post, { foreignKey: { name: 'idPost', allowNull: false }, onDelete: 'CASCADE' }); // si on supriome Post on suprrime ses commentaire

// test de connection sequelize
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	// .then(() => {
	// 	sequelize.sync({ force: true }); //synchronisation db
	// })
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	});

//CORS
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-with, Content, Accept, Content-Type, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(bodyParser.json());

//ROUTES
app.use('/auth', userRoutes);
app.use('/home', postRoutes);
app.use('/home', commentRoutes);
app.use('/home', userRoutes);

//IMAGES
app.use('/images', express.static(path.join(__dirname, 'images'))); // gère les req images.

module.exports = app;
