<template>
	<v-alert text prominent type="error" icon="mdi-cloud-alert">
		<slot />
	</v-alert>
</template>

<script>
export default {
	name: "ErrorAlert"
};
</script>
