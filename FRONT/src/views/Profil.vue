<template>
	<div>
		<div class="bloc">
			<form @submit="updateProfil" enctype="multipart/form-data">
				<div class="blocForm">
					<div class="image-form">
						<label>Photo de profil</label>

						<!-- si pas de changement de photo affiche la phoot actuelle -->
						<img v-if="!uploadFile" :src="user.imageUrl" class="profil-img" />
						<!-- si changement de photo affiche la prévisualisation -->
						<img v-if="uploadFile" :src="uploadFile" class="profil-img" />
						<input
							type="file"
							ref="file"
							@change="uploadImage"
							name="imageUrl"
							class="input-form file-button"
							placeholder="url"
						/>

						<i
							v-if="uploadFile"
							@click="removeImageLoaded"
							class="fas fa-times close"
						></i>
					</div>
					<div class="content-form">
						<label>Firstname</label>
						<input
							type="text"
							v-model="userUptated.firstName"
							name="firstName"
							class="input-form"
						/>

						<label>LastName</label>
						<input
							type="text"
							v-model="userUptated.lastName"
							name="lastName"
							class="input-form"
						/>

						<label>Mail</label>
						<input
							type="email"
							v-model="userUptated.email"
							name="email"
							pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
							class="input-form"
						/>

						<label>Secteur d'activité</label>
						<select
							id="secteurs"
							v-model="userUptated.secteur"
							name="secteur"
							class="input-form"
						>
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
	// props: {
	// 	user: Object,
	// },
	methods: {
		//UBDATE
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
		async updateProfil(e) {
			e.preventDefault();
			//alert champs null
			const id = JSON.parse(localStorage.getItem('idUser'));
			let modifyUser = new FormData();
			modifyUser.append('firstName', this.userUptated.firstName),
				modifyUser.append('lastName', this.userUptated.lastName),
				modifyUser.append('email', this.userUptated.email),
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
			const data = await res.json();
			if (res.status === 400 || res.status === 401) {
				alert(data.error);
			} else if (res.status === 201) {
				alert('modiffications effectuées');
			}
			this.$emit('uptate-profil', this.userUptated);
			return data;
		},
		async uploadImage() {
			this.userUptated.imageUrl = this.$refs.file.files[0]; //image à envoyer
			this.uploadFile = URL.createObjectURL(this.userUptated.imageUrl); // previsualisatoin
		},
		async removeImageLoaded() {
			this.userUptated.imageUrl = this.user.imageUrl; //garde l'image actuelle
			this.$refs.file.value = null; //ne mémorise plus l'image chargée
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
		this.userUptated = await this.fetchAccount();
		this.user = await this.fetchAccount();
		this.$emit('fetch-user', this.user); //envoit les informations  au header
	},
};
</script>

<style scoped lang="scss">
.bloc {
	max-width: 650px;
	width: 90vw;
	margin: 50px auto 200px auto;
	padding: 2%;
	position: relative;
}
.content-form,
.image-form {
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	align-items: center;
	position: relative;
}
img {
	height: 100px;
	width: 100px;
}
.button-form {
	position: absolute;
	display: flex;
	justify-content: space-between;
	bottom: -50px;
	left: 0;
	width: 100%;
	.btn {
		height: 50px;
		width: auto;
	}
}
.profil-img {
	border-radius: 10rem;
	object-fit: cover;
	height: 70px;
	width: 70px;
	margin: 5px;
}
.file-button {
	position: relative;
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
