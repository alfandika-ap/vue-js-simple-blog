<template>
	<v-card class="mx-auto" height="100%">
		<v-img
			height="250"
			:src="thumbnail ? thumbnail : NotFoundImage"
		></v-img>

		<v-card-title>{{ title }}</v-card-title>

		<v-card-text>
			<div class="text-subtitle-1 mb-3">
				<v-icon class="mr-1">mdi-account</v-icon> {{ creator }}
			</div>

			<p class="mb-4">{{ shortDesc }}</p>
			<router-link
				class="text-decoration-none"
				:to="{ name: 'detail-blog', params: { postId: id } }"
			>
				<v-btn color="info">Selengkapnya</v-btn>
			</router-link>
		</v-card-text>
	</v-card>
</template>

<script>
import NotFoundImage from "@/assets/not-found-image.jpeg";
export default {
	name: "BlogCard",
	props: ["id", "title", "shortDesc", "date", "creator", "thumbnail"],
	data: function() {
		return {
			NotFoundImage: NotFoundImage
		};
	}
};
</script>
