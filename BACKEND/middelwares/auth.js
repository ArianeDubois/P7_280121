const jwt = require('jsonwebtoken'); // proteger les routes

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1]; // récupère uniquement le token - Bear
		const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // variable d'environemnt pour la clé du token

		const idUsers = decodeToken.idUsers;

		if (req.body.idUsers && req.body.idUser !== idUsers) {
			// compare l'user requete grace au token
			throw 'Invalid User'; // envoie dans le catch
		} else {
			next(); //passe au prochain middleware => les controlleurs
		}
	} catch {
		res.status(401).json({ error: new Error('invalid request!') });
	}
};

// ajouter isOwner

//sur la route post: il me faut juste un token
