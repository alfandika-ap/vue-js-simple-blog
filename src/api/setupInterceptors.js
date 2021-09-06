import api from "./api";
import auth from "./auth";
import TokenService from "../services/token.service";

const setup = store => {
	api.interceptors.response.use(
		res => {
			return res;
		},
		async err => {
			const originalRequest = err.config;
			if (err.response.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;

				try {
					// await store.dispatch("auth/refreshToken", "tesaasd");
					const newToken = await auth.refreshToken(
						TokenService.getUserTokenRefresh()
					);
					store.dispatch("auth/refreshToken", newToken);
					// TokenService.updateLocalAccessToken(accessToken);
					return api(originalRequest);
				} catch (_error) {
					return Promise.reject(_error);
				}
			}
		}
	);
};

export default setup;
