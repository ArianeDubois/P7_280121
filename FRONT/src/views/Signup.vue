<template>
	<div>
		<header>
			<Button text="inscription" class="btn" />

			<router-link to="/" class="btn">connexion</router-link>
		</header>
		<div class="bloc">
			<form @submit="onSubmit" enctype="multipart/form-data">
				<div>
					<label>Firstname</label>
					<input type="text" v-model="firstName" name="firstName" />
				</div>
				<div>
					<label>LastName</label>
					<input type="text" v-model="lastName" name="lastName" />
				</div>
				<div>
					<label>Mail</label>
					<input type="email" v-model="email" name="email" placeholder="email@mail.fr" />
				</div>
				<div>
					<label>Password</label>
					<input type="password" v-model="password" name="password" />
				</div>

				<div>
					<label>Secteur d'activité</label>
					<select id="secteurs" v-model="secteur" name="secteur">
						<option value="communication">Communication</option>
						<option value="vente">Vente</option>
						<option value="management">Management</option>
						<option value="finance">Finance</option>
						<option value="manutention">Manutention</option>
						<option value="alimentation">Alimentation</option>
					</select>
				</div>

				<label>Photo de profil</label>
				<input
					type="file"
					ref="file"
					@change="uploadImage"
					name="imageUrl"
					placeholder="url"
				/>

				<input type="submit" value="Inscription" class="btn" />
			</form>
		</div>
	</div>
</template>
<script>
import Button from '../components/Button.vue';
export default {
	name: 'Signup',
	data() {
		return {
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
		onSubmit(e) {
			e.preventDefault();
			//alert champs null

			let formData = new FormData();
			formData.append('firstName', this.firstName),
				formData.append('lastName', this.lastName),
				formData.append('email', this.email),
				formData.append('password', this.password),
				formData.append('secteur', this.secteur),
				formData.append('imageUrl', this.imageUrl);
			// console.log(newUser);
			//fetch
			fetch('http://localhost:3000/home/signup', {
				'Content-Type': 'multipart/form-data',

				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
				body: formData,
			});
		},

		async uploadImage() {
			this.imageUrl = this.$refs.file.files[0]; //
			console.log(this.imageUrl);
		},
	},

	async mounted() {
		this.imageUrl = await this.uploadImage();
	},
};
</script>

<style></style>
