<template>
	<form @submit="onSubmit" enctype="multipart/form-data">
		<div>
			<label>Content</label>
			<input type="text" v-model="content" name="content" placeholder="Content" />

			<label>Image</label>
			<input type="file" ref="file" @change="uploadImage" name="imageUrl" placeholder="url" />
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

			let formData = new FormData();
			formData.append('content', this.content),
				formData.append('idUser', JSON.parse(localStorage.getItem('idUser'))),
				formData.append('imageUrl', this.imageUrl),
				this.$emit('create-post', formData);
		},

		//on Chnage
		async uploadImage() {
			this.imageUrl = this.$refs.file.files[0]; //
			console.log(this.imageUrl);
		},
	},
	async mounted() {
		this.imageUrl = await this.uploadImage();
	},
};
</script>

<style scoped></style>
