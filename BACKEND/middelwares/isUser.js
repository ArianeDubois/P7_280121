const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
	User.findOne({ where: { id: req.params.id } })
		.then((user) => {
			try {
				const token = req.headers.authorization.split(' ')[1]; // récupère uniquement le token - Bear
				const decodeToken = jwt.verify(token, process.env.DB_SECRET_TOKEN); // variable d'environemnt pour la clé du token
				const idUser = decodeToken.idUser;

				if (user.id !== idUser) {
					//verifie si le créateur du user est différent du token headers alors l'utilisateur n'est pas l'auteur du post

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
