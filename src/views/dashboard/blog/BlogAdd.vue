<template>
	<v-container>
		<div class="mb-10">
			<router-link
				:to="{ name: 'dashboard' }"
				class="text-decoration-none"
			>
				<v-btn color="success" class="text-white "
					><v-icon class="mr-2"> mdi-arrow-left </v-icon
					>Kembali</v-btn
				>
			</router-link>
		</div>
		<BlogAddForm />
	</v-container>
</template>

<script>
import BlogAddForm from "@/components/pages/dashboard/blog/add-blog/BlogAddForm";
export default {
	name: "BlogAdd",
	components: {
		BlogAddForm
	}
};
</script>
