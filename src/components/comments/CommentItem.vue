<template>
	<div class="mb-3 ">
		<div class="mb-2 comment-wrap">
			<span class="d-block blue--text  font-weight-medium">{{
				name
			}}</span>
			<span class="d-block text-caption">{{ parseDate }}</span>
			<v-btn
				v-if="editable"
				class="error btn-del"
				x-small
				@click="handleDelete"
				><v-icon>mdi-close</v-icon></v-btn
			>
		</div>
		<p>
			{{ comment }}
		</p>
		<!-- Dialog Remove  -->

		<v-divider></v-divider>
	</div>
</template>

<script>
import { format } from "date-fns";
import { id as idn } from "date-fns/locale";

export default {
	name: "CommentItem",
	props: {
		id: [String, Number],
		name: String,
		date: String,
		comment: String,
		editable: Boolean
	},
	data: function() {
		return {
			dateItem: this.date
		};
	},
	computed: {
		parseDate: vm => {
			return format(new Date(vm.dateItem), "eeee, d LLLL yyyy - kk:mm ", {
				locale: idn
			});
		}
	},
	methods: {
		handleDelete() {
			this.$emit("click", {
				id: this.id,
				comment: this.comment
			});
		}
	}
};
</script>

<style scoped>
.comment-wrap {
	position: relative;
}
.btn-del {
	position: absolute;
	top: 3px;
	right: 0;
}
</style>
