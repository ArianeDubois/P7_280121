const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');
// const crypto = require('crypto-js'); //crypto allows you to hash plain texts before storing them in the database

//hasher le mot de passe avant de l'envoyer
exports.signup = (req, res, next) => {
	//ajouter auyre verif ?
	if (
		req.body.email == null ||
		req.body.password == null ||
		req.body.lastName == null ||
		req.body.firstName == null
	) {
		return res.status(400).json({ error: 'Veillez remplir tout les champs' });
	}

	User.findOne({ where: { email: req.body.email } })
		.then((user) => {
			// const cryptoMail = crypto.HmacSHA1(req.body.email, process.env.DB_MAIL_KEY).toString();
			if (user) {
				return res.status(401).json({ error: 'email déjà utilisé!' });
			} else if (validator.validate(req.body.email)) {
				//verifie le mail avant de l'envoyer
				bcrypt
					.hash(req.body.password, 10)
					.catch((error) => res.status(400).json({ error }))
					.then((hash) => {
						const newUser = User.create({
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							biographie: req.body.biographie,
							email: req.body.email,
							isAdmin: false,
							password: hash,
						})

							.then((user) => res.status(201).json(user))
							.catch((error) => res.status(400).json({ error }));
					});
			} else {
				return res.status(401).json({ error: 'le mail est invalide' });
			}
		})
		.catch((error) => res.status(400).json({ error }));
};

exports.login = (req, res, next) => {
	// const cryptoMail = crypto.HmacSHA1(req.body.email, process.env.DB_MAIL_KEY).toString();

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
							return res
								.status(200)
								.json({
									idUser: user.id,
									isAdmin: user.isAdmin,
									token: jwt.sign(
										{ idUser: user.id }, // donnée à chiffrer
										'RANDOM_TOKEN_SECRET', //clé de chiffrement
										{ expiresIn: '24h' }
									),
								})
								.catch((error) => res.status(400).json({ error }));
						}
					})
					.catch((error) => res.status(500).json({ error })); // erreur serveur bcrypt ou jwt
			}
		})
		.catch((error) => res.status(505).json({ error })); // erreur findOne
};

//USER PROFIL
exports.userProfil = (req, res) => {
	User.findOne({
		where: { id: req.params.id }, // recuperer l'id dans l l'url
	})
		.then((user) => {
			if (!user) {
				return res.status(400).json({ message: 'utiliasateur introuvable' });
			}
			res.status(200).json(user);
		})
		.catch((error) => res.status(404).json(error));
};

exports.deleteProfil = (req, res) => {
	User.findOne({
		where: { id: req.params.id }, // recuperer l'id dans l l'url
	}).then((user) => {
		if (!user) {
			return res.status(400).json({ message: 'utiliasateur introuvable' });
		}
		User.destroy({
			where: { id: req.params.id }, // recuperer l'id dans l l'url
		})
			.then(() => res.status(200).json({ message: 'Compte suprimé !' }))
			.catch((user) => res.status(404).json(user));
	});
};

exports.updateProfil = (req, res, next) => {
	User.findOne({ where: { id: req.params.id } })
		.then((user) => {
			if (!user) {
				return res.status(400).json({ message: 'utilisateur introuvable' });
			} else if (user.id == req.body.idUser) {
				User.update(
					{
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						biographie: req.body.biographie,
						email: req.body.email,
						password: req.body.password,
					},
					{ where: { id: req.params.id } }
				)
					.then(() => res.status(201).json(user))
					.catch((error) => res.status(400).json({ error }));
			} else {
				return res
					.status(401)
					.json({ message: "vous n'êtes pas autorisé à modifier ce compte" });
			}
		})
		.catch((error) => res.status(500).json({ error }));
};

//masquer les données sensibles
exports.getAllUsers = (req, res, next) => {
	User.findAll()
		.then((users) => res.status(200).json(users))
		.catch((error) => res.status(400).json({ error }));
};
