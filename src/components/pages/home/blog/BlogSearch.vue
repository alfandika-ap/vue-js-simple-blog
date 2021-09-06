<template>
	<v-form @submit.prevent="handleSumbit" class="mb-10">
		<v-card class="px-3 d-flex align-center">
			<v-text-field
				label="Cari blog"
				v-model="keyword"
				class="mr-10"
			></v-text-field>
			<v-btn v-if="keyword" @click="handleReset" class="mr-2"
				>Reset</v-btn
			>
			<v-btn type="submit" color="success">Cari</v-btn>
		</v-card>
	</v-form>
</template>

<script>
export default {
	name: "BlogSearch",
	props: {
		defaultValue: String
	},
	data() {
		return {
			keyword: this.defaultValue
		};
	},
	methods: {
		handleOnChange() {
			this.$emit("change", {
				keyword: this.keyword
			});
		},
		handleSumbit() {
			this.handleOnChange();
		},
		handleReset() {
			this.keyword = "";
			this.handleOnChange();
		}
	}
};
</script>
