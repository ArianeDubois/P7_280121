const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

exports.createPost = (req, res, next) => {
	User.findOne({
		where: { id: req.body.idUser }, // recuperer token
	})
		.then((user) => {
			let image = '';

			if (req.file) {
				image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
			}
			// console.log(req.file);
			const newPost = {
				content: req.body.content,
				imageUrl: image,
				// idUser: req.body.userId,
				idUser: user.id,
			};

			if (!req.file && req.body.content == '') {
				return res.status(400).json({ error: 'contenu vide' });
			}

			Post.create(newPost)
				.then((post) => {
					Post.findOne({
						where: {
							id: post.id,
						},
						order: [['updatedAt', 'DESC']],

						include: User,
					}).then((userPost) => res.status(200).json(userPost));
				})
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(400).json({ message: 'utlisateur inconnu' }));
};

exports.getAllPosts = (req, res, next) => {
	Post.findAll({ order: [['updatedAt', 'DESC']], include: User }) //
		.then((posts) => res.status(200).json(posts))
		.catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
	Post.findOne({ where: { id: req.params.id } }) // on récupère le post dans la db (id=routeurl)
		.then((post) => {
			if (!post) {
				return res.status(400).json({ message: 'post introuvable' });
			} else {
				const filename = post.imageUrl.split('/images/')[1]; //récupère le nom précis de la sauce et determine l'ancienne image à supprimer du dossier images gràce à split
				fs.unlink(`images/${filename}`, () => {
					Post.destroy({ where: { id: req.params.id } })
						.then(() => res.status(200).json({ message: 'Post supprimé' }))
						.catch((error) => res.status(401).json({ error }));
				});
			}
		})
		.catch((error) => res.status(500).json({ error }));
};
