<template>
	<div>
		<header>
			<router-link to="/signup" class="btn">inscription</router-link>
			<Button text="connexion" class="btn" />
		</header>
		<div class="bloc">
			<form class="form" @submit="fetchLogin">
				<div class="field-bloc">
					<label>Mail</label>
					<input
						class="input-form"
						type="email"
						v-model="email"
						name="email"
						placeholder="email@mail.fr"
					/>
				</div>
				<div class="field-bloc">
					<label>Password</label>
					<input class="input-form" type="password" v-model="password" name="password" />
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
			console.log(localStorage.idUser);
			//navigation gards
			this.$router.push('/home');
			if (localStorage.idUser === 'undefined') {
				alert(data.error);
			}
		},
	},
};
</script>

<style></style>
