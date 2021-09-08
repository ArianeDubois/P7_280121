const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//hasher le mot de passe avant de l'envoyer
exports.signup = (req, res, next) => {
	User.findOne({ where: { email: req.body.email } }).then((user) => {
		if (user) {
			return res.status(401).json({ error: 'email déjà utilisé!' });
		} else {
			bcrypt
				.hash(req.body.password, 10)
				.then((hash) => {
					const user = User.create({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.email,
						password: hash,
					});
				})
				.then(() => res.status(201).json({ message: 'Utilisateur enregistré !' }))
				.catch((error) => res.status(400).json({ error }));
		}
	});
};

exports.login = (req, res, next) => {
	User.findOne({ where: { email: req.body.email } })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: 'email incorect !' });
			} else {
				bcrypt
					.compare(req.body.password, user.password)
					.then((valid) => {
						if (!valid) {
							return res.status(401).json({ error: 'Mot de passe incorrect !' });
						} else {
							return res.status(200).json({
								idUsers: user.idUsers,
								token: jwt.sign(
									{ idUsers: user.idUsers }, // donnée à chiffrer
									'RANDOM_TOKEN_SECRET', //clé de chiffrement
									{ expiresIn: '24h' }
								),
							});
						}
					})
					.catch((error) => res.status(500).json({ error })); // erreur serveur bcrypt ou jwt
			}
		})
		.catch((error) => res.status(505).json({ error })); // erreur findOne
};
