<template>
	<v-app>
		<div>
			<Navbar />
		</div>
		<v-fade-transition mode="out-in" :hide-on-leave="false">
			<router-view />
		</v-fade-transition>
	</v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
	name: "App",
	components: {
		Navbar
	}
};
</script>
