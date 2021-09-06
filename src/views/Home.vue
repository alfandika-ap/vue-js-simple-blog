<template>
	<DefaultLayout>
		<v-container>
			<Blog />
		</v-container>
	</DefaultLayout>
</template>
<script>
import DefaultLayout from "@/layouts/DefaultLayout";
import Blog from "@/components/pages/home/blog";

export default {
	name: "Home",
	components: {
		DefaultLayout,
		Blog
	}
};
</script>
