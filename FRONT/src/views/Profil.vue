<template>
	<div>
		<Header :user="user" :userUptated="userUptated" />

		<!-- on submit ubdate -->
		<!-- faire un place holder dynamique avec un fetch sur mes donnée  -->
		<div class="bloc">
			<form @submit="updateProfil" enctype="multipart/form-data">
				<div class="blocForm">
					<div class="image-form">
						<label>Photo de profil</label>
						<!-- si pas de changement de photo affiche la phoot actuelle -->
						<img v-if="!uploadFile" :src="user.imageUrl" class="profilPic-img" />
						<!-- si changement de photo affiche la prévisualisation -->
						<img v-if="uploadFile" :src="uploadFile" class="profilPic-img" />
						<input
							type="file"
							ref="file"
							@change="uploadImage"
							name="imageUrl"
							placeholder="url"
						/>
						<i v-if="uploadFile" @click="removeImageLoaded" class="fas fa-times"></i>
					</div>
					<div class="content-form">
						<label>Firstname</label>
						<input type="text" v-model="userUptated.firstName" name="firstName" />

						<label>LastName</label>
						<input type="text" v-model="userUptated.lastName" name="lastName" />

						<label>Mail</label>
						<input
							type="email"
							v-model="userUptated.email"
							name="email"
							pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
						/>

						<label>Password</label>
						<legend>
							Le mot de passse doit contenir au moins huit caractères dont une lettre
							majuscule, une lettre minuscule et un chiffre
						</legend>
						<input
							type="password"
							v-model="userUptated.password"
							name="password"
							pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
						/>

						<label>Secteur d'activité</label>
						<select id="secteurs" v-model="userUptated.secteur" name="secteur">
							<option value="communication">Communication</option>
							<option value="vente">Vente</option>
							<option value="management">Management</option>
							<option value="finance">Finance</option>
							<option value="manutention">Manutention</option>
							<option value="alimentation">Alimentation</option>
						</select>
					</div>
				</div>
				<div class="button-form">
					<button @click="deleteAccount" class="btn">Supprimer mon compte</button>
					<input type="submit" value="modifier" class="btn" />
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import Header from '../components/Header.vue';
export default {
	name: 'Profil',
	data() {
		return {
			//ne retourne pas le mots de passe

			user: {},
			userUptated: {},
			uploadFile: '',
		};
	},

	components: {
		Header,
	},
	methods: {
		//fetche sur les infos user
		async fetchAccount() {
			const id = JSON.parse(localStorage.getItem('idUser'));

			const res = await fetch(`http://localhost:3000/home/profil/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			});
			const data = await res.json();
			return data;
		},

		//UBDATE
		async updateProfil(e) {
			e.preventDefault();
			//alert champs null

			const id = JSON.parse(localStorage.getItem('idUser'));

			let modifyUser = new FormData();
			modifyUser.append('firstName', this.userUptated.firstName),
				modifyUser.append('lastName', this.userUptated.lastName),
				modifyUser.append('email', this.userUptated.email),
				modifyUser.append('password', this.userUptated.password),
				modifyUser.append('secteur', this.userUptated.secteur),
				modifyUser.append('idUser', id),
				modifyUser.append('imageUrl', this.userUptated.imageUrl);

			const res = await fetch(`http://localhost:3000/home/profil/${id}`, {
				'Content-Type': 'multipart/form-data',
				method: 'PUT',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},

				body: modifyUser,
			});
			//mise a jour des infos dans le header
			this.user = await this.fetchAccount();
			const data = await res.json();
			if (res.status === 400 || res.status === 401) {
				alert(data.error);
			} else if (res.status === 201) {
				alert('modiffications effectuées');
			}

			return data;
		},

		async uploadImage() {
			this.userUptated.imageUrl = this.$refs.file.files[0]; //image à envoyer
			this.uploadFile = URL.createObjectURL(this.userUptated.imageUrl); // previsualisatoin
		},

		async removeImageLoaded() {
			this.imageUrl = this.user.imageUrl;
			this.$refs.file.value = '';
			this.uploadFile = ''; // previsualisatoin
		},

		//DELETE
		async deleteAccount() {
			if (confirm('are you sure ?')) {
				const id = JSON.parse(localStorage.getItem('idUser'));

				const res = await fetch(`http://localhost:3000/home/profil/${id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
				});
				//vider le localstorage
				if (res.status === 200) {
					localStorage.clear();
					this.$router.push('/signup');
				} else {
					alert('error on deleting post');
				}
			}
		},
	},

	async mounted() {
		this.user = await this.fetchAccount();
		this.userUptated = await this.fetchAccount();
	},
	//watch
};
</script>

<style scoped>
.blocForm {
	display: flex;
	justify-content: space-around;
}
.content-form,
.image-form {
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	align-items: center;
}
img {
	height: 100px;
	width: 100px;
}
.bloc {
	margin-top: 100px;
}
.button-form {
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
	border-top: 2px solid black;
}
</style>
