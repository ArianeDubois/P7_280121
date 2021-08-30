<template>
	<form @submit="onSubmit">
		<div>
			<label>Titre</label>
			<input type="text" v-model="text" name="text" placeholder="Content" />
		</div>
		<div>
			<label>Day & Time</label>
			<input type="text" v-model="day" name="day" placeholder="Add Day & Time" />
		</div>
		<div>
			<label>Set Reminder</label>
			<input type="checkbox" v-model="reminder" name="reminder" />
		</div>

		<input type="submit" value="Poster un message" class="btn btn-block" />
	</form>
</template>

<script>
export default {
	name: 'AddPost',
	data() {
		return {
			text: '',
			day: '',
			reminder: false,
		};
	},
	methods: {
		onSubmit(e) {
			//validation avant envoit des données
			e.preventDefault();
			if (!this.text) {
				alert('Please add a text');
				return;
			}
			//on créer un nouvel objet
			const newPost = {
				// id: Math.floor(Math.random() * 100000),
				text: this.text,
				day: this.day,
				reminder: this.reminder,
			};

			console.log(newPost);
			//on emet l'objet newPost que avec l'evenement appelé add-post
			this.$emit('add-post', newPost);
			// this.text = '';
			// this.day = '';
			// this.reminder = false;
		},
	},
};
</script>

<style scoped></style>
