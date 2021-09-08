<template>
	<!-- ici le v-bind sert à poser une condition et rendre dynamique la classe -->
	<!-- ? si la conditoin est vrai applique la classe reminder sinon rien, applqie dans tout les cas la classe post  -->
	<div :class="[post.reminder ? 'like' : '', 'post']">
		<h3>
			{{ post.text }}
			<i @click="onLike(post.id)" class="far fa-thumbs-up"></i>
		</h3>
		<p>{{ post.day }}</p>
	</div>
</template>

<script>
export default {
	name: 'Post',
	props: {
		post: Object,
	},
	methods: {
		onLike(id) {
			this.$emit('like-post', id);
		},
	},
};
</script>

<style scoped>
.post {
	border: 2px solid black;
	max-width: 50%;
	display: flex;
	justify-content: space-between;
	padding: 1.5rem;
	border-radius: 1rem;
	margin: 30px auto 30px auto;
}

.like {
	color: red;
}
</style>
