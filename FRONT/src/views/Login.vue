<template>
	<div>
		<header>
			<router-link to="/signup" class="btn">inscription</router-link>
			<Button text="connexion" class="btn" />
		</header>
		<div class="bloc">
			<form @submit="fetchLogin">
				<div>
					<label>Mail</label>
					<input type="email" v-model="email" name="email" placeholder="email@mail.fr" />
				</div>
				<div>
					<label>Password</label>
					<input type="password" v-model="password" name="password" />
				</div>

				<input type="submit" value="Connection" class="btn" />
			</form>
		</div>
	</div>
</template>
<script>
import Button from '../components/Button.vue';
export default {
	name: 'Login',

	data() {
		return {
			email: '',
			password: '',
		};
	},
	components: {
		Button,
	},
	//get user id mounted()
	methods: {
		async fetchLogin(e) {
			e.preventDefault();
			const User = {
				email: this.email,
				password: this.password,
			};

			const res = await fetch('http://localhost:3000/home/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
				body: JSON.stringify(User),
			});
			const data = await res.json();
			localStorage.setItem('idUser', data.idUser);
			localStorage.setItem('token', data.token);
			console.log(localStorage);
			//navigation gards
			this.$router.push('/home');

			if (localStorage.idUser === 'undefined') {
				alert(data.error);
			}
		},
	},
};
</script>

<style scoped>
form {
	margin: 30px;
}
</style>
