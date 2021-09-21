const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');
const fs = require('fs');

//hasher le mot de passe avant de l'envoyer
exports.signup = (req, res, next) => {
	//ajouter auyre verif ?
	if (
		req.body.email == '' ||
		req.body.password == '' ||
		req.body.lastName == '' ||
		req.body.firstName == ''
	) {
		return res.status(401).json({ error: 'Veillez remplir tout les champs' });
	} else if (req.body.secteur == '') {
		return res.status(401).json({ error: "Veillez renseigner votre secteur d'activité" });
	} else if (req.body.imageUrl == 'undefined') {
		return res.status(401).json({ error: 'Veillez importer une photo de profil' });
	}

	User.findOne({ where: { email: req.body.email } })
		.then((user) => {
			if (req.file) {
				image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
			}

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
							secteur: req.body.secteur,
							email: req.body.email,
							// email: cryptoMail,

							imageUrl: image,
							isAdmin: false,
							password: hash,
						})

							.then((user) => res.status(201).json(user))
							.catch((error) => res.status(400).json({ error }));
					});
			} else {
				return res.status(400).json({ error: 'le mail est invalide' });
			}
		})
		.catch((error) => res.status(400).json({ error }));
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
							return res
								.status(200)
								.json({
									idUser: user.id,
									isAdmin: user.isAdmin,
									token: jwt.sign(
										{ idUser: user.id }, // donnée à chiffrer
										process.env.DB_SECRET_TOKEN, //clé de chiffrement
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
	User.findOne({ where: { id: req.params.id } || { isAdmin: true } })
		.then((user) => {
			if (!user) {
				return res.status(400).json({ message: 'utiliasateur incorrect' });
			}
			User.destroy({
				where: { id: req.params.id }, // recuperer l'id dans l l'url
			})
				.then(() => res.status(200).json({ message: 'Compte suprimé !' }))
				.catch((user) => res.status(404).json(user));
		})
		.catch((error) => res.status(404).json(error));
};

exports.updateProfil = (req, res, next) => {
	User.findOne({ where: { id: req.params.id } })
		.then((user) => {
			if (!user) {
				return res.status(400).json({ message: 'utilisateur introuvable' });
			} else if (user.id == req.body.idUser) {
				const userModifs = {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					secteur: req.body.secteur,
					email: req.body.email,
					password: req.body.password,
					imageUrl: req.body.imageUrl,
				};

				if (req.file) {
					userModifs.imageUrl = `${req.protocol}://${req.get('host')}/images/${
						req.file.filename
					}`;

					const filename = user.imageUrl.split('/images/')[1];
					fs.unlink(`images/${filename}`, () => {
						User.update(userModifs, { where: { id: req.params.id } })
							.then((newUser) => res.status(201).json(newUser))
							.catch((error) => res.status(400).json({ error }));
					});
				}
				// sans images
				else {
					User.update(userModifs, { where: { id: req.params.id } })
						.then((newUser) => res.status(201).json(newUser))
						.catch((error) => res.status(400).json({ error }));
				}
			} else {
				return res
					.status(401)
					.json({ message: "vous n'êtes pas autorisé à modifier ce compte" });
			}
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
	User.findOne({ where: { id: req.params.id } })
		.then((user) => {
			if (!user.isAdmin == true) {
				return res.status(401).json({ message: 'utilisateur non admin' });
			} else {
				User.findAll()
					.then((users) => res.status(200).json(users))
					.catch((error) => res.status(400).json({ error }));
			}
		})
		.catch((error) => res.status(400).json({ error }));
};

//test envoeyr id ou admin
// exports.getAllUsers = (req, res, next) => {
// 	User.findOne({ where: { id: req.params.id } || { isAdmin: true } })
// 		.then((user) => {
// 			if (user) {
// 				return res.status(401).json(user);
// 			} else {
// 				User.findAll()
// 					.then((users) => res.status(200).json(users))
// 					.catch((error) => res.status(400).json({ error }));
// 			}
// 		})
// 		.catch((error) => res.status(400).json({ error }));
// };
