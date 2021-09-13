<template>
	<div>
		<form @submit="onSubmit">
			<div>
				<label>Firstname</label>
				<input type="text" v-model="firstname" name="firstname" />
			</div>
			<div>
				<label>LastName</label>
				<input type="text" v-model="lastName" name="lastName" />
			</div>
			<div>
				<label>Mail</label>
				<input type="email" v-model="mail" name="mail" placeholder="email@mail.fr" />
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
export default {
	name: 'Signup',
	data() {
		return {
			firstname: '',
			lastName: '',
			mail: '',
			password: '',
			biographie: '',
		};
	},
	methods: {
		onSubmit(e) {
			e.preventDefault();
			//alert champs null
			const newUser = {
				firstname: this.firstname,
				lastName: this.lastName,
				mail: this.mail,
				password: this.password,
				biographie: this.biographie,
			};

			console.log(newUser);
			//fetch
		},
	},
};
</script>

<style></style>
