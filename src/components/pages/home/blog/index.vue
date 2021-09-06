<template>
	<div>
		<BlogSearch
			@change="setFilter"
			:defaultValue="filter && filter.keyword ? filter.keyword : ''"
		/>
		<div v-if="filter">
			<p v-if="filter.keyword">
				Menampilkan pencarian dengan kata kunci :
				<span class="text-bold">{{ filter.keyword }}</span>
			</p>
		</div>
		<LoadingSection :loading="isLoading">
			<div v-if="!error">
				<template v-if="blogs.length">
					<v-row>
						<v-col
							v-for="blog in blogs"
							:key="blog.id"
							cols="12"
							sm="6"
						>
							<BlogCard
								:id="blog.id"
								:thumbnail="blog.image_url"
								:title="blog.title"
								:shortDesc="blog.short_text"
								:date="blog.post_date"
								:creator="blog.creator_instance.name"
							/>
						</v-col>
					</v-row>
					<v-pagination
						class="mt-10"
						:value="filter.page ? parseInt(filter.page) : 1"
						:length="options.last_page"
						@input="number => setFilter({ page: number })"
					></v-pagination>
				</template>
				<EmptySection v-else>
					<h1>Maaf blog yang ada cari tidak ada</h1>
				</EmptySection>
			</div>
			<ErrorAlert v-else>{{ error }}</ErrorAlert>
		</LoadingSection>
	</div>
</template>

<script>
import router from "@/router";
import BlogCard from "./BlogCard";
import BlogSearch from "./BlogSearch";
import post from "@/api/post";
import LoadingSection from "@/components/LoadingSection";
import ErrorAlert from "@/components/ErrorAlert";
import EmptySection from "@/components/EmptySection";

export default {
	name: "Blog",
	components: {
		BlogCard,
		BlogSearch,
		LoadingSection,
		ErrorAlert,
		EmptySection
	},
	data: function() {
		return {
			isLoading: true,
			error: null,
			options: {
				last_page: 1
			},
			blogs: [],
			filter: {
				page: 1
			}
		};
	},
	mounted() {
		this.setDefaultFilter();
		this.fetchBlogs();
	},
	watch: {
		filter: function() {
			this.fetchBlogs();
		}
	},
	methods: {
		async fetchBlogs() {
			router
				.replace({ name: "home", query: this.filter })
				.catch(() => {});
			this.isLoading = true;
			try {
				const blogsData = await post.all(this.filter);
				this.blogs = blogsData.data;
				this.options.last_page = blogsData.last_page;
			} catch (err) {
				this.error = err;
			}
			this.isLoading = false;
		},
		removeEmptyFilter() {
			Object.keys(this.filter).forEach(key => {
				if (!this.filter[key]) {
					delete this.filter[key];
				}
			});
		},
		setDefaultFilter() {
			this.filter = router.history.current.query;
		},
		setFilter(item) {
			if (!item.page) {
				delete this.filter.page;
				this.filter = { ...this.filter, ...item };
			} else {
				this.filter = { ...this.filter, ...item };
			}

			this.removeEmptyFilter();
		}
	}
};
</script>
