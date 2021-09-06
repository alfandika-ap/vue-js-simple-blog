import api from "./api";
import authHeader from "./headers/authHeader";
import TokenService from "../services/token.service";
const URL = "user";

const profile = {
	get: () => {
		return new Promise(function(resolve, reject) {
			api.get(`${URL}/profile`, {
				headers: authHeader()
			})
				.then(profile => profile.data)
				.then(profile => {
					let profileData = {
						name: profile.name,
						email: profile.email
					};
					TokenService.setUserProfile(profileData);
					resolve(profileData);
				})
				.catch(err => reject(err));
		});
	},
	update: (information, password) => {
		return new Promise(function(resolve, reject) {
			api.patch(
				`${URL}/profile`,
				{
					...information,
					...password
				},
				{
					headers: authHeader()
				}
			)
				.then(profile => profile.data)
				.then(profile => {
					let profileData = {
						name: profile.name,
						email: profile.email
					};
					TokenService.setUserProfile(profileData);
					resolve(profileData);
				})
				.catch(err => reject(err));
		});
	}
};

export default {
	profile
};
