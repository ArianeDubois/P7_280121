<template>
	<div>
		<Header :user="user" />

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
					</div>
					<div class="content-form">
						<label>Firstname</label>
						<input
							type="text"
							v-model="user.firstName"
							name="firstName"
							:placeholder="user.firstName"
						/>

						<label>LastName</label>
						<input
							type="text"
							v-model="user.lastName"
							name="lastName"
							:placeholder="user.lastName"
						/>

						<label>Mail</label>
						<input
							type="email"
							v-model="user.email"
							name="email"
							:placeholder="user.email"
						/>

						<label>Password</label>
						<input type="password" v-model="user.password" name="password" />

						<label>Secteur d'activité</label>
						<select id="secteurs" v-model="user.secteur" name="secteur">
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
			user: {},
			uploadFile: '',
			// secteur: '',
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
			let modifyUser = new FormData();
			modifyUser.append('firstName', this.user.firstName),
				modifyUser.append('lastName', this.user.lastName),
				modifyUser.append('email', this.user.email),
				modifyUser.append('password', this.user.password),
				modifyUser.append('secteur', this.user.secteur),
				modifyUser.append('idUser', JSON.parse(localStorage.getItem('idUser'))),
				modifyUser.append('imageUrl', this.user.imageUrl);

			const id = JSON.parse(localStorage.getItem('idUser'));

			const res = await fetch(`http://localhost:3000/home/profil/${id}`, {
				'Content-Type': 'multipart/form-data',
				method: 'PUT',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},

				body: modifyUser,
			});

			alert('modiffications effectuées');
			const data = await res.json();
			return data;
		},

		async uploadImage() {
			this.user.imageUrl = this.$refs.file.files[0]; //image à envoyer
			this.uploadFile = URL.createObjectURL(this.user.imageUrl); // previsualisatoin
			console.log(this.user.imageUrl);
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
		this.user.imageUrl = await this.uploadImage();
		this.uploadFile = await this.uploadImage();
	},

	async created() {
		this.user = await this.fetchAccount();
		// this.user = await this.updateProfil();
	},
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
