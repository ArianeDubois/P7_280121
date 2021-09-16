const jwt = require('jsonwebtoken');
const Comment = require('../models/Comment');

module.exports = (req, res, next) => {
	Comment.findOne({ where: { id: req.params.id } })
		.then((comment) => {
			try {
				const token = req.headers.authorization.split(' ')[1]; // récupère uniquement le token - Bear
				const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // variable d'environemnt pour la clé du token

				const idUser = decodeToken.idUser;

				if (comment.idUser !== idUser) {
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
