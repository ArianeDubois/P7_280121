const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.createPost = (req, res, next) => {
	// const token = req.headers.authorization.split(' ')[1];
	// const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
	// const userId = decodedToken.userId;
	//=> AUTH middleware
	User.findOne({
		where: { id: req.body.idUser },
	})
		.then((user) => {
			{
			}
			let image = '';

			if (req.file) {
				image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
			}
			const post = {
				content: req.body.content,
				imageUrl: image,
				// idUser: req.body.userId,
				idUser: user.id,
			};

			Post.create(post)
				.then(() => res.status(201).json({ message: 'Message envoyé!' }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(400).json({ message: 'utlisateur inconnu' }));
};

exports.getAllPosts = (req, res, next) => {
	Post.findAll()
		.then((posts) => res.status(200).json(posts))
		.catch((error) => res.status(400).json({ error }));
};

// exports.deletePost = (req, res, next) => {
// 	Post.findOne({ where: { id: req.params.id } }) // on récupère le post dans la db (id=routeurl)
// 		//rajouter not null pour userId
// 		.then((post) => {
// 			if (!post) {
// 				return res.status(400).json({ message: 'post introuvable' });
// 			} else if (req.body.idUser.isAdmin == true || post.idUser == req.body.idUser) {
// 				Post.destroy({ where: { id: req.params.id, idUser: req.body.idUser } })
// 					.then(() => res.status(200).json({ message: 'Post supprimé' }))
// 					.catch((error) => res.status(401).json({ error }));
// 			} else {
// 				return res
// 					.status(400)
// 					.json({ message: "vous n'êtes pas autorisez à supprimer ce post" });
// 			}
// 		})
// 		.catch((error) => res.status(500).json({ error }));
// };
exports.deletePost = (req, res, next) => {
	Post.findOne({ where: { id: req.params.id } }) // on récupère le post dans la db (id=routeurl)
		//rajouter not null pour userId
		.then((post) => {
			if (!post) {
				return res.status(400).json({ message: 'post introuvable' });
			} else if (post) {
				Post.destroy({ where: { id: req.params.id } })
					.then(() => res.status(200).json({ message: 'Post supprimé' }))
					.catch((error) => res.status(401).json({ error }));
			} else {
				return res
					.status(400)
					.json({ message: "vous n'êtes pas autorisez à supprimer ce post" });
			}
		})
		.catch((error) => res.status(500).json({ error }));
};
