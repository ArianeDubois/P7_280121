<template>
	<header>
		<h1>{{ titleTxt }}</h1>
		<router-link to="/login"> login </router-link>
		<Button text="inscription" />
	</header>
</template>

<script>
import Button from './Button.vue';

export default {
	name: 'Header',
	components: {
		Button,
	},
	props: {
		titleTxt: String,
	},
};
</script>

<style scoped>
a {
	color: black;
}
header {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
}
</style>
