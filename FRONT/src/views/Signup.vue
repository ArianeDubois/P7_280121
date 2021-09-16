<template>
	<div>
		<header>
			<router-link to="/" class="btn">login</router-link>
			<Button text="Signup" class="btn" />
		</header>
		<form @submit="onSubmit">
			<div>
				<label>Firstname</label>
				<input type="text" v-model="firstName" name="firstName" />
			</div>
			<div>
				<label>LastName</label>
				<input type="text" v-model="lastName" name="lastName" />
			</div>
			<div>
				<label>Mail</label>
				<input type="email" v-model="email" name="email" placeholder="email@mail.fr" />
			</div>
			<div>
				<label>Password</label>
				<input type="password" v-model="password" name="password" />
			</div>

			<div>
				<label>Biographie</label>
				<input type="text" v-model="biographie" name="biographie" />
			</div>

			<input type="submit" value="Inscription" class="btn" />
		</form>
	</div>
</template>
<script>
import Button from '../components/Button.vue';
export default {
	name: 'Signup',
	data() {
		return {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			biographie: '',
		};
	},
	components: {
		Button,
	},
	methods: {
		onSubmit(e) {
			e.preventDefault();
			//alert champs null
			const newUser = {
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email,
				password: this.password,
				biographie: this.biographie,
			};

			// console.log(newUser);
			//fetch

			const options = {
				method: 'POST',
				body: JSON.stringify(newUser),
				headers: {
					'Content-Type': 'application/json',
				},
			};

			// console.log(User, options);
			//fetch

			fetch('http://localhost:3000/home/signup', options)
				.then((res) => res.json())
				.then((res) => {
					console.log(res);
				})
				.catch((error) => console.log(error));
		},
	},
};
</script>

<style></style>
