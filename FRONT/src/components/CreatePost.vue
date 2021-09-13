<template>
	<form @submit="onSubmit">
		<div>
			<label>Content</label>
			<input type="text" v-model="content" name="content" placeholder="Content" />

			<label>Image</label>
			<input type="text" v-model="imageUrl" name="imageUrl" placeholder="url" />
		</div>
		<input type="submit" value="Poster un message" class="btn btn-block" />
	</form>
</template>

<script>
export default {
	name: 'CreatePost',
	data() {
		return {
			content: '',
			userId: '',
			imageUrl: '',
		};
	},
	//mounted == get user id from local storage
	methods: {
		onSubmit(e) {
			//validation avant envoit des données
			e.preventDefault();
			// if (!this.text) {
			// 	alert('Please add a text');
			// 	return;
			// }
			const newPost = {
				id: Math.floor(Math.random() * 100000),
				content: this.content,
				userId: this.userId,
				//userId =req.userId
				imageUrl: this.imageUrl,
			};

			this.$emit('create-post', newPost);
			console.log(newPost);
			// this.content = '';
			// this.userId = '';
			// this.imageUrl = '';

			//fetch
		},
	},
};
</script>

<style scoped></style>
