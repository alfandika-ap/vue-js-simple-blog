import axios from "axios";
import store from "../store";
import auth from "./auth";
import TokenService from "../services/token.service";

const api = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
	headers: {
		"Content-Type": "application/json"
	}
});

api.interceptors.request.use(config => {
	const token = TokenService.getUserToken();
	if (token == null) {
		return config;
	}

	config.headers.common["Authorization"] = `bearer ${token}`;
	return config;
});

api.interceptors.response.use(
	response => {
		return response;
	},
	async error => {
		if (error.response.status === 401) {
			const newToken = await auth.refreshToken(
				TokenService.getUserTokenRefresh()
			);
			store.dispatch("auth/refreshToken", newToken);
			error.config.headers["Authorization"] = `Bearer ${newToken.token}`;
			return axios(error.config);
		} else {
			return Promise.reject(error);
		}
	}
);

export default api;
