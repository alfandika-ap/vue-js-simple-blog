<template>
	<v-container>
		<div class="mb-10">
			<v-row>
				<v-col md="6">
					<router-link
						:to="{ name: 'home' }"
						class="text-decoration-none"
					>
						<v-btn color="success" class="text-white "
							><v-icon class="mr-2"> mdi-arrow-left </v-icon
							>Kembali ke halaman depan</v-btn
						>
					</router-link>
				</v-col>
				<v-col md="6" class="text-right">
					<router-link
						:to="{ name: 'dashboard.blog-add' }"
						class="text-decoration-none"
					>
						<v-btn color="primary" class="text-white "
							><v-icon class="mr-2"> mdi-plus </v-icon>Tambah
							Post</v-btn
						>
					</router-link>
				</v-col>
			</v-row>
		</div>
		<BlogTable />
	</v-container>
</template>

<script>
import BlogTable from "@/components/pages/dashboard/blog/BlogTable";

export default {
	name: "DashboardBlog",
	components: {
		BlogTable
	}
};
</script>
