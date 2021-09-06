import {
	START_LOADING,
	STOP_LOADING,
	SET_COMMENT,
	SET_ERROR
} from "./mutation-types";
import Blog from "@/api/blog";

export default {
	async get({ commit }, postId) {
		commit(START_LOADING);
		try {
			let commentsData = await Blog.comments.get(postId);
			commit(SET_COMMENT, commentsData.data);
		} catch (err) {
			commit(SET_ERROR, err);
		}
		commit(STOP_LOADING);
	}
};
