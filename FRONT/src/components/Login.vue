<template>
	<div>
		<form @submit="onSubmit">
			<div>
				<label>Mail</label>
				<input type="email" v-model="mail" name="mail" placeholder="email@mail.fr" />
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
			mail: '',
			password: '',
		};
	},
	//get user id mounted()
	methods: {
		onSubmi(e) {
			e.preventDefault();

			const User = {
				mail: this.mail,
				password: this.password,
			};
			console.log(User);
			//fetch
		},
	},
};
</script>

<style scoped>
form {
	margin: 30px;
}
</style>
