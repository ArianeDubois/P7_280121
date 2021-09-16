const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

module.exports = (req, res, next) => {
	Post.findOne({ where: { id: req.params.id } })
		.then((post) => {
			try {
				const token = req.headers.authorization.split(' ')[1]; // récupère uniquement le token - Bear
				const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // variable d'environemnt pour la clé du token

				const idUser = decodeToken.idUser;

				if (post.idUser !== idUser) {
					throw 'unauthorized user';
				} else {
					next();
				}
			} catch {
				res.status(403).json({ error: new Error('unauthorized user!') });
			}
		})
		.catch((error) => res.status(500).json({ error })); // erreur findOne
};
