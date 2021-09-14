<template>
	<div>
		<form @submit="onSubmit">
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
		// async fetchLogin() {
		// 	const res = await fetch('http://localhost:3000/home/login');
		// 	const data = await res.json();
		// 	return data;
		// },

		onSubmit(e) {
			e.preventDefault();

			const User = {
				email: this.email,
				password: this.password,
			};
			const options = {
				method: 'POST',
				body: JSON.stringify(User),
				headers: {
					'Content-Type': 'application/json',
				},
			};

			// console.log(User, options);
			//fetch

			fetch('http://localhost:3000/home/login', options)
				.then((res) => res.json())
				.then((res) => {
					// if(res.idUser == res.token )
					localStorage.setItem('idUser', res.idUser);
					localStorage.setItem('token', res.token);
					console.log(localStorage);
				})
				.catch((error) => console.log(error));
		},
	},
};
</script>

<style scoped>
form {
	margin: 30px;
}
</style>
