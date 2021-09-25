<template>
	<div class="users bloc">
		<div v-for="user in users" :key="user.id">
			<!-- //ne montre pas le compte de l'utilisateur -->
			<div v-if="id !== user.id" class=" blocModerate">
				<p>{{ user.firstName }}</p>
				<p>{{ user.lastName }}</p>
				<p>{{ user.email }}</p>
				<!-- <img :src="post.imageUrl" /> -->
				<i @click="deleteAccount(id)" class="fas fa-times close"></i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Moderate',

	data() {
		return {
			users: [],
			user: {},
			id: JSON.parse(localStorage.getItem('idUser')),
		};
	},

	methods: {
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
			console.Log;
			return data;
		},

		async getAllUsers() {
			const res = await fetch(`http://localhost:3000/home/${this.id}/profil`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			});
			const data = await res.json();
			return data;
		},

		async deleteAccount(id) {
			if (confirm('are you sure ?')) {
				const res = await fetch(`http://localhost:3000/home/profil/${id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
				});
				if (res.status === 200) {
					alert('compte suprimé');
					this.users = this.users.filter((user) => user.id !== id); // compare les id post de la db avec l'id envoyer
				} else {
					alert('error on deleting post');
				}
			}
		},
	},

	async created() {
		this.users = await this.getAllUsers();
		this.user = await this.fetchAccount();
		this.$emit('fetch-user', this.user); //envoit les informations  au header
	},
};
</script>
<style scoped>
.blocModerate {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
	margin: 20px auto 20px auto;
}
</style>
