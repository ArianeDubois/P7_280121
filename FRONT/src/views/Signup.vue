<template>
	<div>
		<div class="bloc">
			<form class="form" @submit="onSubmit" enctype="multipart/form-data">
				<div class="field-bloc">
					<label>Prénom</label>
					<input
						class="input-form"
						type="text"
						v-model="firstName"
						name="firstName"
						required
					/>
				</div>
				<div class="field-bloc">
					<label>Nom</label>

					<input
						class="input-form"
						type="text"
						v-model="lastName"
						name="lastName"
						required
					/>
				</div>
				<div class="field-bloc">
					<label>Email</label>
					<input
						class="input-form"
						type="email"
						v-model="email"
						name="email"
						placeholder="email@mail.fr"
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
						required
					/>
				</div>
				<div class="field-bloc">
					<label>Mot de passe</label>
					<legend>
						Le mot de passse doit contenir au moins huit caractères dont une lettre
						majuscule, une lettre minuscule et un chiffre
					</legend>

					<input
						class="input-form"
						type="password"
						v-model="password"
						name="password"
						pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
						required
					/>
				</div>

				<div class="field-bloc">
					<label>Secteur d'activité</label>
					<select
						class="input-form"
						id="secteurs"
						v-model="secteur"
						name="secteur"
						required
					>
						<option value="communication">Communication</option>
						<option value="vente">Vente</option>
						<option value="management">Management</option>
						<option value="finance">Finance</option>
						<option value="manutention">Manutention</option>
						<option value="alimentation">Alimentation</option>
					</select>
				</div>
				<div class="field-bloc ">
					<label>Photo de profil</label>
					<i v-if="!uploadFile" class="fas fa-file-image profil-img"></i>
					<!-- si changement de photo affiche la prévisualisation -->
					<img v-if="uploadFile" :src="uploadFile" class="profil-img" />
					<input
						class="input-form file-button"
						type="file"
						ref="file"
						@change="uploadImage"
						name="imageUrl"
						required
					/>
					<i v-if="imageUrl" @click="removeImageLoaded" class="fas fa-times close"></i>
				</div>
				<input type="submit" value="Inscription" class="btn" />
			</form>
		</div>
	</div>
</template>

<script>
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
	methods: {
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
		async removeImageLoaded() {
			this.imageUrl = '';
			this.uploadFile = ''; // previsualisatoin
			this.$refs.file.value = '';
		},
	},
	// async mounted() {
	// 	this.imageUrl = await this.uploadImage();
	// },
};
</script>

<style lang="scss">
.profil-img {
	margin: auto;
	display: flex;
	border-radius: 10rem;
	width: 60px;
	height: 60px;
}
i.profil-img {
	margin: auto;
	color: white;
	background-color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 30px;
}
.input-form {
	border: 2px dotted black;
	height: 30px;
	width: 70%;
	margin: auto;
	margin-bottom: 20px;
	&:focus {
		outline: none;
		background-color: whitesmoke;
		border: 2px solid black;
	}
}
legend {
	display: flex;
	font-size: 12px;
	text-align: left;
	margin: 10px auto 10px auto;
	width: 70%;
}
.field-bloc {
	display: flex;
	flex-direction: column;
	justify-items: center;
	position: relative;
}
.form {
	margin: 30px;
	/* display: flex;
	flex-direction: column; */
}
.file-button {
	position: relative;
}
.close {
	position: absolute;
	right: 20px;
	bottom: 25px;
}
.file-button::after {
	display: flex;
	justify-content: center;
	align-items: center;
	content: 'choisir un fichier';
	color: black;
	font-family: 'title';
	font-size: 20px;
	position: absolute;
	top: 0;
	left: 0;
	background-color: white;
	height: 100%;
	width: 100%;
}
</style>
