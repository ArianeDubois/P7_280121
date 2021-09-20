const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
	User.findOne({ where: { id: req.params.id } })
		.then((user) => {
			const token = req.headers.authorization.split(' ')[1]; //
			const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
			const idUser = decodeToken.idUser;

			// user = le compte à suprimé
			if (user.id !== idUser) {
				User.findOne({ where: { isAdmin: true } })
					.then((admin) => {
						// renvoit la liste des admin
						if (idUser !== admin.id) {
							return res.status(401).json({ message: "vous n'êtes pas autorisés" });
						} else {
							next();
						}
					})
					.catch((error) => res.status(500).json({ error })); // erreur findOne
			} else {
				next();
			}
		})
		.catch((error) => res.status(500).json({ error })); // erreur findOne
};
