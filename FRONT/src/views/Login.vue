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
		<router-link to="/">Go Back</router-link>
	</div>
</template>

<script>
export default {
	name: 'Login',
};
</script>

<style scoped></style>
