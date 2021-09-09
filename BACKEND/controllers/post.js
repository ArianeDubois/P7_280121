const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.createPost = (req, res, next) => {
	let image = '';

	if (req.file) {
		image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
	}
	const post = {
		idUser: req.body.idUser,
		content: req.body.content,
		imageUrl: image,
	};

	// Post.findAll({
	// 	include: [{ model: User }],
	// })
	// 	.then(() => res.status(201).json({ message: 'associations créee' }))
	// 	.catch((error) => res.status(400).json({ error }));

	Post.create(post)
		.then(() => res.status(201).json({ message: 'Message envoyé!' }))
		.catch((error) => res.status(400).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
	Post.findAll()
		.then((posts) => res.status(200).json(posts))
		.catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
	Post.findOne({ where: { idPost: req.params.id } }) // on récupère le post dans la db (id=routeurl)
		.then((post) => {
			Post.destroy({ where: { idPost: req.params.id } })
				.then(() => res.status(200).json({ message: 'Post supprimé' }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.likePost = (req, res, next) => {
	Post.findOne({ where: { idPost: req.params.id } })
		.then((post) => {
			if (!user) Post.increment(post.likes);
		})
		.then(() => res.status(200).json({ message: 'Post liké' }));
};
