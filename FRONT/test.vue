<template>
	<form @submit="onSubmit">
		<div>
			<label for=""></label>
			<input type="text" v-model="content" name="content" />
		</div>
		<input type="submit" value="Commenter" class="btn" />
	</form>
</template>
<script>
export default {
	name: 'Comment',

	data() {
		return {
			userId: '',
			content: '',
		};
	},
	//get user id mounted()
	methods: {
		onSubmit(e) {
			e.preventDefault();

			const comment = {
				userId: this.userId,
				content: this.content,
			};

			this.$emit('create-comment', comment);
			console.log(comment);
			//fetch
		},
	},
};
</script>
<style></style>
