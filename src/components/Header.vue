<template>
	<header>
		<h1>{{ titleTxt }}</h1>
		<Button text="inscription" />
		<Button @btn-click="$emit('show-form-connection')" text="connection" />
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
header {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
}
</style>
