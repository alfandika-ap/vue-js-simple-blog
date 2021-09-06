import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import store from "../store";
import Home from "@/views/Home";
import DetailBlog from "@/views/DetailBlog";
import Login from "@/views/Login";
import Dashboard from "@/views/dashboard";
import DashboardProfile from "@/views/dashboard/Profile";
import DashboardBlog from "@/views/dashboard/blog";
import DashboardBlogAdd from "@/views/dashboard/blog/BlogAdd";
import DashboardBlogDetail from "@/views/dashboard/blog/BlogDetail";

const authEnter = (to, from, next) => {
	if (store.state.auth.loggedIn) next();
	else next({ name: "login" });
};

const routes = [
	{ path: "/", name: "home", component: Home },
	{
		path: "/detail-blog/:postId",
		name: "detail-blog",
		component: DetailBlog
	},
	{
		path: "/detail-blog/",
		redirect: { name: "home" }
	},
	{ path: "/login", name: "login", component: Login },
	{
		path: "/dashboard",
		component: Dashboard,
		beforeEnter: authEnter,
		children: [
			{
				path: "",
				name: "dashboard",
				component: DashboardBlog
			},
			{
				path: "profile",
				name: "dashboard.profile",
				component: DashboardProfile
			},
			{
				path: "blog-add",
				name: "dashboard.blog-add",
				component: DashboardBlogAdd
			},
			{
				path: "blog-detail/:postId",
				name: "dashboard.blog-detail",
				component: DashboardBlogDetail
			},
			{
				path: "blog-detail",
				redirect: { name: "dashboard" }
			}
		]
	}
];

const router = new VueRouter({
	mode: "history",
	routes,
	scrollBehavior() {
		return { x: 0, y: 0 };
	}
});

export default router;
