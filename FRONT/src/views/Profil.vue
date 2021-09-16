<template>
	<div>
		<Header :user="user" />

		<!-- on submit ubdate -->
		<!-- faire un place holder dynamique avec un fetch sur mes donnée  -->
		<form @submit="updateProfil">
			<div>
				<label>Firstname</label>
				<input
					type="text"
					v-model="user.firstName"
					name="firstName"
					:placeholder="user.firstName"
				/>
			</div>
			<div>
				<label>LastName</label>
				<input
					type="text"
					v-model="user.lastName"
					name="lastName"
					:placeholder="user.lastName"
				/>
			</div>
			<div>
				<label>Mail</label>
				<input type="email" v-model="user.email" name="email" :placeholder="user.email" />
			</div>
			<div>
				<label>Password</label>
				<input type="password" v-model="user.password" name="password" />
			</div>

			<div>
				<label>Biographie</label>
				<input
					type="text"
					v-model="user.biographie"
					name="biographie"
					:placeholder="user.biographie"
				/>
			</div>

			<input type="submit" value="MODIFIER" class="btn" />
			<div @click="deleteAccount" class="btn">Supprimer mon compte</div>
		</form>
	</div>
</template>

<script>
import Header from '../components/Header.vue';
export default {
	name: 'Profil',
	data() {
		return {
			user: {},
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
			const modifyUser = {
				firstName: this.user.firstName,
				lastName: this.user.lastName,
				email: this.user.email,
				password: this.user.password,
				biographie: this.user.biographie,
				idUser: JSON.parse(localStorage.getItem('idUser')),
			};

			const id = JSON.parse(localStorage.getItem('idUser'));

			const res = await fetch(`http://localhost:3000/home/profil/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},

				body: JSON.stringify(modifyUser),
			});
			alert('modiffications effectuées');
			const newUser = await res.json();
			return newUser;
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

	async created() {
		this.user = await this.fetchAccount();
		this.user = await this.updateProfil();
	},
};
</script>

<style></style>
