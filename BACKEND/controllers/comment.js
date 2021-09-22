const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.createComment = (req, res, next) => {
	Post.findOne({ where: { id: req.params.id } })
		.then((post) => {
			if (!post) {
				return res.status(400).json({ message: 'Post introuvable' });
			}

			if (req.body.content == '') {
				return res.status(400).json({ error: 'contenu vide' });
			}

			const newComment = {
				idPost: post.id,
				idUser: req.body.idUser,
				content: req.body.content,
			};

			Comment.create(newComment)
				.then((comment) => {
					Comment.findOne({
						where: {
							id: comment.id,
						},
						include: User,
					}).then((commentUser) => res.status(200).json(commentUser));
				})
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(400).json({ message: 'utlisateur inconnu' }));
};

exports.getComments = (req, res, next) => {
	Comment.findAll({ where: { idPost: req.params.id }, include: User })
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
			} else if (comments) {
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
// exports.deleteComment = (req, res, next) => {
// 	Comment.findOne({ where: { id: req.params.id } })
// 		.then((comments) => {
// 			if (!comments) {
// 				return res.status(400).json({ message: 'commentaire introuvable' });
// 			} else if (req.body.idUser.isAdmin == true || comments.idUser == req.body.idUser) {
// 				//if isOwner = true
// 				Comment.destroy({ where: { id: req.params.id } })
// 					.then(() => res.status(200).json({ message: 'commentaire supprimé' }))
// 					.catch((error) => res.status(400).json({ error }));
// 			} else {
// 				return res
// 					.status(400)
// 					.json({ message: "vous n'êtes pas autorisez à supprimer ce commentaire" });
// 			}
// 		})
// 		.catch((error) => res.status(400).json({ error }));
// };
