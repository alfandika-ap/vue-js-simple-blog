<template>
	<div class="mb-3">
		<div class="mb-2">
			<span class="d-block blue--text  font-weight-medium">{{
				name
			}}</span>
			<span class="d-block text-caption">{{ parseDate }}</span>
		</div>
		<p>
			{{ comment }}
		</p>
		<v-divider></v-divider>
	</div>
</template>

<script>
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default {
	name: "CommentItem",
	props: {
		name: String,
		date: String,
		comment: String
	},
	data: function() {
		return {
			dateItem: this.date
		};
	},
	computed: {
		parseDate: vm => {
			return format(new Date(vm.dateItem), "eeee, d LLLL yyyy - kk:mm ", {
				locale: id
			});
		}
	}
};
</script>

<style></style>
