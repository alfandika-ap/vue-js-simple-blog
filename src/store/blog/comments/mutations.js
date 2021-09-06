import {
	SET_COMMENT,
	ADD_COMMENT,
	SET_ERROR,
	START_LOADING,
	STOP_LOADING
} from "./mutation-types";

export default {
	[SET_COMMENT](state, comments) {
		state.data = comments;
		state.loading = false;
		state.error = null;
	},
	[ADD_COMMENT](state, comment) {
		state.data.push(comment);
		state.error = null;
	},
	[SET_ERROR](state, error) {
		state.error = error;
	},
	[START_LOADING](state) {
		state.loading = true;
	},
	[STOP_LOADING](state) {
		state.loading = false;
	}
};
