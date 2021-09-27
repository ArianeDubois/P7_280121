<template>
	<form @submit="onSubmit" enctype="multipart/form-data">
		<div class="blocPost">
			<input
				class="bloc-post-content"
				type="text"
				v-model="content"
				name="content"
				placeholder="..."
			/>

			<div class="bloc-post-image">
				<label class="bloc-post-image_button">
					<i class="fas fa-file-upload bloc-post-image_button_icone "></i>
				</label>
			</div>
			<input
				class="bloc-post-image_input"
				type="file"
				ref="file"
				@change="uploadImage"
				name="imageUrl"
			/>
		</div>

		<input type="submit" value="Poster un message" class="btn btn-block" />

		<div v-if="imageUrl" class="bloc-img-caption">
			<i @click="removeImageLoaded" class="fas fa-times bloc-post-image_button_icone "></i>
			<p>{{ imageUrl.name }}</p>
		</div>
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
		async onSubmit(e) {
			e.preventDefault();

			let formData = new FormData();
			formData.append('content', this.content),
				formData.append('idUser', JSON.parse(localStorage.getItem('idUser'))),
				formData.append('imageUrl', this.imageUrl);
			//ne pas envoyer les données si contenu vide
			if (this.content || this.imageUrl) {
				this.$emit('create-post', formData);
				//permet de netoyer les champs après envoie du contenu
				this.content = '';
				this.imageUrl = '';
				this.$refs.file.value = '';
			} else {
				alert('contenu vide');
			}
		},

		//on Chnage
		async uploadImage() {
			this.imageUrl = this.$refs.file.files[0]; //
		},

		async removeImageLoaded() {
			this.imageUrl = '';
			this.$refs.file.value = '';
			console.log(this.$refs.file);
		},
	},
	async mounted() {
		this.imageUrl = await this.uploadImage();
	},
};
</script>

<style lang="scss" scoped>
$border-dotted: 5px dotted black;
$max-width-bloc: 35vw;
$radius: 1em;
//global
$padding-btn: 0.5rem 1rem 0.5rem 1rem;
$litle-radius: 0.7rem;

.blocPost {
	border: $border-dotted;
	display: flex;
	justify-content: space-between;
	margin: 100px auto 0 auto;
	max-width: 650px;
	width: 90vw;
	height: 7vmax;
	border-radius: $radius;
	position: relative;

	.bloc-post-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 80%;
		height: 100%;
		border: none;
		font-family: 'title-bold';
		font-size: max(2vw, 20px);
		padding-left: 3%;
		border-radius: 1em;

		@media (max-width: 460px) {
			width: 70%;
		}
	}

	.bloc-post-image {
		display: flex;
		border-radius: 0 1em 1em 0;
		flex-direction: column-reverse;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: black;

		// overflow: hidden;
		&_button {
			display: flex;
			margin: auto 30px auto 30px;
			// transition: ease-in;

			&_icone {
				font-size: max(2vmax, 30px);
				color: white;
				align-self: center;
			}
		}

		&_input {
			position: absolute;
			width: 100px;
			top: 0;
			right: 0;
			opacity: 0;
			cursor: pointer;
			height: 100%;
		}
	}
}

.bloc-img {
	position: relative;
	display: flex;
	margin: auto;
	justify-content: center;
}
.bloc-img-caption {
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: center;
	color: gray;
	i {
		margin-left: 10px;
	}
}
</style>
