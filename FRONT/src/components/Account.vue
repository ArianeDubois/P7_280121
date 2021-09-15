<template>
	<div>
		<!-- on submit ubdate -->
		<!-- faire un place holder dynamique avec un fetch sur mes donnée  -->
		<form @submit="onSubmit">
			<div>
				<label>Firstname</label>
				<input
					type="text"
					v-model="accountInfos.firstName"
					name="firstName"
					:placeholder="accountInfos.firstName"
				/>
			</div>
			<div>
				<label>LastName</label>
				<input
					type="text"
					v-model="accountInfos.lastName"
					name="lastName"
					:placeholder="accountInfos.lastName"
				/>
			</div>
			<div>
				<label>Mail</label>
				<input
					type="email"
					v-model="accountInfos.email"
					name="email"
					:placeholder="accountInfos.email"
				/>
			</div>
			<div>
				<label>Password</label>
				<input type="password" v-model="accountInfos.password" name="password" />
			</div>

			<div>
				<label>Biographie</label>
				<input
					type="text"
					v-model="accountInfos.biographie"
					name="biographie"
					:placeholder="accountInfos.biographie"
				/>
			</div>

			<input type="submit" value="MODIFIER" class="btn" />
			<!-- <Button text="Supprimer mon compte" class="btn btn-block" />
			<Button text="deconnexion" class="btn btn-block" /> -->
			<div @click="deleteAccount" class="btn">Supprimer mon compte</div>
		</form>
	</div>
</template>
<script>
import Button from './Button.vue';
export default {
	name: 'Account',
	data() {
		return {
			accountInfos: {},
		};
	},
	composents: {
		Button,
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
		async onSubmit(e) {
			e.preventDefault();
			//alert champs null
			const modifyUser = {
				firstname: this.firstname,
				lastName: this.lastName,
				email: this.email,
				password: this.password,
				biographie: this.biographie,
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
			const data = await res.json();
			this.accountInfos = { ...this.accountInfos, data };
		},
		//DELETE
		// async deleteAccount() {
		// 	if (confirm('are you sure ?')) {
		// 		const id = JSON.parse(localStorage.getItem('idUser'));

		// 		const res = await fetch(`http://localhost:3000/home/profil/${id}`, {
		// 			method: 'DELETE',
		// 			headers: {
		// 				'Content-Type': 'application/json',
		// 				Authorization: 'Bearer ' + localStorage.getItem('token'),
		// 			},
		// 		});
		// 		//vider le localstorage
		// 		if (res.status === 200) {
		// 			// localStorage.clear();
		// 			//redirection signup
		// 		} else {
		// 			alert('error on deleting post');
		// 		}
		// 	}
		// },
	},

	async created() {
		this.accountInfos = await this.fetchAccount();
	},
};
</script>

<style></style>
