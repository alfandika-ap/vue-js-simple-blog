<template>
	<DefaultLayout>
		<v-fade-transition mode="out-in" :hide-on-leave="false">
			<router-view></router-view>
		</v-fade-transition>
	</DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout";
export default {
	name: "Dashboard",
	components: {
		DefaultLayout
	}
};
</script>
