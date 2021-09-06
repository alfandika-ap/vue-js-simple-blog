<template>
	<div>
		<v-fade-transition mode="in-out" :hide-on-leave="false">
			<div v-if="loading">
				<div
					class="py-10 px-10 w-full d-flex align-center justify-center"
				>
					<div class="text-center mt-10">
						<SyncLoader />
					</div>
				</div>
			</div>
			<div v-else>
				<slot />
			</div>
		</v-fade-transition>
	</div>
</template>

<script>
import SyncLoader from "vue-spinner/src/SyncLoader.vue";
export default {
	name: "LoadingSection",
	props: {
		loading: Boolean
	},
	components: {
		SyncLoader
	}
};
</script>
