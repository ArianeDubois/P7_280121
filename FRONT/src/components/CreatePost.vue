<template>
	<form @submit="onSubmit">
		<div>
			<label>Content</label>
			<input type="text" v-model="content" name="content" placeholder="Content" />

			<label>Image</label>
			<input
				type="file"
				accept="image/jpeg"
				@change="uploadImage"
				name="imageUrl"
				placeholder="url"
			/>
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
			idUser: '',
			imageUrl: '',
		};
	},
	methods: {
		onSubmit(e) {
			e.preventDefault();
			// if (!this.text) {
			// 	alert('Please add a text');
			// 	return;
			// }
			const newPost = {
				content: this.content,
				idUser: JSON.parse(localStorage.getItem('idUser')),
				imageUrl: this.imageUrl,
			};
			console.log(newPost);

			this.$emit('create-post', newPost);
		},
		async uploadImage() {},
	},
	async created() {
		this.imageUrl = await this.uploadImage();
	},
};
</script>

<style scoped></style>
