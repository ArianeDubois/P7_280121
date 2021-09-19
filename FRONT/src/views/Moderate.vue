<template>
	<div class="users">
		<Header :user="user" />

		<div v-for="user in users" :key="user.id">
			<div class=" blocModerate">
				<p>{{ user.firstName }}</p>
				<p>{{ user.lastName }}</p>
				<p>{{ user.email }}</p>
				<!-- <img :src="post.imageUrl" /> -->
				<i @click="deleteAccount(user.id)" class="fas fa-times"></i>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '../components/Header.vue';
export default {
	name: 'Moderate',
	components: {
		Header,
	},

	data() {
		return {
			users: [],
			user: {},
		};
	},
	methods: {
		async getAllUsers() {
			const id = JSON.parse(localStorage.getItem('idUser'));
			const res = await fetch(`http://localhost:3000/home/${id}/profil`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			});
			const data = await res.json();
			return data;
		},
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
	},
};
</script>
<style scoped>
.blocModerate {
	display: flex;
	justify-content: space-around;
	margin: 20px auto 20px auto;
	max-width: 35vw;
	border: 2px solid black;
	border-radius: 1em;
}
</style>
