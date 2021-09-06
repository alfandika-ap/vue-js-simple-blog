<template>
	<DefaultLayout>
		<v-container>
			<div class="mb-10">
				<router-link
					:to="{ name: 'home' }"
					class="text-decoration-none"
				>
					<v-btn color="success" class="text-white "
						><v-icon class="mr-2"> mdi-arrow-left </v-icon
						>Kembali</v-btn
					>
				</router-link>
			</div>
			<BlogContent />
		</v-container>
	</DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout";
import BlogContent from "@/components/pages/detail-blog/BlogContent";

export default {
	name: "DetailBlog",
	components: {
		DefaultLayout,
		BlogContent
	}
};
</script>
