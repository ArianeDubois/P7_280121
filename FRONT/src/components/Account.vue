<template>
	<div>
		<!-- on submit ubdate -->
		<!-- faire un place holder dynamique avec un fetch sur mes donnée  -->
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

			<input type="submit" value="MODIFIER" class="btn" />
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
			const modifyUser = {
				firstname: this.firstname,
				lastName: this.lastName,
				mail: this.mail,
				password: this.password,
				biographie: this.biographie,
			};

			console.log(modifyUser);
			//fetch
		},
	},
};
</script>

<style></style>
