const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.createComment = (req, res, next) => {
	Post.findOne({ where: { id: req.params.id } }).then((post) => {
		if (!post) {
			return res.status(400).json({ message: 'Post introuvable' });
		}
		const comment = {
			idPost: post.id,
			idUser: req.body.idUser,
			content: req.body.content,
		};

		Comment.create(comment)
			.then(() => res.status(201).json({ message: 'Commentaire envoyé!' }))
			.catch((error) => res.status(400).json({ error }));
	});
};

exports.getComments = (req, res, next) => {
	Comment.findAll({ where: { idPost: req.params.id } })
		.then((comments) => {
			res.status(200).json(comments);
		})
		.catch((error) => res.status(404).json({ error }));
};

exports.deleteComment = (req, res, next) => {
	Comment.findOne({ where: { id: req.params.id } })
		.then((comments) => {
			if (!comments) {
				return res.status(400).json({ message: 'commentaire introuvable' });
			} else if (req.body.idUser.isAdmin == true || comments.idUser == req.body.idUser) {
				//if isOwner = true
				Comment.destroy({ where: { id: req.params.id } })
					.then(() => res.status(200).json({ message: 'commentaire supprimé' }))
					.catch((error) => res.status(400).json({ error }));
			} else {
				return res
					.status(400)
					.json({ message: "vous n'êtes pas autorisez à supprimer ce commentaire" });
			}
		})
		.catch((error) => res.status(400).json({ error }));
};
