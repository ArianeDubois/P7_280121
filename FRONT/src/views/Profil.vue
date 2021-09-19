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
						<img :src="user.imageUrl" class="profilPic-img" />
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
							v-model="newUser.firstName"
							name="firstName"
							:placeholder="newUser.firstName"
						/>

						<label>LastName</label>
						<input
							type="text"
							v-model="newUser.lastName"
							name="lastName"
							:placeholder="newUser.lastName"
						/>

						<label>Mail</label>
						<input
							type="email"
							v-model="newUser.email"
							name="email"
							:placeholder="user.email"
						/>

						<label>Password</label>
						<input type="password" v-model="newUser.password" name="password" />

						<label>Biographie</label>
						<input
							type="text"
							v-model="newUser.biographie"
							name="biographie"
							:placeholder="user.biographie"
						/>
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
			newUser: {},
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
			modifyUser.append('firstName', this.newUser.firstName),
				modifyUser.append('lastName', this.newUser.lastName),
				modifyUser.append('email', this.newUser.email),
				modifyUser.append('password', this.newUser.password),
				modifyUser.append('biographie', this.newUser.biographie),
				modifyUser.append(
					'idUser',
					this.newUser.idUser.JSON.parse(localStorage.getItem('idUser'))
				),
				modifyUser.append('imageUrl', this.newUser.imageUrl);

			const id = JSON.parse(localStorage.getItem('idUser'));

			const res = await fetch(`http://localhost:3000/home/profil/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},

				body: modifyUser,
			});

			alert('modiffications effectuées');
			const data = await res.json();
			return data;
		},

		async uploadImage() {
			this.newUser.imageUrl = this.$refs.file.files[0]; //
			console.log(this.newUser.imageUrl);
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
		this.newUser.imageUrl = await this.uploadImage();
	},

	async created() {
		this.user = await this.fetchAccount();
		this.newUser = await this.updateProfil();
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
