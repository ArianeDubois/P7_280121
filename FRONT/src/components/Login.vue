<template>
	<div>
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
</template>

<script>
export default {
	name: 'Login',

	data() {
		return {
			email: '',
			password: '',
		};
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
		},
		//	// this.$router.push("/home");
		//ou wondow reload ...
	},
};
</script>

<style scoped>
form {
	margin: 30px;
}
</style>
