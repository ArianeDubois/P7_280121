const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.createComment = (req, res, next) => {
	Post.findOne({ where: { idPost: req.params.id } }).then((post) => {
		const comment = {
			idUser: req.body.idUser,
			idPost: post.idPost,
			content: req.body.content,
		};

		Comment.create(comment)
			.then(() => res.status(201).json({ message: 'Commentaire envoyé!' }))
			.catch((error) => res.status(400).json({ error }));
	});
};

exports.getComments = (req, res, next) => {
	Comment.findAll({ where: { idPost: req.params.id } }).then((comments) =>
		res.status(200).json(comments)
	);
};

exports.deleteComment = (req, res, next) => {
	Comment.findOne({ where: { idComment: req.params.id } })
		.then((comments) => {
			//if isOwner = true
			Comment.destroy({ where: { idComment: req.params.id } })
				.then(() => res.status(200).json({ message: 'commentaire supprimé' }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(400).json({ error }));
};
