<template>
	<div>
		<h2 class="text-center mb-10">Daftar Posts</h2>
		<v-alert dense outlined text type="info"
			>Catatan : anda hanya bisa menghapus / mengubah post milik
			anda</v-alert
		>

		<!-- Filter Menu  -->
		<v-menu class="mb-3" offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					color="primary"
					class="mb-3 text-capitalize"
					dark
					v-bind="attrs"
					v-on="on"
				>
					Filter :
					{{ params.owner ? "Post milik saya" : "Semua post" }}
				</v-btn>
			</template>
			<v-list>
				<v-list-item-group>
					<v-list-item
						:disabled="!params.hasOwnProperty('owner')"
						@click="handleOwner(false)"
					>
						<v-list-item-title>Semua post</v-list-item-title>
					</v-list-item>
					<v-list-item
						:disabled="params.hasOwnProperty('owner')"
						@click="handleOwner(profileId)"
					>
						<v-list-item-title>Post milik saya</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-menu>

		<!-- Data table  -->
		<v-data-table
			:headers="headers"
			:items="posts"
			:options.sync="options"
			:server-items-length="totalPosts"
			:loading="loading"
			:footer-props="{
				disableItemsPerPage: true
			}"
			class="elevation-1"
		>
			<template v-slot:item.action="{ item }">
				<div class="text-right">
					<router-link
						class="text-decoration-none"
						:to="{
							name: 'dashboard.blog-detail',
							params: { postId: item.id }
						}"
					>
						<v-btn color="success">
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
					</router-link>
					<template v-if="profileId === item.creator_instance.id">
						<v-btn
							color="error"
							class="ml-2"
							@click.stop="openDeleteConfirm(item)"
						>
							<v-icon>mdi-eraser</v-icon>
						</v-btn>
					</template>
				</div>
			</template>
			<template v-slot:item.post_date="{ item }">
				{{
					formatDate(new Date(item.post_date), "eeee, d LLLL yyyy", {
						locale: idn
					})
				}}
			</template>
		</v-data-table>

		<!-- Dialog Remove  -->
		<v-dialog v-model="confirmOption.dialog" persistent max-width="300">
			<v-card>
				<template v-if="confirmOption.loading">
					<v-card-text class="pt-2">
						Proses menghapus data..
						<v-progress-linear
							indeterminate
							color="primary"
							class="mb-0"
						></v-progress-linear>
					</v-card-text>
				</template>
				<template v-else-if="confirmOption.success != null">
					<v-alert type="success" class="mb-0">{{
						confirmOption.success
					}}</v-alert>
				</template>
				<template v-else-if="confirmOption.error != null">
					<v-alert type="error" class="mb-0">{{
						confirmOption.error
					}}</v-alert>
				</template>
				<template v-else>
					<v-card-title class="text-body text-center">
						Konfirmasi
					</v-card-title>
					<v-card-text v-if="confirmOption.item"
						>Hapus post "{{ confirmOption.item.title }}" ?
					</v-card-text>
					<div class="px-5">
						<v-spacer></v-spacer>
						<v-row class="mb-0">
							<v-col cols="6">
								<v-btn
									color="success"
									@click="closeDeleteConfirm"
									block
								>
									Tutup
								</v-btn>
							</v-col>
							<v-col cols="6">
								<v-btn
									color="error"
									@click="handleDelete"
									block
								>
									Hapus
								</v-btn>
							</v-col>
						</v-row>
					</div>
				</template>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { format } from "date-fns";
import { id as idn } from "date-fns/locale";
import post from "@/api/post";
import { mapGetters } from "vuex";

export default {
	name: "BlogTable",
	data() {
		return {
			totalPosts: 0,
			posts: [],
			loading: true,
			options: {},
			params: {
				owner: ""
			},
			headers: [
				{ text: "Judul", value: "title", sortable: false },
				{ text: "Tanggal Post", value: "post_date", sortable: false },
				{ text: "Aksi", value: "action", sortable: false, align: "end" }
			],
			confirmOption: {
				dialog: false,
				item: null,
				loading: false,
				success: null,
				error: null
			}
		};
	},
	watch: {
		options: {
			handler() {
				this.fetchPosts();
			},
			deep: true
		}
	},
	mounted() {
		this.params.owner = this.profileId;
		this.fetchPosts();
	},
	computed: {
		...mapGetters("auth", ["profileId"])
	},
	methods: {
		fetchPosts() {
			this.loading = true;
			const { page } = this.options;
			this.params.page = page;
			post.all(this.params).then(data => {
				this.posts = data.data;
				this.totalPosts = data.total;
				this.loading = false;
			});
		},
		openDeleteConfirm(item) {
			this.confirmOption.dialog = true;
			this.confirmOption.item = item;
		},
		closeDeleteConfirm() {
			this.confirmOption.dialog = false;
			this.confirmOption.item = null;
		},
		clearDeleteConfirm() {
			this.confirmOption.dialog = false;
			this.confirmOption.item = null;
			this.confirmOption.loading = false;
			this.confirmOption.success = null;
		},
		async handleDelete() {
			this.confirmOption.loading = true;
			try {
				let reqPostRemove = await post.remove(
					this.confirmOption.item.id
				);
				this.confirmOption.success = reqPostRemove;
				this.confirmOption.loading = false;
				setTimeout(() => {
					this.confirmOption.success = null;
					this.confirmOption.dialog = false;
					this.fetchPosts();
				}, 2000);
			} catch (error) {
				console.log(error);
				this.confirmOption.error = error;
				this.confirmOption.loading = false;
				this.confirmOption.dialog = false;
			}
		},
		handleOwner(owner) {
			if (owner) {
				this.params.owner = owner;
			} else {
				if (this.params.owner) {
					delete this.params.owner;
				}
			}
			this.fetchPosts();
		},
		formatDate(date) {
			return format(new Date(date), "eeee, d LLLL yyyy", { locale: idn });
		}
	}
};
</script>
