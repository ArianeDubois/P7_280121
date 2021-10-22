const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const User = require('../models/User');

module.exports = (req, res, next) => {
	Post.findOne({ where: { id: req.params.id } })
		.then((post) => {
			const token = req.headers.authorization.split(' ')[1]; //
			const decodeToken = jwt.verify(token, process.env.DB_SECRET_TOKEN);
			const idUser = decodeToken.idUser;

			//si le  post user  ne correspond pas au token utilisateur
			if (post.idUser !== idUser) {
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
