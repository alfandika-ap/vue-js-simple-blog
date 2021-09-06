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
		<v-alert v-show="successAdd" type="success">{{ successAdd }}</v-alert>
		<BlogDetailForm />
	</v-container>
</template>

<script>
import router from "@/router";
import BlogDetailForm from "@/components/pages/dashboard/blog/detail-blog/BlogDetailForm";

export default {
	name: "BlogDetail",
	components: {
		BlogDetailForm
	},
	data() {
		return {
			successAdd: false
		};
	},
	mounted() {
		if (localStorage.getItem("successAddPost")) {
			this.successAdd = "Berhasil membuat post baru";
			setTimeout(() => {
				this.successAdd = false;
				localStorage.removeItem("successAddPost");
			}, 3000);
		}
	},
	computed: {
		postId() {
			return router.history.current.params.postId;
		}
	}
};
</script>
