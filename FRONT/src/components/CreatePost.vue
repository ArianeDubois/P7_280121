<template>
	<form @submit="onSubmit" enctype="multipart/form-data">
		<div class="blocPost">
			<div class="bloc-post-content">
				<label class="blocPost-titre">Content</label>
				<input type="text" v-model="content" name="content" placeholder="Content" />
			</div>
			<div class="bloc-post-image">
				<label class="blocPost-titre">Image</label>
				<input type="file" ref="file" @change="uploadImage" name="imageUrl" />
			</div>
			<i v-if="imageUrl" @click="removeImageLoaded" class="fas fa-times"></i>
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

			let formData = new FormData();
			formData.append('content', this.content),
				formData.append('idUser', JSON.parse(localStorage.getItem('idUser'))),
				formData.append('imageUrl', this.imageUrl),
				this.$emit('create-post', formData);
			//permet de netoyer les champs après envoie du contenu
			this.content = '';
			this.imageUrl = '';
			this.$refs.file.value = '';
		},

		//on Chnage
		async uploadImage() {
			this.imageUrl = this.$refs.file.files[0]; //
			// console.log(this.imageUrl);
		},

		async removeImageLoaded() {
			this.imageUrl = '';
			this.$refs.file.value = '';
			console.log(this.$refs.file);
		},
	},
	async created() {
		this.imageUrl = await this.uploadImage();
	},
};
</script>

<style scoped>
.blocPost {
	border: 5px dotted black;
	display: flex;
	justify-content: space-around;
	margin: 100px auto 0 auto;
	max-width: 35vw;
	height: 100px;
	border-radius: 1em;
}

.bloc-post-content,
.bloc-post-image {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
</style>
