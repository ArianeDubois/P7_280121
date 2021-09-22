<template>
	<div>
		<header>
			<Button text="inscription" class="btn" />

			<router-link to="/" class="btn">connexion</router-link>
		</header>
		<div class="bloc">
			<form @submit="onSubmit" enctype="multipart/form-data">
				<div>
					<label>Prénom</label>
					<input type="text" v-model="firstName" name="firstName" required />
				</div>
				<div>
					<label>Nom</label>
					<input type="text" v-model="lastName" name="lastName" required />
				</div>
				<div>
					<label>Email</label>
					<input
						type="email"
						v-model="email"
						name="email"
						placeholder="email@mail.fr"
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
						required
					/>
				</div>
				<div>
					<label>Mot de passe</label>
					<legend>
						Le mot de passse doit contenir au moins huit caractères dont une lettre
						majuscule, une lettre minuscule et un chiffre
					</legend>
					<input
						type="password"
						v-model="password"
						name="password"
						pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
						required
					/>
				</div>

				<div>
					<label>Secteur d'activité</label>
					<select id="secteurs" v-model="secteur" name="secteur" required>
						<option value="communication">Communication</option>
						<option value="vente">Vente</option>
						<option value="management">Management</option>
						<option value="finance">Finance</option>
						<option value="manutention">Manutention</option>
						<option value="alimentation">Alimentation</option>
					</select>
				</div>

				<label>Photo de profil</label>
				<i v-if="!uploadFile" class="fas fa-file-image profilPic-img"></i>
				<!-- si changement de photo affiche la prévisualisation -->
				<img v-if="uploadFile" :src="uploadFile" class="profilPic-img" />
				<input type="file" ref="file" @change="uploadImage" name="imageUrl" required />

				<input type="submit" value="Inscription" class="btn" />
			</form>
		</div>
		<!-- 
		<div class="bloc" v-if="errors.length">
			<p>Veillez revoir ces champs:</p>
			<ul>
				<li :key="error" v-for="error in errors">
					{{ error }}
				</li>
			</ul>
		</div> -->
	</div>
</template>

<script>
import Button from '../components/Button.vue';
export default {
	name: 'Signup',
	data() {
		return {
			errors: [],

			uploadFile: '',
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			secteur: '',
			imageUrl: '',
		};
	},

	components: {
		Button,
	},
	methods: {
		// async validEmail(this.email) {
		// 	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		// 	return regex.test(email);
		// },

		async onSubmit(e) {
			e.preventDefault();
			//verifications des champs et retourne erreurs
			let formData = new FormData();
			formData.append('firstName', this.firstName),
				formData.append('lastName', this.lastName),
				formData.append('email', this.email),
				formData.append('password', this.password),
				formData.append('secteur', this.secteur),
				formData.append('imageUrl', this.imageUrl);
			// console.log(newUser);
			//fetch
			const res = await fetch('http://localhost:3000/home/signup', {
				'Content-Type': 'multipart/form-data',

				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
				body: formData,
			});

			const data = await res.json();

			if (res.status === 400 || res.status === 401) {
				alert(data.error);
				this.errors = [...this.errors, data.error];
				console.log(this.errors);
			} else if (res.status === 201) {
				alert('inscription enregistrée, vous pouvez maintenant vous connecter');
			}
		},

		async uploadImage() {
			this.imageUrl = this.$refs.file.files[0]; // image de la requête
			this.uploadFile = URL.createObjectURL(this.imageUrl); // previsualisatoin
		},
	},
	async mounted() {
		this.imageUrl = await this.uploadImage();
		// this.errors = await this.onSubmit();
	},
};
</script>

<style>
img.profilPic-img {
	margin: auto;
	display: flex;
}
i.profilPic-img {
	margin: auto;
	color: white;
	background-color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 30px;
}
</style>
