<template>
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
</template>

<script>
export default {
	name: 'Connection',
	data() {
		return {
			mail: '',
			password: '',
		};
	},
	methods: {
		onSubmit(e) {
			//validation avant envoit des données
			e.preventDefault();
			const userConnect = {
				mail: this.text,
				password: this.day,
			};
			this.$emit('user-connect', userConnect);
		},
	},
};
</script>

<style scoped></style>
